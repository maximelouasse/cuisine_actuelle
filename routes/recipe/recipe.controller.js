/*
Imports
*/
    // Angular
    const fs = require('fs');

    // Files
    const recipesFolder = './recipes';

    const listFilterType = [["apero", "Apéro"], ["entree", "Entrée"], ["plat", "Plat"], ["dessert", "Dessert"], ["sauce", "Sauce"], ["boisson", "Boissons"], ["poisson", "Poisson"], ["viande", "Viande"]];

    const listFilterEvent = [["saint_valentin", "Saint-Valentin"], ["teo_time", "Recette Teo Time"], ["reception", "Réception"], ["paques", "Pâques"], ["noel", "Recette de Noël"], ["pique_nique", "Panier pique-nique"], ["halloween", "Halloween"], ["mardi_gras", "Mardi gras"], ["gouter", "Goûter"], ["chandeleur", "Chandeleur"], ["buffet", "Buffet"], ["brunch", "Brunch et Petit déjeuner"], ["barbecue", "Barbecue et grillades"], ["apero", "Apéros dinatoire"], ["nouvel_an", "Nouvel An" ]];

    const listFilterDiet = { classique: "Classique", vegetarien: "Végétarien", vegan: "Vegan", no_glucide: "Faible teneur en glucide", keto: "Keto", flexitarian: "Flexitarian", pescetarien: "Pescetarien", palea: "Paleo", no_gluten: "Sans gluten", no_lactose: "Sans lactose" };

    const detailFilterType = {
        'apero': ["Toasts", "Tapas", "Roulés", "Cakes Salés", "Beignets", "Amuse-bouches"],
        'entree': ["Verrines", "Tartares", "Sushis", "Soupes", "Tartines", "Salées", "Toasts salées", "Salades", "Quiches", "Gaspachos", "Foie Gras", "Feuilletés", "Carpaccios", "Bricks", "Aumônières"],
        'plat': ["Tourtes", "Tortilla", "Tartiflettes", "Tajines", "Riz", "Risottos", "Purées", "Pizzas", "Pâtes", "Papillotes", "Paëllas", "Oeufs", "Lasagnes", "Hamburgers", "Gratins", "Galettes", "Flan salé", "Croque-monsieur", "Couscous", "Choucroutes", "Brochettes", "Blanquette"],
        'dessert': ["Yaourt", "Tiramisu", "Tartes", "Tarte tatin", "Sauce sucrée", "Muffins", "Mousses", "Meringue", "Madeleines", "Macaron", "Glace", "Gaufres", "Gâteaux", "Flans", "Cupcake", "Crumbles", "Crêpes", "Crème", "Panna cotta", "Confiture", "Confiserie", "Compotes", "Cookies", "Clafoutis", "Cheesecake", "Charlottes", "Cake", "Bûche", "Brownies", "Brioche", "Biscuits", "Beignet"],
        'sauce': ["Vinaigrette", "Sauce Tomate", "Sauce sucrée", "Sauce roquefort", "Sauce au poivre", "Pesto", "Mayonnaise", "Sauce hollandaise", "Carbonara", "Béchamel"],
        'boisson': ["Smoothie", "Cocktails"],
        'poisson': ["Truite", "Thon", "Sole", "Saumon", "Sardine", "Rouget", "Raie", "Palourde", "Moules", "Maquereau", "Lotte", "Lieu", "Langoustine", "Langouste", "Huîtres", "Homard", "Hareng", "Haddock", "Gambas", "Dorade", "Crevettes", "Crabe", "Coquille-saint-jacques", "Calamar", "Cabillaud", "Bigorneau", "Bar ou loup", "Anchois", "Aiglefin"],
        'viande': ["Veau", "Poulet", "Porc", "Pintade", "Lapin", "Dinde", "Chevreuil", "Chapon", "Canard", "Caille", "Boeuf", "Agneau"]
    };
//

/* 
Methods
*/
    const getListFilters = (req) => {
        let type = req.params.type;

        return new Promise( (resolve, reject) => {
            if(type === "type") {
                resolve(listFilterType);
            } else if(type === "event") {
                resolve(listFilterEvent);
            } else if(type === "diet") {
                resolve(listFilterDiet);
            }
        });
    }

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

    const getRecipesFiltered = (req) => {
        let listRecipe = [];
        let filters = req.body.filters;
        
        return new Promise( (resolve, reject) => {
            fs.readdirSync(recipesFolder).forEach(file => {
                let rawData = fs.readFileSync(recipesFolder + '/' + file);
                let recipeData = JSON.parse(rawData);

                // OK
                if(typeof filters.ingredients != undefined && filters.ingredients.length > 0) {
                    resultIngredients = filterIngredients(recipeData, filters.ingredients);
                } else {
                    resultIngredients = true;
                }

                // OK
                if(typeof filters.type != undefined && filters.type != "") {
                    resultType = filterType(recipeData, filters.type);
                } else {
                    resultType = true;
                }

                // OK
                if(typeof filters.time != undefined) {
                    resultTime = filterTime(recipeData, filters.time);
                }

                if(typeof filters.event != undefined) {
                    resultEvent = filterEvent(recipeData, filters.event);
                }
                resultEvent = true;

                if(typeof filters.allergies != undefined && filters.allergies.length > 0) {
                    resultAllergies = filterAllergies(recipeData, filters.allergies);
                }
                resultAllergies = false;

                if(typeof filters.diet != undefined && filters.diet != "") {
                    resultDiet = filterDiet(recipeData, filters.diet);
                } else {
                    resultDiet = true;
                }
                
                // OK
                if(typeof filters.not_ingredients != undefined && filters.not_ingredients.length > 0) {
                    resultNotIngredients = filterIngredients(recipeData, filters.not_ingredients);
                } else {
                    resultNotIngredients = false;
                }

                // OK
                if(typeof filters.level != undefined) {
                    resultLevel = filterLevel(recipeData, filters.level);
                }

                if(typeof filters.preferences != undefined && filters.preferences.length > 0) {
                    resultPreferences = filterPreferences(recipeData, filters.preferences);
                }
                resultPreferences = true;
                
                console.log(resultIngredients, resultType, resultTime, resultEvent, resultLevel, resultPreferences, !resultAllergies, resultDiet, !resultNotIngredients);

                if(resultIngredients && resultType && resultTime && resultEvent && resultLevel && resultPreferences && !resultAllergies && resultDiet && !resultNotIngredients) {
                    listRecipe.push(recipeData);
                }
            })
            
            console.log(listRecipe.length);
            resolve(listRecipe)
        });
    }

    const filterIngredients = (recipe, filters) => {
        let recipeIngredients = recipe.parsedIngredients.split_ingredients[0].ingredients;
        let result = false;
        
        recipeIngredients.forEach(element => {
            filters.forEach(ingredient => {
                if(element.ingredient.toUpperCase() == ingredient.toUpperCase()) {
                    result = true;
                }
            });
        });

        return result;
    }

    const filterType = (recipe, filter) => {
        let result = false;

        if(typeof detailFilterType[filter] != undefined) {
            recipe.categories.forEach(element => {
                if(detailFilterType[filter].includes(element.title)) {
                    result = true;
                }
            });
        }

        return result;
    }

    const filterTime = (recipe, filters) => {
        return filters.min_time <= recipe.totalTime && recipe.totalTime <= filters.max_time;
    }

    const filterEvent = (recipe, filters) => {

    }

    const filterAllergies = (recipe, filters) => {
        return false;
    }

    const filterDiet = (recipe, filters) => {
        let recipeCategories = recipe.categories;
        let result = false;

        recipeCategories.forEach(element => {
            //console.log(typeof listFilterDiet[element.slug] == undefined);
            if(typeof listFilterDiet[element.slug] != undefined) {
                //console.log(listFilterDiet[element.slug]);
            }
        });
    }

    const filterLevel = (recipe, filter) => {
        return recipe.difficulty.label == filter;
    }

    const filterPreferences = (recipe, filters) => {
        
    }
//

/*
Export
*/
    module.exports = {
        getListFilters,
        getAllRecipes,
        getRecipeById,
        getRecipesFiltered
    }
//