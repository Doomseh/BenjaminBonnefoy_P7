const multer = require('multer');

// Gestion des extensions des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => { // Destination pour l'enregistrement des fichier dans le dossier 'images"
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // Gestion du nom du fichier
        const name = file.originalname.split(' ').join('_');
        const nameWithoutExtension = name.split('.')[0]
        const extension = MIME_TYPES[file.mimetype];
        callback(null, nameWithoutExtension + Date.now() + '.' + extension);
    }
});

module.exports = multer({
    storage: storage
}).single('image');