//*--------------------------------------------------------------------------------
//*------------------------------------- APP --------------------------------------
//*--------------------------------------------------------------------------------

//* IMPORT LIBRAIRIE
require('dotenv').config()
const express = require('express')
const path = require('path')
// const bodyParser = require('body-parser') (OBSOLETE)

//* IMPORT ROUTE
const userRoutes = require('./routes/user')
const stuffRoutes = require('./routes/stuff')

//* EXPRESS
const app = express()

//* MIDDLEWARE

//* Paramétrage des headers HTTP :
app.use((req, res, next) => {
  // Accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  // Envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//* Parser : Analyse le corps d'une requête HTTP, assemble les données, crée un objet body exploitable
app.use(express.json())

//* ROUTE
app.use('/api/auth', userRoutes)
app.use('/api/stuff', stuffRoutes)

//* CHEMIN IMAGE
app.use('/images', express.static(path.join(__dirname, 'images')))

//* EXPORTATION DES DONNEES SUR LA CONFIG DU SERVEUR
module.exports = app