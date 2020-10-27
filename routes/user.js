const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");
// on importe le modèle User

router.post("/user/sign_up", async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.fields.email });
    // on cherche dans la BDD si l'email transmis y est présent ou pas

    const userUsername = await User.findOne({
      "account.username": req.fields.username
    });
    // on cherche dans la BDD si le username transmis y est présent ou pas

    if (userEmail) {
      // si l'email transmis est présent en BDD
      res.status(400).json({ error: "This email already has an account." });
    } else if (userUsername) {
      // si le username est présent en BDD
      res.status(400).json({ error: "This username already has an account." });
    } else {
      // si l'email et le username ne sont pas présents en BDD
      if (
        req.fields.email &&
        req.fields.username &&
        req.fields.password &&
        req.fields.name &&
        req.fields.description
      ) {
        // si email / username / name / description / password ont bien été renseignés

        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        // on génère un token, un salt et un hash aléatoirement

        const newUser = new User({
          // création d'un nouvel utilisateur
          email: req.fields.email,
          token: token,
          salt: salt,
          hash: hash,
          account: {
            username: req.fields.username,
            description: req.fields.description,
            name: req.fields.name
          }
        });

        await newUser.save();
        // sauvegarde du nouvel utilisateur en BDD
        res.json({
          _id: newUser._id,
          token: newUser.token,
          email: newUser.email,
          username: newUser.account.username,
          description: newUser.account.description,
          name: newUser.account.name
        });
      } else {
        // si certains champs n'ont pas été renseignés
        res.status(400).json({ error: "Missing parameters" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/log_in", async (req, res) => {
  try {
    if (req.fields.password && req.fields.email) {
      // si le password et l'email ont bien été renseignés
      const user = await User.findOne({
        email: req.fields.email
      });
      // on cherche en BDD l'utilisateur ayant l'email renseigné
      if (user) {
        // si l'utilisateur a été trouvé en BDD
        if (
          SHA256(req.fields.password + user.salt).toString(encBase64) ===
          user.hash
          // on vérifie la correspondance entre le mot de passe reçu et les données (hash et salt) sauvegardées en BDD
        ) {
          res.json({
            _id: user._id,
            token: user.token,
            email: user.email,
            username: user.account.username,
            description: user.account.description,
            name: user.account.name
          });
        } else {
          // s'il n'y a pas correspondance entre le mot de passe reçu et les données (hash et salt) sauvegardées en BDD
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        // si l'utilisateur n'a pas été trouvé en BDD
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      // si le password, l'email et/ou le username n'ont pas été renseignés
      res.status(400).json({ error: "Missing parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
