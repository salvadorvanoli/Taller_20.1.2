const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html
const mariadb = require('mariadb');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";

const peopleController = require("./controllers/peopleController");

const peopleRouter = require("./routes/peopleRoute");

const pool = mariadb.createPool({
  host: "localhost", 
  user: "root", 
  password: "12560", 
  database:"planning",
  connectionLimit: "5"
});

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", (req, res)=> {
  const {username, password} = req.body;
  if(username === "admin" && password === "admin"){
    const token = jwt.sign({username}, SECRET_KEY);
    res.status(200).json({token});
  } else {
    res.status(401).json({message: "Usuario y/o contraseña incorrecto"});
  }
});

app.use("/people", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({message: "Usuario no autorizado"});
  }
});

app.get("/people", peopleController.getUsers);

app.use("/people", peopleRouter);

app.get("/people/:id", async (req, res) => {
  let conn;
  try {

	conn = await pool.getConnection();
	const rows = await conn.query(
    "SELECT * FROM todo WHERE id=?",[req.params.id]
  );

    res.json(rows[0]);
  } catch(error) {
    res.status(500).json({message: "Se rompió el servidor"});
  } finally {
	  if (conn) conn.release();
  }
});

app.post("/people", async (req, res) => {
  let conn;
  try {

	conn = await pool.getConnection();
	const response = await conn.query(
    `INSERT INTO todo(name, description, created_at, updated_at, status) VALUE(?, ?, ?, ?, ?)`,
    [req.body.name, req.body.description, req.body.created_at, req.body.updated_at, req.body.status]
  );
    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch(error) {
    res.status(500).json({message: "Se rompió el servidor"});
  } finally {
	  if (conn) conn.release();
  }
});

app.put("/people/:id", async (req, res) => {
  let conn;
  try {

	conn = await pool.getConnection();
	const response = await conn.query(
    `UPDATE todo SET name=?, description=?, created_at=?, updated_at=?, status=? WHERE id=?`,
    [req.body.name, req.body.description, req.body.created_at, req.body.updated_at, req.body.status, req.params.id]
  );
    res.json({id: req.params.id, ...req.body});
  } catch(error) {
    res.status(500).json({message: "Se rompió el servidor"});
  } finally {
	  if (conn) conn.release();
  }
});

app.delete("/people/:id", async (req, res) => {
  let conn;
  try {

	conn = await pool.getConnection();
	const response = await conn.query(
    `DELETE FROM todo WHERE id=?`,
    [req.params.id]
  );
    res.json({id: req.params.id});
  } catch(error) {
    res.status(500).json({message: "Se rompió el servidor"});
  } finally {
	  if (conn) conn.release();
  }
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});