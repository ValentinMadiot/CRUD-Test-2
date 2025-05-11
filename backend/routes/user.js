//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT EXPRESS
const express = require('express')

//* IMPORT LE CONTROLE DES UTILISATEURS
const userCtrl = require('../controllers/user')

//* DECLARE ROUTER D'EXPRESS
const router = express.Router()

//*--------------------------------------------------------------------------------
//*------------------------------ ROUTES CONNECTION -------------------------------
//*--------------------------------------------------------------------------------

//* CONTROLE LA CREATION D'UN NOUVEL UTILISATEUR
router.post('/signup', userCtrl.signup)

//* CONTROLE L'EXISTANCE D'UN UTILISATEUR DANS LA BASE DE DONNEE
router.post('/login', userCtrl.login)

//* EXPORTATION DES ROUTES
module.exports = router