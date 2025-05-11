//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT DES MODELE DE THING
const Thing = require('../models/Thing')

//* IMPORT DE FS (SUPPRIMER LES IMAGES)
const fs = require('fs')

//*--------------------------------------------------------------------------------
//*------------------------------ CONTROLLER PRODUIT ------------------------------
//*--------------------------------------------------------------------------------

//* AFFICHER TOUS LES PRODUITS DE LA DATABASE AVEC LA METHODE ".find"
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
}

//?--------------------------------------------------------------------------------

//* AFFICHER UN PRODUIT DE LA DATABASE SELECTIONNEE AVEC LA METHODE ".findOne"
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }))
}

//?--------------------------------------------------------------------------------

//* CREER UN PRODUIT DANS LA DATABASE
exports.createThing = (req, res, next) => {
  //* PARSER L'OBJET DE LA REQUETE
  const thingObject = JSON.parse(req.body.thing)
  //* SUPPRIMER LES CHAMPS "_userId" ET "_id" DE LA REQUETE CLIENT
  delete thingObject._id
  delete thingObject._userId
  //* CREER UN NOUVEL OBJET AVEC LE MODELE DE THING
  const thing = new Thing ({
    //* ... = TOUS LES CHAMPS DE "thingObject"
    ...thingObject,
    //* RECUPERE "userId" DEPUIS LE TOKEN D'AUTHENTIFICATION
    userId: req.auth.userId,
    //* CREER L'URL DE L'IMAGE
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  //* ENRENGISTRER DANS LA DATABASE
  thing.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error })) 
}

//?--------------------------------------------------------------------------------

//* MODIFIER UNE PRODUIT AVEC LA METHODE ".updateOne"
exports.modifyThing = (req, res, next) => {
  //* VERIFIER S'IL Y A UN OBJET DANS NOTRE REQUETE "req.file"
  const thingObject = req.file ? {
    //* PARSE L'OBJET DE LA REQUETE
    ...JSON.parse(req.body.thing),
    //* CREER L'URL DE L'IMAGE
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  //* ENSUITE RECUPERER LES DONNEES A MODIFIER "...req.body"
} : { ...req.body }
  //* SUPPRIMER LE CHAMP "userId" DE LA REQUETE
  delete thingObject._userId
  //* CHERCHER L'OBJET DANS LA DATABASE
  Thing.findOne({ _id: req.params.id })
    //* VERIFIER QUE L'UTILISATEUR EST LE PROPRIETAIRE DE L'OBJET A MODIFIER
    .then((thing) => {
      //* SI "userId" DE LA DATABASE EST != DE "userId" DE LA REQUETE 
      if (thing.userId != req.auth.userId) {
        //* ANNULER LA REQUETE ET RENVOI UN MSG "Non-autorisé"
        res.status(401).json({ message: 'Non-autorisé' })
      //* SI IL EST LE PROPRIETAIRE
    } else {
      //* SI L'UTILISATEUR CHANGE L'IMAGE, SUPPRIMER L'ANCIENNE
      if (req.file) {
        const filename = thing.imageUrl.split("/images/")[1]
        fs.unlink(`images/${filename}`, () => {})
      }
      //* ECRASER LES ANCIENNES DONNEES PAR LES NOUVELLES => "thingObject"
      Thing.updateOne({ _id: req.params.id}, {...thingObject, _id: req.params.id})
          .then(() => res.status(200).json({message : ' Objet modifié! '}))
          .catch(error => res.status(401).json({ error }))
      }
    })
    .catch((error) => req.status(400).json({ error }))
}

//?--------------------------------------------------------------------------------

//* SUPPRIMER UN PRODUIT AVEC LA METHODE ".deleteOne"
exports.deleteThing = (req, res, next) => {
  //* CHERCHER L'OBJET DANS LA DATABASE
  Thing.findOne({ _id: req.params.id })
  //* VERIFIER QUE L'UTILISATEUR EST LE PROPRIETAIRE DE L'OBJET A SUPPRIMER
    .then(thing => {
      //* SI "userId" DE LA DATABASE EST != DE "userId" DE LA REQUETE
      if (thing.userId != req.auth.userId) {
        //* ANNULER LA REQUETE ET RENVOI UN MSG "Non-autorisé"
        res.status(401).json({ message: 'Non autorisé!' })
      } else {
        //* SINON CHERCHER LE NOM DE L'IMAGE A SUPPRIMER AVEC "split"
        const filename = thing.imageUrl.split('/images/') [1]
        //* UTILISER FS POUR SUPPRIMER L'IMAGE
        fs.unlink(`images/${filename}`, () => {
          //* CALLBACK POUR SUPPRIMER LA SAUCE DE LA DATABASE
          Thing.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({ message: 'Objet supprimé' }))
            .catch(error => res.status(401).json({ error }))
        })
      }
    })
    .catch(error => res.status(500).json({ error }))
}