const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

router.post('/generate_recipe', function(req, res, next){
    // TODO complete this method 
})

module.exports = router


