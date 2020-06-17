/*
Imports
*/
    const fs = require('fs');

    const recipesFolder = './recipes';
//

/* 
Methods CRUD
*/
    const getAllRecipes = (req) => {
        let listRecipe = [];

        return new Promise( (resolve, reject) => {
            fs.readdirSync(recipesFolder).forEach(file => {
                let rawData = fs.readFileSync(recipesFolder + '/' + file);
                let recipe = JSON.parse(rawData);

                listRecipe.push(recipe);
            })
            
            resolve(listRecipe)
        });
    }

    const getRecipeById = (req) => {
        let pathFile = recipesFolder + '/' + req.params.id + '.json';

        return new Promise( (resolve, reject) => {
            try {
                if (fs.existsSync(pathFile)) {
                    console.log('FILE EXIST');
                    let rawData = fs.readFileSync(pathFile);
                    
                    resolve(JSON.parse(rawData))
                }
            } catch(err) {
                reject(err)
            }
        });
    }
//

/*
Export
*/
module.exports = {
    getAllRecipes,
    getRecipeById
}
//