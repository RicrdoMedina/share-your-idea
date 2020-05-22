const BaseRepository = require("./base.repository"); //Obtenemos nuestra clase base repository con los metodos de crud que heredaremos
let _idea = null; //Variable privada solo se puede acceder desde esta instancia

class IdeaRepository extends BaseRepository {
  constructor({ Idea }) {
    //Obtenemos la entidad Idea que nos viene por inyeccion de dependencias desde el container.js
    super(Idea); //Llamanos el constructor de la clase padre y le pasamos el model
    _idea = Idea;
  }

  //Metodo adicional al CRUD
  async getUserIdeas(author) {
    return await _idea.find({ author });
  }
}

module.exports = IdeaRepository;
