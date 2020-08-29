const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs')

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (tipo, id, files) => {
    const tiposValidos = ['medicos', 'hospitales', 'usuarios'];

    //Validar tipo
    if (!tiposValidos.includes(tipo)) {
        return Promise.reject({ status: 400, msg: 'No es un medioc, usuario u hospital (tipo)' })
    }

    //Validar que venga un archivo
    if (!files || Object.keys(files).length === 0) {
        return Promise.reject({ status: 400, msg: 'No hay ningun archivo para subir' });
    }

    //Procesar la imagen...
    const file = files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return Promise.reject({ status: 400, msg: 'No es un extensión permitida' });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imagen
    const respuesta = new Promise((resolve, reject) => {
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                reject({ status: 500, msg: 'Error al mover la imagen' });
            }

            //Actualizar perfil
            actualizarImagen(tipo, id, nombreArchivo).then(data => {
                resolve({ msg: 'Archivo subido', nombreArchivo });
            }).catch(err => {
                reject({ status: 500, msg: err });
            })
        });
    })

    return respuesta
}

const retornaImagen = async (tipo, foto) => {
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    if(fs.existsSync(pathImg)) {
        return pathImg
    } else {
        const pathNoImage = path.join(__dirname, `../uploads/no-img.png`);
        return pathNoImage
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}