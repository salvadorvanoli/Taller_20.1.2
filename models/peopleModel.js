const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: "localhost", 
    user: "root", 
    password: "12560", 
    database:"planning",
    connectionLimit: "5"
});

const getUsers = async () => {
    let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM todo"
    );
    return rows;
  } catch(error) {
  } finally {
	  if (conn) conn.release();
  }
  return false;
};

module.exports = {
    getUsers,
};