//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT + DECLARATION DOTENV
require('dotenv').config()

//* APPEL/IMPORT EXPRESS
const express = require('express')
//* DECLARE EXPRESS
const app = express();

//* APPEL/IMPORT BODY-PARSER (OBSOLETE)
const bodyParser = require('body-parser')

//* IMPORT DES ROUTES ROUTES => STUFF
const stuffRoutes = require('./routes/stuff')

//* IMPORT DES ROUTES ROUTES => USER
const userRoutes = require('./routes/user')

//* IMPORT DE PATH => POUR LES IMAGES
const path = require('path')

//! EMPECHER les errurs Cors avec les headers spécifiques de contrôle d'accès
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next()
})

//* UTILISATION de la libraire EXPRESS
// app.use(express.json())
//* UTILISATION de la librairie body-parser (OBSOLETE)
app.use(bodyParser.json())

//* UTILISATION des données d'un PRODUIT
app.use('/api/stuff', stuffRoutes)

//* UTILISATION des données de l'UTILISATEUR
app.use('/api/auth', userRoutes)

//* UTILISATION du chemin de l'image de l'utilisateur avec express
app.use('/images', express.static(path.join(__dirname, 'images')))

//* EXPORTATION des données 
module.exports = app