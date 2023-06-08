const router = require('express').Router();
const multer = require('multer');
const {getHeroes, getHeroById, createHero, deleteHero, updateHero, uploadImage, deleteImage} = require("../controllers/heroController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage});

router.post('/images', upload.single('image'), uploadImage)
router.delete('/images', deleteImage)

router.get('/', getHeroes)
router.get('/:id', getHeroById)
router.post('/', createHero)
router.put('/:id', updateHero)
router.delete('/:id', deleteHero)





module.exports = router;