//*--------------------------------------------------------------------------------
//*---------------------------------- LIBRAIRIE -----------------------------------
//*--------------------------------------------------------------------------------

//* IMPORT LIBRAIRIE MONGOOSE
const mongoose = require("mongoose");

//*--------------------------------------------------------------------------------
//*--------------------------- BASE DE DONNEES MONGODB ----------------------------
//*--------------------------------------------------------------------------------

//* VARIABLES D'ENVIRONEMENTS
// const password = process.env.PASSWORD;
// const login = process.env.LOGIN;

//* CONNEXTION A LA BASE DE DONNEE MONGODB
// const uri = `mongodb+srv://${login}:${password}@cluster0.zmfxcnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = process.env.MONGODB_URI;

//* RESUTAT CONNEXION A MONGODB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Connexion à MongoDB échouée !" + err));

//* EXPORT
module.exports = mongoose;
