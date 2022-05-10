const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const Usuario = require("../models/usuario");

//usuarios

router.get("/api/usuarios", async (req, res) => {
  console.log(req.payload);
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(503).json({ error: err });
  }
});

router.get("/api/usuarios/:idUsuario", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.idUsuario);
    res.json(usuario);
  } catch (err) {
    res.status(503).json({ error: err });
  }
});

router.post(
  "/api/usuarios",
  [
    check(
      "nombreUsuario",
      "El nombre de usuario debe incluirse en la peticion y tiene un maximo de 20 caracteres"
    )
      .exists()
      .notEmpty()
      .isLength({ max: 20 }),
    check(
      "clave",
      "La clave debe incluirse en la peticion y tiene un maximo de 20 caracteres"
    )
      .notEmpty()
      .exists()
      .isLength({ max: 20 }),
    check(
      "tipo",
      "El tipo debe incluirse en la petecion"
    )
      .notEmpty()
      .exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const nuevoUsuario = await Usuario.create(req.body);
      res.json(nuevoUsuario);
    } catch (err) {
      res.status(503).json({ error: err });
    }
  }
);

router.put("api/usuarios/:usuarioId", async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.usuarioId,
      req.body,
      { new: true }
    );
    res.json(usuarioActualizado);
  } catch (err) {
    res.status(503).json({ error: err });
  }
});

router.delete("api/usuarios/:usuarioId", async (req, res) => {
  try {
    const usuarioBorrado = await Usuario.findByIdAndDelete(
      req.params.usuarioId
    );
    res.json(usuarioBorrado);
  } catch (err) {
    res.status(503).json({ error: err });
  }
});

module.exports = router;
