const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const Users = require("../models/user.model");

const saltRounds = 10;
const secret = "ReC!Pe@pp$ECrEt@!!#";

const register = async (req, res) => {
  try {
    const payload = req.body;

    let user = new Users();
    user.email = payload.email;
    user.username = payload.username;
    user.password = await getEncryptedPassword(payload.password);

    const response = await user.save();

    res.status(201).send(response);

  } catch (ex) {

    res.status(400).send({
      message: ex.message,
      code: ex?.code,
    });

  }
};

const login = async (req, res) => {
  try {
    const payload = req.body;

    // find user with email id
    const user = await Users.findOne({ email: payload.email });

    if (!!user) {

      if (await comparePasswords(payload.password, user.password)) {
        res.status(200).send({
          token: await generateJWT(user),
          role: user.role
        });
      }
      else {
        res.status(404).send({
          message: 'Username or password not matched.'
        });
      }

    }
    else {
      res.status(404).send({
        message: 'User not found.'
      });
    }

  } catch (ex) {

    res.status(400).send({
      message: ex.message,
      code: ex?.code,
    });

  }
};


/** Crypto operations */
function getEncryptedPassword(text) {

  return new Promise((resolve, reject) => {
    bcrypt.hash(text, saltRounds, function (err, hash) {
      if (err) {
        reject("Failed to encrypt!!");
      }

      resolve(hash);
    });
  });

};

function comparePasswords(enteredPassword, actualPassword) {

  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, actualPassword, function (err, result) {
      if (err) {
        reject("Failed to decrypt!!");
      }

      resolve(result);
    });
  });

}


/** web token operations */
function generateJWT(user) {
  return new Promise((resolve, reject) => {

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }

    jsonwebtoken.sign(payload, secret, { expiresIn: 60 * 60 }, function (err, token) {
      if (err) {
        reject("Failed to generate access token!!");
      }

      resolve(token);
    });

  });
}

module.exports = {
  login,
  register,
};
