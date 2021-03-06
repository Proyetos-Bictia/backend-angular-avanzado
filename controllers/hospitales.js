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

const actualizarHospital = async (id, nombre, idUser) => {

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return Promise.reject({ status: 404, msg: 'Hospital no encontrado' });
        }
        const cambiosHospital = {
            nombre,
            usuario: idUser
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        return hospitalActualizado

    } catch (error) {
        console.log(error);
        return Promise.reject('Revisar la consola')
    }
}

const borrarHospital = async (id) => {
    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return Promise.reject({ status: 404, msg: 'Hospital no encontrado' });
        }

        await Hospital.findByIdAndDelete(id);

        return 'Se elimino correctamente'

    } catch (error) {
        console.log(error);
        return Promise.reject('Revisar la consola')
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}