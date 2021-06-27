const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken)
    return res.json({ error: "El usuario no tiene una sesion activa" });

  try {
    const validToken = verify(accessToken, process.env.ACCESS_SECRET);
    if (validToken) {
      req.usuario = validToken;
      return next();
    }
  } catch (err) {
    res.status(208).json({ error: err });
  }
};

module.exports = { validateToken };
