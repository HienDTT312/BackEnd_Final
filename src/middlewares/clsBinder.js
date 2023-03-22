const uuid = require('uuid');
const cls = require('cls-hooked');
const messages = require('../configs/customMessages');
const config = require('../configs/config');

module.exports = (ns) => {
  // if no namespace were provided, throw an error
  if (!ns) throw new Error(messages.errors.requiredNamespace);

  // generate, set and bind a correlationId on the given namespace
  return function clsifyMiddleware(req, res, next) {
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    // and initialize the namespace
    ns.run(() => {
      cls.getNamespace(config.cls.correlationIdNamespace).set(config.cls.correlationIdName, req.get(config.cls.correlationIdHeader) || uuid.v4());
      next();
    });
  };
};
