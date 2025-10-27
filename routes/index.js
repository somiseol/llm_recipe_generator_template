const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

router.post('/generate_recipe', function(req, res, next){
    // TODO complete this method 
    const formData = req.body // get data from form
    let userIngredients = formData.ingredients

    generateRecipe(userIngredients).then(recipeJson => {
        console.log(recipeJson)
        return res.render('recipe_result', {userIngredients: userIngredients, recipeJson: recipeJson})
    }).catch(err => {return next(err)})
})

module.exports = router


