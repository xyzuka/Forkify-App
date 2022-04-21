PROJECT OVERVIEW AND PLANNING

This program will be using the Forkify API created by Jonas: https://forkify-api.herokuapp.com/v2

USER STORIES: As a user, I want to...

1. search for recipes, so that I can find new ideas for my meals
2. update the number of servings, so that I can cook a meal for a different number of people
3. bookmark recipes, so I can review them later
4. create my own recipes, so that I have them all organized in the same application
5. see my bookmarks and own recipes when I leave the app and come back later, so that I can close the app safely after cooking

FEATURES: BASED OFF USER STORIES

1. Search functionality:
   1. input field to send request to API with searched keywords
   2. display result with pagination (clicking page 2 to display more results)
   3. display recipe with cooking time, servings and ingredients
2. change number of servings functionality: update all ingredients according to number of servings
3. book marking recipes functionality: displays list of all bookmarked recipes
4. Recipe creation functionality:
   1. User can upload own recipes
   2. User recipes will be automatically be bookmarked
   3. User can only see their own recipes, not other user’s recipes
5. Local Storage functionality: Stores bookmarked data in the browser local storage

////////////////////////////////////////
STEPS:

1. STARTING: Installing parcel to run sass

- Running npm init (to create a package.json file)
- Setting up package.json scripts to run parcel
- Installing parcel (npm i parcel@2 -D)
- Running start script (npm start)
- Running npm install to start sass

2. MAKING OUR FIRST API CALL

- Will be using the API which Jona's created at https://forkify-api.herokuapp.com/v2
- Create an ajax request with the fetch, async and await method
- Convert the ajax response to json and parse the data
- Error handling (if ok is set to false from a incorrect link request) -> throw a new error containing the message property stored in the response and also the status code
- Formatting the data from the data variable: Create an object which contains the data object from the data variable with better variable names (using destructuring)

3. RENDERING API SEARCH RESULTS

- Copying the hidden html recipes container content to be assigned to a variable containing the html to then insert the html
- Replacing the strings in the html content with template literals referring to the properties from the recipe object created before
- Insert the html into the DOM (on the parent element) with insertAdjacentHTML
- Remove the previous markup before adding a new mark up
- Loop through the ingredients array in the recipe object to create the ingredients recipe mark up (map will be used since we need to return a new string into html markup)
  - Transfer the array of strings into a big string with the join method
- Rendering icons
  - Since the displaying application is coming from the dist folder, our html is referencing the wrong img src
  - We will use parcel to link these modules together
    - At the top of our controller.js file, we will input import 'nameOfImport' from 'srcFileOfImport
    - We will then replace the icon image source path with a template literal of the new icon location
    - Adding a loading spinner when the recipe is loading
      - Add the hidden spinner code in the html
      - Create a external function to render the spinner when the recipe data is being retrieved
  - Adding polyfills to codebase (for async await and everything else)
    - run npm i core-js regenerator-runtime
    - import on the top of the file

4. USER SELECTS RECIPE IN SEARCH BAR
   (LISTENING FOR LOAD AND HASH CHANGE EVENTS)

- Adding a artificial link in the html to listen for the # key which determines the recipe
- Add an event listener for the hashchange and run the showRecipe function to render the recipe
- Refactoring the showRecipe function to update the ID of the selected recipe
- Listening for the entire page loading (to allow users to copy and paste the link on a new tab or window) - adding an event listener with load
- Refactoring the duplicate event listeners to run the two listeners at once
  - Having an array containing the two events and then looping the array to run the event listeners on each of them
- Adding a guard clause to return the function if there is no ID present

5. REFACTORING CODE BASED ON THE MODEL VIEW CONTROLLER ARCHITECTURE

- Creating new files in the src folder which contains the modules for the model, controller, and recipeView
- Refactoring steps:
  - Model.js -> Creating the state object to be exported
  - Model.js -> Creating a new async function, loadRecipe, which will gather recipe data and store it in the {recipe} destructured object
  - Controller.js -> Importing everything from model.js so the modules can exchange information
  - Controller.js -> Calling the loadRecipe function from the model.js to pass in the id (also awaiting the promise, since loadRecipe is a async function)
  - Controller.js -> Added a variable: const { recipe } = model.state; So the markup html can refer to the recipe object inside the module model.js
  - recipeView.js -> Setting up the class, RecipeView: to have private properties ie. #parentElement to render the spinner and the recipe itself
  - Controller.js -> Calling recipeView.render(model.state.recipe)
    - recipeView.js -> Creating the public render method inside the class
  - Controller.js -> Cutting all the markup html code and pasting it into the RecipeView class as a private method, #generateMarkup()
  - recipeView.js -> Creating a method to clear the parent container for abstraction
  - Controller.js -> Renaming the function showRecipes based off the architecture plan
  - recipeView.js -> Exporting the spinner function here
  - Using an external library to update the ingredients quantity formatting
    - npm install fractional
    - Applying the fractional script to the html markup
    - Adding a conditional to check if there is a quantity

6. HELPERS AND CONFIGURATION FILES

- Create a new file in the js file called config.js
- Variables that are constants and will be reused throughout the project will be placed in here
- Moved all the constants which will be reused to the config.js file
- Create a new file for some helper functions
  - Creating a function which will get JSON (from model.js, we will move the async await items to this helper function)
  - Moving the error from helpers.js into the model.js file -> done by throwing the error
  - Adding a timeout for the fetch function to account for slow internet connections (so that the function does not keep running in the background)
  - Adding the timeout seconds in the configuration file

7. EVENT HANDLERS IN MVC: PUBLISHER SUBSCRIBER PATTERN

- Refactoring: We need to move the hash change event listener in the controller.js file to recipeView.js
  - Event listeners will be in the recipeView file (which will be stored in a method, addEventHandler)
  - Controller functions which handle the event listener will be in the controller.js file
  - Creating an init function in the controller.js file to call the addEventHandler method

8. IMPLEMENTING ERROR AND SUCCESS MESSAGES

- Example: Invalid URL being unable to display the recipe
  - Instead of handling the error with a console.error or alert(err); we will display the error message in the UI
  - Moving the error handling to recipeView.js

9. IMPLEMENTING SEARCH FUNCTIONALITY - API Calling

- Module.js -> creating an async function which will be exported to controller.js to make API calls to search for the recipe
  - Based off the Forkify API, we will be making a get RESULT on the path: https://forkify-api.herokuapp.com/api/v2/recipes, with the search parameter
  - We will use the getJSON method to fetch and convert the data to be stored in a new array
- We will then take the data in the object and store it in our state object
- Module.js -> Calling the function loadSearchResults in the controller
- Creating a separate view file for the search input tab and button
  - Creating a query to listen for the contents in the search input
  - Creating an event listener for the search button
  - Clearing search bar when form is submitted

10. RENDERING SEARCH RESULTS - Rendering search results

- Creating a new view file to render the search results
  - Since the class in the recipeView will be similar to the results view, we will refactor the code to be a parent class (in order to reuse all the methods)
  - Creating a new view file, View.js
  - Transferring the content which is shared among the rendering view files into the parent class in View.js
  - Controller.js -> Running the function to render the spinner
- Creating the generate mark up method to display the search results in resultsView.js
- Creating an error message when the user searches for a recipe that does not exist

11. PAGINATION

- Creating a function to render the first 10 recipes only from the search results, and once the user clicks page 1, it will render recipes 10-20
- Updating the state of the page
- controller.js -> updating the rendering function with the function created
- Storing the page number that is coming in to the state

12. IMPLEMENTING PAGINATION BUTTONS

- Creating a new view file for pagination
- Creating a object with a method to display the buttons based off different scenarios
- Running the pagination method/function in the controlSearchResults function since the event happens when the user searches for a recipe
- Adding the logic to determine which page the user is on
- Creating the mark up based off the logic
- Adding event listeners on pagination buttons
- Creating a data attribute on each page to determine which page is to be displayed when the button is clicked

13. UPDATING RECIPE SERVINGS

- Controller.js -> Adding a function in controller.js -> will increase the servings when the user clicks the +/- icons (calls a function in model.js to change the state)
- Model.js -> Function will be called to update the ingredients quantity in the state
- Controller.js -> Updating the recipe view by calling the render method from View.js
- Creating the event listeners to listen for the user click

14. DOM UPDATING ALGORITHM

- When the user updates the recipe servings, the image of the recipe would "flash" -> we will implement a algorithm with updates only specific parts of the DOM ie. the recipe details and not the recipe image
- Creating a new function called update to be called from controlServings to only update the text and attributes in the DOM

  - This function will create a clone copy of the current DOM and compare the differences between the current elements and new elements
  - Note:
    - isEqualNode() method will compare the contents within a node
    - nodeValue() method will returns or sets the value of the current node
    - setAttribute() method will set the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value

- Using the function/algorithm to highlight the selected recipe from the search results
  - resultsView -> we will give a special class to highlight the selected recipe in the markup
    - We will add the class when the current ID in the url is the same as the selected ID, if it is not the same - it will remain blank
      - ${result.id === id ? 'preview\_\_link--active' : ''}

15. IMPLEMENTING BOOKMARKS

- Model.js -> adding a new exported function which will set a recipe as bookmarked
  - Adding a bookmark will push the recipe into the bookmark array inside the state object
- Controller.js -> Adding a controller to call the addBookMark function created
- recipeView.js -> Adding the event listener on the bookmark button
- Adding logic to check if bookmark is true, then render the icon (if not, do nothing)
- Model.js -> Adding logic in loadRecipe() to store clicked bookmarks in the state
- Clicking on the button again will un-bookmark the recipe
  - Model.js -> Creating a function deleteBookmark
  - Controller.js -> Using the created function deleteBookmark in a if else statement
