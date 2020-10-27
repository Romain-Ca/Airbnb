# Guide pour débuter un projet backend

## 1. Création et initialisation du projet

### Dans le terminal, créer un nouveau dossier et se placer dedans

**ls** (afficher le contenu du dossier courant)  
**cd** (se déplacer vers un dossier)  
**mkdir nom-du-dossier**  
**cd nom-du-dossier**

Ouvrir le projet dans VSCode et créer ensuite un fichier index.js dans le dossier du projet.

### Initialiser le projet

**npm init -y** ⚠️ attention à se trouver dans le dossier du projet  
Cette commande aura pour effet d'ajouter le fichier _package.json_.

## 2. Installation des packages

**npm install express mongoose express-formidable uid2 crypto-js cors helmet**  
Cette commande aura pour effet d'ajouter le fichier _package-lock.json_ et le dossier _node_modules_.

> **express** : package pour créer des serveurs [voir la documentation express](https://www.npmjs.com/package/express)  
> **mongoose** : package pour manipuler des BDD MongoDB [voir la documentation mongoose](https://www.npmjs.com/package/mongoose)  
> **express-formidable** : package pour récupérer les paramètres transmis lors des requêtes HTTP de type POST [voir la documentation express-formidable](https://www.npmjs.com/package/express-formidable)  
> **uid2** : package pour générer des chaînes de caractères aléatoires [voir la documentation uid2](https://www.npmjs.com/package/uid2)  
> **crypto-js** : package pour encrypter des données [voir la documentation crypto-js](https://www.npmjs.com/package/crypto-js)  
> **cors** : package permettant d'autoriser les requêtes provenant d'un nom de domaine différent [voir la documentation cors](https://www.npmjs.com/package/cors)  
> **helmet** : package offrant une collection de protections contre certaines vulnérabilités HTTP [voir la documentation helmet](https://www.npmjs.com/package/helmet)

## 3. Envoi de son code sur GitHub

Créer un fichier _.gitignore_ dans votre projet et y ajouter les lignes suivantes :

node_modules  
.DS_Store

Une fois un nouveau repository créé sur [GitHub](https://github.com/), effectuer les commandes suivantes :

**git init**  
**git add .**  
**git commit -m "first commit"**  
**git remote add origin URL** (remplacer URL par l'url HTTPS de votre repository GitHub)  
**git push -u origin master**

⚠️ Utiliser l'adresse HTTPS plutôt que l'adresse SSH

![GitHub HTTPS](/V1/assets/img/github-https.png "GitHub HTTPS")

Pour toutes les prochaines sauvegardes du projet sur GitHub :

**git add .**  
**git commit -m "_message_"**  
**git push**

# Structure et contenu du projet - V1

Le projet airbnb-api est composé des dossiers et fichiers suivants :

- un fichier **_index.js_**

Dans le fichier _index.js_, on trouvera les imports des packages, la connexion à la BDD MongoDB, les imports des routes, la route pour la page d'accueil, la gestion des routes introuvables, et le démarrage du serveur.

- un dossier **_models_**

  - un fichier **_User.js_**

- un dossier **_routes_**

  - un fichier **_user.js_**

Commande pour démarrer le serveur dans le terminal : **npx nodemon index.js**

### Inscription

_La route **sign_up** (user.js)_

La route "/user/sign_up" permettra de créer un nouvel utilisateur en BDD. On vérifiera que l'email et le username transmis ne sont pas déjà présents en BDD, et que tous les paramètres (password, email, username, name, description) ont bien été renseignés lors de la création du nouveau compte.  
À chaque utilisateur sera associé un token (identifiant unique).  
Le password transmis sera encrypté en base de données grâce à un hash et un salt.

Exemple de requête pour tester cette route grâce à Postman :

```json
{
  "email": "jean@@airbnb-api.com",
  "password": "pass",
  "username": "Jean-75",
  "name": "Jean",
  "description": "My name is Jean."
}
```

Réponse attendue :

```json
{
  "_id": "5e58ca7f576975074f23e6e6",
  "token": "bRCfDgm9SrB49raag4ZgtpgC1DvE99lh1zlkSR7ZnUkoxQKKeJlwkFQKYF9nFgel",
  "email": "jean@gmail.com",
  "username": "Jean-75",
  "description": "My name is Jean.",
  "name": "Jean"
}
```

---

Exemple de requête avec un email déjà présent en BDD :

```json
{
  "email": "jean@airbnb-api.com",
  "password": "pass",
  "username": "John",
  "name": "John-75",
  "description": "My name is John."
}
```

Réponse attendue :

```json
{
  "error": "This email already has an account."
}
```

---

Exemple de requête avec des données manquantes :

```json
{
  "email": "lilly@airbnb-api.com",
  "password": "pass",
  "description": "My name is Lilly."
}
```

Réponse attendue :

```json
{
  "error": "Missing parameters"
}
```

### Connexion

_La route **log_in** (dans user.js)_

La route "/user/log_in" permettra à l'utilisateur de se connecter.  
On vérifiera que l'email et le password ont été transmis, puis que l'identifiant (email) est présent en BDD.  
On vérifiera ensuite que le password renseigné correspond au password encrypté en BDD.

Exemple de requête pour tester cette route grâce à Postman :

```json
{
  "email": "jean@gmail.com",
  "password": "pass"
}
```

Réponse attendue :

```json
{
  "_id": "5e58ca54576975074f23e6e5",
  "token": "k37pEn4KGg7bGsco7QUgvmh4AHR0gnfxGKSYLCuvLJebz6ChY0bhVj4j39JGXcja",
  "email": "jean@gmail.com",
  "username": "Jean",
  "description": "My name is Jean.",
  "name": "JeanJean"
}
```

---

Exemple de requête avec un email non présent en BDD :

```json
{
  "email": "fred@gmail.com",
  "password": "pass"
}
```

Réponse attendue :

```json
{
  "error": "Unauthorized"
}
```

## Côté frontend

Voici les écrans qui pourront être réalisés pour le signup et le login d'un utilisateur :

<img src="/V1/assets/img/app-signup.png" width="450" alt="app-signup">

<img src="/V1/assets/img/app-login.png" width="450" alt="app-login">
