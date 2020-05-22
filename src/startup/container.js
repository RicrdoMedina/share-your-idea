const { createContainer, asClass, asValue, asFunction } = require("awilix");
// createContainer para crear un contenedor
// asClass inyectar un objeto como una clase
// asValue inyectar un objeto como un valor
// asFunction inyectar un objeto como una funcion

//  config
const config = require("../config");
const app = require("."); //EL server express

// services
const {
  HomeService,
  CommentService,
  IdeaService,
  UserService,
  AuthService,
} = require("../services");

// controllers
const {
  HomeController,
  CommentController,
  IdeaController,
  UserController,
  AuthController,
} = require("../controllers");

// routes
const {
  HomeRoutes,
  CommentRoutes,
  IdeaRoutes,
  UserRoutes,
  AuthRoutes,
} = require("../routes/index.routes");

const Routes = require("../routes");

// models
const { User, Comment, Idea } = require("../models");

// repositories
const {
  UserRepository,
  CommentRepository,
  IdeaRepository,
} = require("../repositories");

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    // El metodo register nos permite crear una inyeccion, inyecta una clase que es HomeService como un singleton
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
  })
  .register({
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  })
  .register({
    User: asValue(User), //Como es un objecto de mongoose usamos asValue
    Idea: asValue(Idea),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
