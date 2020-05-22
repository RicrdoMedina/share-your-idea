const mcache = require("memory-cache");
const { CACHE_KEY } = require("../config");

module.exports = function (duration) {
  return (req, res, next) => {
    const key = CACHE_KEY + req.originUrl || req.url; //Id unico que generamos con la cache y la url

    const cachedBody = mcache.get(key);

    if (cachedBody) {
      //Si existe retornamos el cache
      return res.send(JSON.parse(cachedBody));
    } else {
      //Si no existe la cache, la creamos
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
