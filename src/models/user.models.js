const mongoose = require("mongoose");
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
//compareSync Comparar password una vez encriptadas.
//hashSync Crear un hash para nuestro password
//genSaltSync Generar un salt que se agregara a nuestro password

// Nuestro esquema de usuario
const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//Sobreescribimos el metodo toJSON, que mongoose llama cada vez que se devuelve un objeto osea cuando se lee.
UserSchema.methods.toJSON = function () {
  let user = this.toObject();

  delete user.password;
  return user;
};

//Agregaremos metodos custom usando la funcion methods de mongoose
//Estos metodos estaran disponibles en nuestro esquema para usarlos cuando necesitemos
// Comparar passwords para saber si es el password correcto
UserSchema.methods.comparePasswords = function (password) {
  return compareSync(password, this.password);
};

// Hook de mongoose para antes que se guarde el documento
// Usaremos una funcion tradicional para que no se pierda el scope de mongoose
UserSchema.pre("save", async function (next) {
  const user = this; //Cacheamos el this para que corresponda al usuario que se esta guardando
  if (!user.isModified("password")) {
    //Si no se esta modificando el password sigue su flujo
    return next();
  }

  const salt = genSaltSync(10); //Generamos un salt de 10 caracteres
  const hashedPassword = hashSync(user.password, salt); //Hash del password
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("user", UserSchema);
