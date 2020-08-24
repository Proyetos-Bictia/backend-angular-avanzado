const Medico = require('../models/medico');

const getMedicos = async () => {
    const medicos = Medico.find({}).populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre')
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

const actualizarMedico = async () => {
    return 'actualizarMedico'
}

const borrarMedico = async () => {
    return 'borrarMedico'
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}