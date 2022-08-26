//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT DES MODELE DE THING
const Thing = require('../models/Thing')

//* APPEL/IMPORT DE FS (SUPPRIMER LES IMAGES EN LOCAL)
const fs = require('fs')

//*--------------------------------------------------------------------------------
//*------------------------------- FONCTION PRODUIT -------------------------------
//*--------------------------------------------------------------------------------

//* CREER UN OBJET
exports.createThing = (req, res, next) => {
  //* AJOUTER un objet à la requête
  const thingObject = JSON.parse(req.body.thing)
  //* SUPPRIMER champ id/userId de la requête client
  delete thingObject._id
  delete thingObject._userId
  //* CREATION d'un nouvel objet
  const thing = new Thing ({
    //* ... = tous les champs de thingObjet
    ...thingObject,
    //* RECUPERE userId de l'authentification
    userId: req.auth.userId,
    //* URL de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  //* ENRENGISTREMENT dans la database
  thing.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error })) 
}

//* MODIFIER UN OBJET
exports.modifyThing = (req, res, next) => {
  //* VERIFIER si l'objet existe
  const thingObject = req.file ? {
    //* PARSE la requête s'il existe
    ...JSON.parse(req.body.thing),
    //* URL de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //* TRAITER l'objet entrant s'il n'existe pas
  } : { ...req.body }
  //* SUPPRIMER champ id/userId de la requête client
  delete thingObject._userId
  //* CHERCHER l'objet dans la database
  Thing.findOne({ _id: req.params.id })
    //* VERIFICATION que l'utilisateur est le propriétaire de l'objet à modifier
    .then((thing) => {
      //* SI userId de la database est != de userId de la requête 
      if (thing.userId != req.auth.userId) {
        //* ON annule et on renvoi un message "Non-autorisé"
        res.status(401).json({ message: 'Non-autorisé' })
      //* SI il est le propriétaire
      } else {
        //* RECUPERER les nouvelles données à remplacer, trouver l'objet qui correspond au modification à apporter 
        Thing.updateOne({ _id: req.params.id}, {...thingObject, _id: req.params.id})
          .then(() => res.status(200).json({message : ' Objet modifié! '}))
          .catch(error => res.status(401).json({ error }))
      }
    })
    .catch((error) => req.status(400).json({ error }))
}

//* FONCTION qui permet de SUPPRIMER un objet
exports.deleteThing = (req, res, next) => {
  //* CHERCHER l'objet dans la database
  Thing.findOne({ _id: req.params.id })
    //* VERIFICATION que l'utilisateur est le propriétaire de l'objet à supprimer
    .then(thing => {
      //* SI userId de la database est != de userId de la requête 
      if (thing.userId != req.auth.userId) {
        //* ON annule et on renvoi un message "Non-autorisé"
        res.status(401).json({ message: 'Non autorisé!' })
      } else {
        //* CHERCHE l'IMAGE à supprimer localement
        const filename = thing.imageUrl.split('/images/') [1]
        //* UTILISATION de fs pour supprimer l'image
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({ message: 'Objet supprimé' }))
            .catch(error => res.status(401).json({ error }))
        })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

//* FONCTION qui permet de RECUPERER un objet sur la page PRODUIT
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }))
}

//* FONCTION qui permet de RECUPERER tous les objets sur la page ACCUEIL
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
}