// Trabajamos todo lo que tiene que ver con los datos de people en la base de datos
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "foro",
  connectionLimit: 5,
});

const getComments = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT comid, foroid, userid, body FROM comments"
    );

    return rows;
  } catch (error) {
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const getCommentById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT comid, foroid, userid, body FROM comments WHERE comid=?",
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

const createComment = async (comment) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO comments(foroid, userid, body) VALUE(?, ?, ?)`,
      [comment.foroid, comment.userid, comment.body]
    );

    return { comid: parseInt(response.insertId), ...comment };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const deleteComment = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM comments WHERE comid=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  deleteComment,
};
