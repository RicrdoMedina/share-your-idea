//Este middleware es para sacar del query string el numero de pagina de la paginacion el cual por defecto estara como string
module.exports = function (req, res, next) {
  const queryStrings = req.query;

  for (const key in queryStrings) {
    const length = queryStrings[key].length; //Para saber si es un id de mongo que tiene mas de 20 caracteres
    const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));

    if (isValid) {
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }

  req.query = queryStrings;
  next();
};
