import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'regenerator-runtime/runtime';
import 'core-js/stable';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
controlRecipes();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
