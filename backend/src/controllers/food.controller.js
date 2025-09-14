const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuidv4 } = require("uuid");

async function addFood(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "Something went wrong!" });
    }

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuidv4());

    const foodItem = await foodModel.create({
        name: req.body.name,
        video: fileUploadResult.url,
        description: req.body.description,
        foodPartner: req.foodPartner._id,
    });

    if (!foodItem) {
        return res.status(500).json({ message: "Failed to add food item" });
    }

    res.status(201).json({
        message: "Food item added successfully",
        food: foodItem
    });
}

async function getAllFood(req, res) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food items fetched successfully",
        food: foodItems
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        food: foodId,
        user: user._id
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({ message: "Food unliked Successfully!" });
    }

    const like = await likeModel.create({
        food: foodId,
        user: user._id
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    res.status(201).json({ message: "Food liked Successfully!", like });
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        food: foodId,
        user: user._id
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        });

        return res.status(200).json({
            message: "Food unsaved Successfully!"
        });
    }

    const save = await saveModel.create({
        food: foodId,
        user: user._id
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    });

    res.status(201).json({
        message: "Food saved Successfully!",
        save
    });
}

async function getSavedFood(req, res) {
    const user = req.user;
    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved food items found" });
    }

    res.status(200).json({
        message: "Saved food items fetched successfully",
        savedFoods
    });
}

module.exports = { 
    addFood,
    getAllFood,
    likeFood,
    saveFood,
    getSavedFood
}; 
