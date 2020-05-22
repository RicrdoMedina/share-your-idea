const BaseRepository = require("./base.repository"); //Obtenemos nuestra clase base repository con los metodos de crud que heredaremos
let _user = null; //Variable privada solo se puede acceder desde esta instancia

class UserRepository extends BaseRepository {
  constructor({ User }) {
    //Obtenemos la entidad User que nos viene por inyeccion de dependencias desde el container.js
    super(User); //Llamanos el constructor de la clase padre y le pasamos el model
    _user = User;
  }

  //Metodo adicional al CRUD
  async getUserByUsername(username) {
    return await _user.findOne({ username });
  }
}

module.exports = UserRepository;
