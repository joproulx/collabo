import connectionPool from '../../db'



export async function fetchPages() {
  // Fetch the last 5 invoices, sorted by date
  try {
    const data = await connectionPool.query(`
      SELECT * FROM "Pages"
    `);
    return data.rows;
  } catch (error) {
    console.error('Database query error: ' + error)
    throw new Error('Failed to fetch pages');
  }
}