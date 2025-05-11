//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT EXPRESS
const express = require('express')

//* IMPORT DE LA CONFIGURATION D'AUTHENTIFICATION
const auth = require('../middleware/auth')

//* IMPORT DE LA CONFIGURATION MULTER
const multer = require('../middleware/multer-config')

//* IMPORT DES FONCTIONS/LOGIQUES METIERS
const stuffCtrl = require('../controllers/stuff');

//* DECLARE ROUTER D'EXPRESS
const router = express.Router()

//*--------------------------------------------------------------------------------
//*-------------------------------- ROUTES SAUCES ---------------------------------
//*--------------------------------------------------------------------------------

//* POST UNE CREATION D'OBJET D'UN CLIENT
router.post('/', auth, multer, stuffCtrl.createThing)

//* PUBLI LES DONNEES DE CHAQUE PRODUITS SUR LA PAGE D'ACCUEIL
router.get('/', auth, stuffCtrl.getAllThings)

//* PUBLI LES DONNEES DU PRODUIT SUR LA PAGE PRODUIT
router.get('/:id', auth, stuffCtrl.getOneThing)

//* MODIFIE UN PRODUIT DU CLIENT
router.put('/:id', auth, multer, stuffCtrl.modifyThing)

//* SUPPRIME UN PRODUIT DU CLIENT
router.delete('/:id', auth, stuffCtrl.deleteThing)

//* EXPORTATION DES ROUTES
module.exports = router