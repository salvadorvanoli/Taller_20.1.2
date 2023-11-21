Por ahora esto es solo el backend de las rutas, no tiene el frontend para poder crear usuarios, comentar, buscar foros, etc.

FRONTEND EN PROCESO: https://github.com/salvadorvanoli/Taller_20.1.2

Settear el proyecto:

1) Deben ejecutarse las sentencias SQL en la query tool de HeidiSQL.
2) Debe realizarse npm run dev en consola una vez dentro del proyecto.

Interactuar con el proyecto desde POSTMAN:

3) Debe realizarse una solicitud POST al endpoint "http://localhost:3000/login" con un body que cumpla estos requisitos:

{
    "user": "algonovacío",
    "pass": "algonovacío"
}

4) Ahora se debe guardar el token que devuelve y guardarlo como header "access-token".
5) Con esto hecho, ya se puede acceder al resto de endpoints:

http://localhost:3000/users

GET: devuelve el array de usuarios.
GET /:id : devuelve el usuario con id especificado.
POST: se debe incluir un body:

{
    "user": "algonovacío",
    "pass": "algonovacío"
}

y agregará el usuario a la base de datos.
DELETE /:id : elimina el usuario con id especificado.

http://localhost:3000/forums

GET: devuelve el array de foros.
GET /:id : devuelve el foro con id especificado.
POST: se debe incluir un body:

{
    "title": "algonovacío"
}

y agregará el foro a la base de datos.
DELETE /:id : elimina el foro con id especificado.

http://localhost:3000/comments

GET: devuelve el array de comentarios.
GET /:id : devuelve el comentario con id especificado.
POST: se debe incluir un body:

{
    "foroid": 1,
    "userid": 1,
    "body": "texto del comentario"
}

y agregará el comentario a la base de datos.
DELETE /:id : elimina el comentario con id especificado.