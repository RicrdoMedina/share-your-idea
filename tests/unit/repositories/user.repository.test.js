const { UserRepository } = require("../../../src/repositories");
const mockingoose = require("mockingoose").default; //Hacer mocking de entidades de mongoose
const { User } = require("../../../src/models"); //Necesitamos la entidad User
let {
  UserModelMock: { users, user },
} = require("../../mocks"); //Trabjaremos con el UserModelMock

describe("User Repository Tests", () => {
  beforeEach(() => {
    // Antes de cada test aplicar una logica
    mockingoose.resetAll(); //Resetear todos los mocking
    jest.clearAllMocks();
  });

  it("Should return a user by id", async () => {
    const _user = { ...user }; //Clone objeto user
    delete _user.password; //ELiminamos password
    mockingoose(User).toReturn(user, "findOne"); //Hacer un mock de la entidad User y va a devolver este usuario cuando se use el metodo findOne

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.get(_user._id); //valor esperado que habra que castearlo

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user); //Hacemos la asercion si lo que viene corresponde a lo que realmente esperamos
  });

  it("Should find a user by username", async () => {
    const _user = { ...user }; //Clone objeto user
    delete _user.password; //ELiminamos password
    mockingoose(User).toReturn(user, "findOne"); //Hacer un mock de la entidad User y va a devolver este usuario cuando se use el metodo findOne

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getUserByUsername(_user.username); //valor esperado

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should return a user collection", async () => {
    users = users.map((user) => {
      delete user.password;
      return user;
    });

    mockingoose(User).toReturn(users, "find");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
  });

  it("Should update an especific user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, "findOneAndUpdate");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(user._id, {
      name: "Marluan",
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should delete an especific user by id", async () => {
    mockingoose(User).toReturn(user, "findOneAndDelete");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(user._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});
