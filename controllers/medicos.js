const Medico = require('../models/medico');
const { isValidObjectId } = require('mongoose')

const getMedicos = async () => {
    const medicos = Medico.find({}).populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    return medicos
}

const crearMedico = async (dataMedico, usuario) => {
    const newMedico = new Medico({ ...dataMedico, usuario })
    try {
        const medicoDB = await newMedico.save();
        return Promise.resolve(medicoDB)
    } catch (error) {
        console.log(error);
        return Promise.reject('Error por favor comunicarse con el admin')
    }
}

const actualizarMedico = async (id, body, idUser) => {
    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return Promise.reject({ status: 404, msg: 'Medico no encontrado' });
        }
        const cambiosMedioco = {
            ...body,
            usuario: idUser
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedioco, { new: true });

        return medicoActualizado

    } catch (error) {
        console.log(error);
        return Promise.reject('Revisar la consola')
    }
}

const borrarMedico = async (id) => {
    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return Promise.reject({ status: 404, msg: 'Medico no encontrado' });
        }

        await Medico.findByIdAndDelete(id);

        return 'Medico se elimino de la db'

    } catch (error) {
        console.log(error);
        return Promise.reject('Revisar la consola')
    }
}

const getMedicoPorId = async (id) => {
    if (!id) {
        return Promise.reject('falta el id')
    }
    if (!isValidObjectId(id)) {
        return Promise.reject('Id no valido para la db')
    }
    try {
        const medico = await Medico.findById(id)
            .populate('hospital', 'nombre img')
        return medico
    } catch (error) {
        console.log(error);
        return Promise.reject('Revisar la consola')
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoPorId
}