//*--------------------------------------------------------------------------------
//*---------------------------------- LIBRAIRIE -----------------------------------
//*--------------------------------------------------------------------------------

//* IMPORT MONGOOSE
const mongoose = require('mongoose')

//* IMPORT DE LA VALIDATION UNIQUE DE MONGOOSE
const uniqueValidator = require('mongoose-unique-validator')

//*--------------------------------------------------------------------------------
//*------------------------------ SCHEMA UTILISATEUR ------------------------------
//*--------------------------------------------------------------------------------

//* CREER SCHEMA UTILISATEUR
const userSchema = mongoose.Schema ({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

//* VERIFICATION DU SCHEMA UTILISATEUR UNIQUE AVEC LE VALIDATEUR MONGOOSE
userSchema.plugin(uniqueValidator)

//* EXPORTATION DU MODELE UTILISATEUR
module.exports = mongoose.model('User', userSchema)