const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto con funciones practicas
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateFields,
};
