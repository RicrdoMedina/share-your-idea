const container = require("./src/startup/container");
const server = container.resolve("app"); //Obtenemos el Server que viene por inyeccion de dependencia desde el container
const { MONGO_URI } = container.resolve("config");

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true); //Para que agregue un indice

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => server.start())
  .catch(console.error);
