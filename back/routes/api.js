const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

//registro usuarios

router.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ nombreUsuario: 1 });
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
    check("tipo", "El tipo debe incluirse en la petecion").notEmpty().exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const usuarioExiste = await Usuario.findOne({
        nombreUsuario: req.body.nombreUsuario,
      });
      if (usuarioExiste == null) {
        let claveHash = await bcryptjs.hash(req.body.clave, 8);
        const usuario = {
          nombreUsuario: req.body.nombreUsuario,
          clave: claveHash,
          tipo: req.body.tipo,
          correo: req.body.correo,
        };
        const nuevoUsuario = await Usuario.create(usuario);
        res.json(nuevoUsuario);
      } else {
        //el nombre de usuario ya existe
        throw 400;
      }
    } catch (err) {
      res.status(err).json({ err });
    }
  }
);

router.put("/api/usuarios/:usuarioId", async (req, res) => {
  try {
    let usuario=null;
    const listaUsuariosMismoNombre = await Usuario.find({
      nombreUsuario: req.body.nombreUsuario,
    });
    if (
      (listaUsuariosMismoNombre.length == 1 &&
        listaUsuariosMismoNombre[0]._id == req.params.usuarioId) ||
      listaUsuariosMismoNombre.length == 0
    ) {
      console.log(listaUsuariosMismoNombre[0].clave)
      console.log(req.body.clave)
      if (req.body.clave == listaUsuariosMismoNombre[0].clave) {
         usuario = {
          nombreUsuario: req.body.nombreUsuario,
          clave: listaUsuariosMismoNombre[0].clave,
          tipo: req.body.tipo,
          correo: req.body.correo,
        };
        console.log("contraseñas iguales")
      } else {
        let claveHash = await bcryptjs.hash(req.body.clave, 8);
        usuario = {
          nombreUsuario: req.body.nombreUsuario,
          clave: claveHash,
          tipo: req.body.tipo,
          correo: req.body.correo,
        };
        console.log("contraseñas diferentes")
      }
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.usuarioId,
        usuario
      );
      res.json(usuarioActualizado);
    } else {
      //el nombre de usuario ya existe
      throw 400;
    }
  } catch (err) {
    res.status(err).json({ err });
  }
});

router.delete("/api/usuarios/:usuarioId", async (req, res) => {
  try {
    const usuarioBorrado = await Usuario.findByIdAndDelete(
      req.params.usuarioId
    );
    res.json(usuarioBorrado);
  } catch (err) {
    res.status(503).json({ error: err });
  }
});

//login usuarios
router.get("/api/login/:nombreUser&:claveUser", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      nombreUsuario: req.params.nombreUser,
    });
    if (usuario !== null) {
      if (bcryptjs.compareSync(req.params.claveUser, usuario.clave)) {
        res.json(usuario);
      } else {
        throw 400;
      }
    } else {
      //el usuario o la contraseña son incorrectos
      throw 400;
    }
  } catch (err) {
    res.status(err).json({ err });
  }
});

module.exports = router;
