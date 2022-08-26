//*--------------------------------------------------------------------------------
//*---------------------------------- LIBRAIRIE -----------------------------------
//*--------------------------------------------------------------------------------

//* APPEL/IMPORT MONGOOSE
const mongoose = require('../services/database')

//*--------------------------------------------------------------------------------
//*------------------------------- SCHEMA MONGOOSE --------------------------------
//*--------------------------------------------------------------------------------

//* CREER SCHEMA
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
})

//* EXPORTATION DU MODELE DE SCHEMA
module.exports = mongoose.model('Thing', thingSchema);