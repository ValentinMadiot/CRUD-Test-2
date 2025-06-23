//*--------------------------------------------------------------------------------
//*----------------------------- CREATION SERVER NODE -----------------------------
//*--------------------------------------------------------------------------------

//* IMPORT FICHIER APP
const app = require("./app");

//* IMPORT PACKAGE HTTP NATIF DE NODE
const http = require("http");

//* DECLARE LE SERVEUR AVEC LE PACKAGE HTTP
const server = http.createServer(app);

//! GESTION DU PORT :
//* "normalizePort" => RENVOIE UN PORT VALIDE, QU'IL SOIT FOURNI SOUR LA FORME D'UN NUMERO OU D'UNE CHAINE
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//* EXPORT DU PORT QUI EST PAR DEFAULT SUR 8080
const port = normalizePort(process.env.PORT || "8080");

//* LE PACKAGE HTTP UTILISE LE PORT 8080
app.set("Port :", port);

//! GESTION DES ERREURS :
//* "errorHandler" => RECHERCHE LES DIFFERENTES ERREURS ET LES GERES DE MANIERE APPROPRIEE
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const adress = server.address();
  const bind = typeof adress === "string" ? "pipe" + adress : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//* RECHERCHE LES ERREURS SUR LE SERVEUR
server.on("error", errorHandler);

//* ECOUTEUR D'EVENEMENT
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

//* ECOUTE LES REQUETES SUR LE SERVEUR
server.listen(port);
