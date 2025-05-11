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
Il consiste en la création d'une API RESTful utilisant **Node.js**, **Express** et **MongoDB** pour gérer un catalogue de produits.  
L'API inclut une authentification robuste, une intégration complète à MongoDB, et des opérations CRUD (Create, Read, Update, Delete).

L'application frontend permet de tester automatiquement l'API, révélant un mot secret une fois tous les tests validés.

## <br /> <a name="technologies">⚙️ Technologies</a>

- **Backend** : Node.js, Express
- **Base de données** : MongoDB (via Mongoose)
- **Sécurité** : Bcrypt, Crypto-js, Helmet, Jsonwebtoken
- **Gestion des fichiers** : Multer
- **Validation de schéma** : Mongoose-unique-validator
- **Environnement** : Dotenv
- **Langage** : JavaScript

## <br /> <a name="fonctionnalités">🎯 Fonctionnalités</a>

&nbsp;&nbsp;&nbsp; ✅ &nbsp; Création de produit  
&nbsp;&nbsp;&nbsp; 📄 &nbsp; Lecture d’un ou plusieurs produits  
&nbsp;&nbsp;&nbsp; ✏️ &nbsp; Mise à jour d’un produit  
&nbsp;&nbsp;&nbsp; ❌ &nbsp; Suppression d’un produit  
&nbsp;&nbsp;&nbsp; 🔐 &nbsp; Authentification sécurisée avec JWT  
&nbsp;&nbsp;&nbsp; 🔄 &nbsp; Gestion des fichiers (upload d'images)  
&nbsp;&nbsp;&nbsp; ⚠️ &nbsp; Gestion des erreurs  
&nbsp;&nbsp;&nbsp; 🛡️ &nbsp; Sécurisation des routes avec Helmet

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

- 🛠️ **[Git](https://git-scm.com/)**
- 🔧 **[Node.js](https://nodejs.org/fr/)**
- 📦 **[npm](https://www.npmjs.com/)**
- 🍃 **[MongoDB](https://www.mongodb.com/)** (Atlas ou local)

### 📥 Clonage

```bash
git clone https://github.com/ValentinMadiot/CRUD-Test-2
cd CRUD-Test-2
```

### 📦 Installation des dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 🔧 Configuration de l'environnement

Dans le dossier backend, renommer le fichier `.env.example` en `.env` :

```bash
mv .env.example .env
```

Ajoutez les variables d'environnement dans le fichier `.env` :

```env
# Database MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority

# Json-Web-Token / Authentication
JWT_KEY=
```

### ▶️ Lancement des serveurs

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm start
```
