<br /> 
<h3 align="center">🛒 CRUD Test 2 &nbsp; – &nbsp; Projet Scolaire</h3>

## <br /> 📌 Sommaire

&nbsp;&nbsp;&nbsp; 🎨 &nbsp; [**Introduction**](#introduction)<br />
&nbsp;&nbsp;&nbsp; ⚙️ &nbsp; [**Technologies**](#technologies)<br />
&nbsp;&nbsp;&nbsp; 🎯 &nbsp; [**Fonctionnalités**](#fonctionnalités)<br />
&nbsp;&nbsp;&nbsp; 🧱 &nbsp; [**Schéma & Routes**](#schéma)<br />
&nbsp;&nbsp;&nbsp; 🚀 &nbsp; [**Installation**](#installation)<br />

## <br /> <a name="introduction">🎨 Introduction</a>

Ce projet est un exercice scolaire réalisé dans le cadre d'un parcours chez **OpenClassrooms**.

Il consiste à construire une API RESTful avec **Node.js**, **Express** et **MongoDB** pour gérer un catalogue de produits.

L'API inclut une authentification sécurisée (**JWT**), une intégration complète à **MongoDB**, et des opérations **CRUD** (Create, Read, Update, Delete).

## <br /> <a name="technologies">⚙️ Technologies</a>

- **Backend** : Node.js, Express
- **Base de données** : MongoDB (Mongoose)
- **Sécurité** : Bcrypt, Crypto-js, Helmet, Jsonwebtoken
- **Gestion des fichiers** : Multer
- **Validation de schéma** : Mongoose-unique-validator
- **Environnement** : Dotenv
- **Langage** : JavaScript

## <br /> <a name="fonctionnalités">🎯 Fonctionnalités</a>

- CRUD complet sur produits
- Authentification sécurisée avec JWT
- Upload d’images via Multer
- Sécurisation des headers avec Helmet
- Gestion centralisée des erreurs

## <br /> <a name="schéma">🧱 Schéma & Routes</a>

### 🔧 Schéma Mongoose attendu

```js
mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});
```

### 🔌 Endpoints requis

- **GET** `/api/products`  
  Retourne tous les produits sous la forme :

  ```json
  { "products": [ ... ] }
  ```

- **GET** `/api/products/:id`  
  Retourne le produit correspondant à l’ID :

  ```json
  { "product": { ... } }
  ```

- **POST** `/api/products`  
  Corps de requête attendu :

  ```json
  {
    "name": "Nom",
    "description": "Description",
    "price": 99.99,
    "inStock": true
  }
  ```

  Retourne le produit nouvellement créé (avec `_id`) :

  ```json
  { "product": { ... } }
  ```

- **PUT** `/api/products/:id`  
  Met à jour un produit existant.  
  Corps attendu :

  ```json
  {
    "name": "Nom",
    "description": "Description modifiée",
    "price": 120.0,
    "inStock": false
  }
  ```

  Réponse :

  ```json
  { "message": "Modified!" }
  ```

- **DELETE** `/api/products/:id`  
  Supprime le produit correspondant à l’ID.  
  Réponse :
  ```json
  { "message": "Deleted!" }
  ```

## <br /> <a name="installation">🚀 Installation</a>

### ✅ Prérequis

- [Git](https://git-scm.com/) &nbsp;—&nbsp; Système de gestion de versions
- [Node.js](https://nodejs.org/fr) &nbsp;—&nbsp; Exécuteur local de scripts JavaScript
- [npm](https://www.npmjs.com/) &nbsp;—&nbsp; Gestionnaire de paquets JavaScript
- [MongoDB](https://www.mongodb.com/) — Base de données NoSQL
- [Google Chrome](https://www.google.com/) &nbsp;—&nbsp; Navigateur moderne
- [Visual Studio Code](https://code.visualstudio.com/) &nbsp;—&nbsp; Éditeur de code
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) &nbsp;—&nbsp; Extension VS Code

### 📥 Clonage

```bash
git clone https://github.com/ValentinMadiot/CRUD-Test-2
cd CRUD-Test-2
```

### 🔧 Configuration de l'environnement

Renommer `.env.exemple` en `.env`

Ajoutez vos variables `.env` :

```bash
# Database MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority

# Json-Web-Token / Authentication
JWT_KEY=
```

### ▶️ Lancement du serveur

### Backend

```bash
cd backend
npm install
npm start
```

Backend disponible sur : `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend disponible sur : `http://localhost:8081`
