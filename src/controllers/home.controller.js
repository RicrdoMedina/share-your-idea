let _homeService = null;

class HomeController {
  constructor({ HomeService }) {
    // awilix le va a inyectar HomeService que viene por inyeccion de dependencia
    //Debe ser el mismo nombre que le colocamos en el register
    _homeService = HomeService;
  }

  index(req, res) {
    return res.send(_homeService.index());
  }
}

module.exports = HomeController;
