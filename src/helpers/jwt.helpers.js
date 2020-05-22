const { sign } = require("jsonwebtoken"); //Firmar el jwt
const { JWT_SECRET } = require("../config"); //Secret para firmar el jwt

module.exports.generateToken = function (user) {
  //Como exports es un objeto se le puede agregar un propiedad que contenga una funcion
  // Retornamos jwt son el usuario
  return sign({ user }, JWT_SECRET, { expiresIn: "4h" });
};
