const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImg = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = ''

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('no se encontro medico por id');
                return Promise.reject('No se encontro medico id')
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImg(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('no se encontro hospital por id');
                return Promise.reject('No se encontro hospita id')
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImg(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('no se encontro usuario por id');
                return Promise.reject('No se encontro usuario id')
            }

            pathViejo = `./uploads/usuario/${usuario.img}`;
            borrarImg(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
    
}
module.exports = {
    actualizarImagen
}