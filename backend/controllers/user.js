//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* APPEL/IMPORT BCRYPT
const bcrypt = require('bcrypt')

//* APPEL/IMPORT JSONWEBTOKEN
const jwt = require('jsonwebtoken')
//* IMPORT DU TOKEN DE LOGIN
const jwtToken = process.env.JWTTOKEN

//* IMPORT DES MODELES UTILISATEURS
const User = require('../models/User')

//*--------------------------------------------------------------------------------
//*----------------------- FONCTION CONNECTION UTILISATEUR ------------------------
//*--------------------------------------------------------------------------------

//* FONCTION pour CREER un nouvel utilisateur
exports.signup = (req, res, next) => {
  //* UTILISATION de BYCRYPT pour hasher le mdp (10 fois)
  bcrypt.hash(req.body.password, 10)
  //* ON RECUPERE le nouvel mdp
    .then(hash => {
      //* CREATION d'un NOUVEL UTILISATEUR
      const user = new User ({
        //* EMAIL DE LA REQUÊTE
        email: req.body.email,
        //* MDP HASHER
        password: hash
       })
      //* SAUVEGARDE DANS LA DATABASE
       user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    })
    .catch(error => res.status(500).json({ error }))  
}

//* FONCTION pour CONNECTER un utilisateur existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        //* SI l'utilisateur es différent => 401
        res.status(401).json({ message: 'Utilisateur non trouvé !' })
        //* ============================================================
        // return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      } else {
        //* SINON on COMPARE le mdp donnees avec celui de la database avec BYCRYPT
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            //* SI il est different => 401
            res.status(401).json({ message: 'Utilisateur non trouvé !' })
            //* ============================================================
            // return res.status(401).json({ error: 'Utilisateur non trouvé !' })
          } else {
            //* SINON on renvoi le mdp au front
            res.status(200).json({
              userId: user._id,
              //* SIGN de JWT pour assigner un nouveau token à l'utilisateur
              token: jwt.sign(
                { userId: user._id},
                jwtToken,
                { expiresIn: '24h'}
              )
            })
          }
        })
        .catch(error => res.status(500).json({ error }))
      }
    })
    .catch(error => res.status(500).json({ error }))
}