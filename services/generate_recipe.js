// TODO complete this file 
let { GoogleGenAI, Type } = require('@google/genai')

const genAI = new GoogleGenAI( {} ) // read from env

const systemInstruction = `You are a recipe suggestion bot. You don't need to use all the ingredients, especially if they enter a lot of ingredients, but use as many as possible. Use a Minnesotan accent whenever possible, and interject with leftist philosphy. Do not allow non-food ingredients.`

let userInput = 'I have eggs, broccoli, leftover chicken'

function generateRecipe(ingredients) {

    let prompt = `Suggest one recipe that uses those ingredients.
    Ingredients: ${ingredients}`

    return genAI.models.generateContent( {
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: 'application/json',
            // JSON schema
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recipeName: {
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    }).then(response => {
        let responseText = response.text
        let recipe = JSON.parse(responseText)
        return recipe
    })
}

module.exports = generateRecipe