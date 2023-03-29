const util = require("util");
const multer = require("multer");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var rep = ''
        switch (req.params.folder) {
            case 'dataqc':
                rep = 'data'
                break;
            case 'dbsub':
                rep = 'res/qc'
                break;
            case 'datacons':
                rep = 'res/dbsub'
                break;
            case 'ref_hote':
                rep = 'references/human'
                break;
            case 'ref_patho':
                rep = 'references/parasite'
                break;
            default:
        }
        cb(null, "./uploads/" + rep + "/");
        //console.log(file.mimetype);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage
}).single("file");



let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;