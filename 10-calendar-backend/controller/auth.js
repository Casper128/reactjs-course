const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, resp = response) => {
    const { name, email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con este correo'
            });
        }
        usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        //Generara JWT 
        const token = await generarJWT(usuario.id, usuario.name);
        resp.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        })
    }
};

const loginUsuario = async (req, resp = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este correo'
            });
        }

        //confirmar Contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //Generara JWT 
        const token = await generarJWT(usuario.id, usuario.name);

        resp.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'comuniquese con el administrador'
        })
    }

};

const revalidarToken =async (req, resp = response) => {
    const { uid, name } = req;

    //Generara JWT 
    const token = await generarJWT(uid,name);
    
    //Generar nuevo jwt y retonralo en la peticion
        resp.json({
            ok: true,
            uid,
            name
        })
};;



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}