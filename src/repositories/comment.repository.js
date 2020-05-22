const BaseRepository = require("./base.repository"); //Obtenemos nuestra clase base repository con los metodos de crud que heredaremos
let _comment = null; //Variable privada solo se puede acceder desde esta instancia

class CommentRepository extends BaseRepository {
  constructor({ Comment }) {
    //Obtenemos la entidad Comment que nos viene por inyeccion de dependencias desde el container.js
    super(Comment); //Llamanos el constructor de la clase padre y le pasamos el model
    _comment = Comment;
  }
}

module.exports = CommentRepository;
