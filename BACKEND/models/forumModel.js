// Trabajamos todo lo que tiene que ver con los datos de people en la base de datos
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "foro",
  connectionLimit: 5,
});

const getForums = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT foroid, title FROM foros"
    );

    return rows;
  } catch (error) {
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const getForumById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT foroid, title FROM foros WHERE foroid=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const createForum = async (forum) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO foros(title) VALUE(?)`,
      [forum.title]
    );

    return { foroid: parseInt(response.insertId), ...forum };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const deleteForum = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM foros WHERE foroid=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

module.exports = {
  getForums,
  getForumById,
  createForum,
  deleteForum,
};
