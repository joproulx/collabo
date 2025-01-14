import connectionPool from '../../db'

export async function fetchPages() {
  const data = await connectionPool.query(`
    SELECT * FROM "Pages"
  `);
  return data.rows;
}

export async function addPage(pageId: string, parentPageId: string | null, title: string, spaceId: number, state: number) {
  let query = `
    INSERT INTO "Pages" ("Id", "ParentPageId", "Title", "SpaceId", "State") VALUES ('${pageId}', '${parentPageId}', '${title}', ${spaceId}, ${state});
  `;

  await connectionPool.query(query);
}

export async function updatePage(pageId: string, title: string | null) {
  if (!title) {
    return;
  }

  let query = `
    UPDATE "Pages" SET "Title" = '${title}' WHERE "Id" = '${pageId}';
  `;
  await connectionPool.query(query);
}

// delete page
export async function deletePage(pageId: string) {
  const query = `
    DELETE FROM "Pages" WHERE "Id" = '${pageId}';
  `;

  await connectionPool.query(query);
}

// move page
// Lock actual parent page row
  // Lock new parent page row
  // Update new parent page id for the updated page
  // Adjust Order of pages under old parent
  // Adjust Order of pages under new parent
export async function movePage(pageId: string, newParentPageId: string | null, newOrder: number) {
  // TODO: Handled deadlock
  const beginTransaction = `BEGIN;`;
  const lockPageQuery = `SELECT * FROM "Pages" WHERE "Id" = $1 FOR UPDATE;`;
  const lockChildrenQuery = `
    SELECT * FROM "Pages" 
    WHERE "Id" IN (SELECT "Id" FROM "Pages" WHERE "ParentPageId" = $1) 
    FOR UPDATE;
  `;
  const updatePageQuery = `
    UPDATE "Pages" 
    SET "ParentPageId" = $2, "Order" = $3 
    WHERE "Id" = $1;
  `;
  const adjustOrderQuery = `
    WITH "OrderedPages" AS (
      SELECT 
        "Id",
        "ParentPageId",
        ROW_NUMBER() OVER (
          PARTITION BY "ParentPageId" 
          ORDER BY "Order", "Id"
        ) - 1 AS "NewOrder"
      FROM "Pages"
      WHERE "ParentPageId" = $1 
        OR "Id" IN (SELECT "Id" FROM "Pages" WHERE "ParentPageId" = $1)
    )
    UPDATE "Pages"
    SET "Order" = "OrderedPages"."NewOrder"
    FROM "OrderedPages"
    WHERE "Pages"."Id" = "OrderedPages"."Id";
  `;
  const commitTransaction = `COMMIT;`;
  const rollbackTransaction = `ROLLBACK;`;
  
  const values = [pageId, newParentPageId, newOrder];
  
  try {
    // Begin transaction
    await connectionPool.query(beginTransaction);
  
    // Lock page and children
    await connectionPool.query(lockPageQuery, [pageId]);
    await connectionPool.query(lockChildrenQuery, [pageId]);
  
    // Update parent and order
    await connectionPool.query(updatePageQuery, values);
  
    // Reorder pages under new parent
    await connectionPool.query(adjustOrderQuery, [newParentPageId]);
  
    // Commit if everything succeeds
    await connectionPool.query(commitTransaction);
  } catch (error) {
    console.error('Transaction failed:', error);
  
    // Rollback in case of error
    await connectionPool.query(rollbackTransaction);
    throw error;  // Re-throw for further handling
  }
}




