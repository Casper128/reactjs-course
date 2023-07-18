const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    const eventos = await Evento.find().populate('user', 'name');

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {
    //Verificar que tenga el evento
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            msg: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, resp = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return resp.status(400).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }
        if (evento.user.toString() !== uid) {
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // findByIdAndUpdate con los dos primeros parametros retorna unicamente el viejo valor 
        // con el tercer valor devuelve el ultimo valor actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        resp.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);

        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async (req, resp = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return resp.status(400).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }
        if (evento.user.toString() !== uid) {
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para borrar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        resp.json({
            ok: true,
            msg: 'Evento con la siguiente informacion fue borrado de la bd',
            evento: eventoEliminado
        });


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}