//*--------------------------------------------------------------------------------
//*------------------------- LIBRAIRIE + FICHIER IMPORTE --------------------------
//*--------------------------------------------------------------------------------

//* IMPORT BCRYPT
const bcrypt = require("bcrypt");

//* IMPORT JSONWEBTOKEN
const jwt = require("jsonwebtoken");

//* IMPORT DU TOKEN DE LOGIN
const JWT_KEY = process.env.JWT_KEY;

//* IMPORT DES MODELES UTILISATEURS
const User = require("../models/User");

//*--------------------------------------------------------------------------------
//*---------------------------- CONTROLLER UTILISATEUR ----------------------------
//*--------------------------------------------------------------------------------

//* CREER UN NOUVEL UTILISATEUR
exports.signup = (req, res, next) => {
  //* HASHER LE PASSWORD 10 FOIS AVEC BYCRYPT
  bcrypt
    .hash(req.body.password, 10)
    //* TRANSMETTRE LE MAIL ET MDP A UN OBJET UTILISATEUR
    .then((hash) => {
      //* CREATION d'un NOUVEL UTILISATEUR
      const user = new User({
        //* EMAIL DE LA REQUÊTE
        email: req.body.email,
        //* MDP HASHER
        password: hash,
      });
      //* SAUVEGARDE DANS LA DATABASE AVEC LA METHODE ".save"
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(501).json({ error }));
};

//?--------------------------------------------------------------------------------

//* CONNECTER UN UTILISATEUR EXISTANT
exports.login = (req, res, next) => {
  //* CHERCHER EMAIL DE L'UTILISATERUR DANS LA DATABASE AVEC LA METHODE ".findOne"
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //* SI l'utilisateur es différent => 401
        res.status(401).json({ message: "Utilisateur non trouvé !" });
      } else {
        //* SINON ON COMPARE LE MDP DONNEES AVEC CELUI DE LA DATABASE AVEC LA METHODE ".compare" DE BYCRYPT
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              //* SI IL EST INVALIDE, ECHEC DE LA CONNEXION (401)
              res.status(401).json({ message: "Utilisateur non trouvé !" });
            } else {
              //* SINON IL EST VALIDE, POURSUIT LA CONNEXION (201)
              res.status(200).json({
                userId: user._id,
                //* ENVOI UN TOKEN D'AUTHENTIFICATION AVEC LA METHODE ".sign" DE JASONWEBTOKEN
                token: jwt.sign(
                  //* ARGUMENTS : userId, token dans ".env", durée de validité
                  { userId: user._id },
                  JWT_KEY,
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
