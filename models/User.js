const mongoose = require("mongoose");

// Dans le modèle User, le token permet d'authentifier l'utilisateur ; le hash et le salt permettent de protéger le mot de passe de l'utilisateur

// les informations non sensibles concernant l'utilisateur sont stockées dans l'objet "account"

const User = mongoose.model("User", {
  email: { type: String, required: true, unique: true },
  token: String,
  hash: String,
  salt: String,
  account: {
    username: { type: String, required: true, unique: true },
    name: String,
    description: String,
    photo: Object
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
  // "rooms" permettra de stocker toutes les références vers les annonces créées par l'utilisateur
});

module.exports = User;
