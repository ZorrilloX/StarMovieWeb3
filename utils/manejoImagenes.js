const path = require('path');
const fs = require('fs');

async function manejarImagen(req, eliminar, id, tipo) {
    if (eliminar) { //QUIERES ELIMINAR LA IMAGEN?
        const oldImagePath = path.join(__dirname, `../public/images/${tipo}`, `${id}.jpg`);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }    
    } else { //INSERT O ACTUALIZAR
        if (req.files && req.files.imagen) {
            const imagen = req.files.imagen;
            const newFilename = `${id}.jpg`;
            const uploadPath = path.join(__dirname, `../public/images/${tipo}`, newFilename);
            const oldImagePath = path.join(__dirname, `../public/images/${tipo}`, `${id}.jpg`);

            // Eliminar imagen anterior si existe
            try {
                if (fs.existsSync(oldImagePath)) {
                    await fs.promises.unlink(oldImagePath);
                }
            } catch (err) {
                console.error('Error al eliminar la imagen antigua:', err);
                throw new Error('Error al eliminar la imagen antigua');
            }

            // Mover la nueva imagen
            imagen.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error al mover la nueva imagen:', err);
                }
            });
        }
    }
}
module.exports = { manejarImagen };