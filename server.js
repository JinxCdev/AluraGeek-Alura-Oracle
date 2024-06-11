const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database/db.json'); // Asegúrate de tener tu archivo db.json en la raíz
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001; // Vercel proporciona el puerto a través de la variable de entorno PORT

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});