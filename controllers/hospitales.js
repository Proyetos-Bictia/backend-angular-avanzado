const Hospital = require('../models/hospital')

const getHospitales = async () => {
    const hospitales = await Hospital.find({}).populate('usuario', 'nombre img');
    return hospitales
}

const crearHospital = async (hospital, uid) => {
    const newHospital = new Hospital({ ...hospital, usuario: uid });
    try {
        const hospitalDB = await newHospital.save()
        return hospitalDB
    } catch (error) {
        console.log(error);
        return Promise.reject('Hable con el admin')
    }
}

const actualizarHospital = async () => {
    return 'actualizarHospital'
}

const borrarHospital = async () => {
    return 'borrarHospital'
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}