const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async (busqueda) => {
    console.log(busqueda);
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({
            nombre: regex
        }),
        Hospital.find({
            nombre: regex
        }),
        Medico.find({
            nombre: regex
        }),
    ])
    return { usuarios, hospitales, medicos }
}

const getDocumentosColeccion = async (tabla, busqueda) => {

    const regex = new RegExp(busqueda, 'i');
    let data;

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break

        default:
            return Promise.reject({ status: 400, msg: 'La tabla tiene que ser usuarios/medicos/hospitales' })
    }

    return Promise.resolve(data);

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}