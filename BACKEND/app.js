const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE FORO";

// Aquí importamos los routers
const peopleRouter = require("./routes/peopleRoute");
const forumRouter = require("./routes/forumRoute");
const commentRouter = require("./routes/commentsRoute");


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

// Auth
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user != "" && pass != "") {
    const token = jwt.sign({ user }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware que autoriza a realizar peticiones a las rutas
app.use("/users", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/forums", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/comments", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

//---

// Asociamos el router de people con las rutas

app.use("/users", peopleRouter);

app.use("/forums", forumRouter);

app.use("/comments", commentRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
