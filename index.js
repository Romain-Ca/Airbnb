const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
// initialise le serveur
app.use(helmet());
// active les protections fournies par le package
app.use(formidableMiddleware());
// active la possibilité de récupérer les paramètres de type fields transmis avec la méthode HTTP POST
app.use(cors());
// `Cross-Origin Resource Sharing` est un mécanisme permettant d'autoriser les requêtes provenant d'un nom de domaine différent

mongoose.connect("mongodb://localhost/airbnb-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// pour se connecter à la BDD locale nommée "airbnb-api"

const userRoutes = require("./routes/user");
// import des routes
app.use(userRoutes);
// active l'utilisation des routes

app.get("/", function (req, res) {
  res.send("Welcome to the Airbnb API.");
});

app.all("*", function (req, res) {
  res.status(404).json({ error: "Page not found" });
});
// Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront une erreur 404

app.listen(3000, () => {
  console.log("Server has started");
});
// démarre le serveur
