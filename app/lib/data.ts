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