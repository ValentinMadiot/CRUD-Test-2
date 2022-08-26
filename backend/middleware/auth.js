//*--------------------------------------------------------------------------------
//*---------------------------------- LIBRAIRIE -----------------------------------
//*--------------------------------------------------------------------------------

//* APPEL/IMPORT JSONWEBTOKEN
const jwt = require('jsonwebtoken')
//* IMPORT DU TOKEN DE LOGIN
const jwtToken = process.env.JWTTOKEN

//*--------------------------------------------------------------------------------
//*---------------------- FONCTION POUR VERIFIER UTILISATEUR ----------------------
//*--------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, jwtToken)
    const userId = decodedToken.userId
    req.auth = {
      userId: userId
    }
    next()
  }
  catch(error) {
    res.status(401).json({ error })
  }
}