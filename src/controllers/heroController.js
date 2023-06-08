const Hero = require('../models/heroModel');

const createHero = async (req, res) => {
    try {
        const {nickname, real_name, origin_description, superpowers, catch_phrase, images} = req.body;

        if (!nickname || !real_name || !origin_description || !superpowers || !catch_phrase || !images) {
            return res.status(400).json({error: 'All fields are required'});
        }

        const hero = await Hero.create({nickname, real_name, origin_description, superpowers, catch_phrase, images});

        res.json(hero);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getHeroes = async (req, res) => {
    try {
        const {limit = 20, page = 1} = req.query;
        const heroes = await Hero.find().limit(limit).skip((page - 1) * limit).sort({createdAt: -1});
        const totalCount = await Hero.countDocuments();
        res.json({heroes, totalCount});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const getHeroById = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({error: 'Hero not found'})
        res.json(hero);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const updateHero = async (req, res) => {
    try {
        const {nickname, real_name, origin_description, superpowers, catch_phrase, images} = req.body;

        if (!nickname || !real_name || !origin_description || !superpowers || !catch_phrase || !images) {
            return res.status(400).json({error: 'All fields are required'});
        }

        const hero = await Hero.findByIdAndUpdate(req.params.id, {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images
        }, {new: true});

        res.json(hero);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteHero = async (req, res) => {
    try {
        const hero = await Hero.findByIdAndDelete(req.params.id);
        res.json(hero);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const uploadImage = async (req, res) => {
    try {
        res.json({filename: req.file.filename});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteImage = async (req, res) => {
    try {
        const {filename} = req.body;
        console.log({filename})
        res.json({filename});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    createHero,
    getHeroes,
    getHeroById,
    updateHero,
    deleteHero,
    uploadImage,
    deleteImage
}