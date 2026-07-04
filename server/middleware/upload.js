const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../../public/uploads"));

    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + "-" + file.originalname;

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|webp/;

    const isValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (isValid) {

        cb(null, true);

    } else {

        cb(new Error("Only images are allowed"));

    }

};

module.exports = multer({

    storage,
    fileFilter

});