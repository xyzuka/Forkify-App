PROJECT OVERVIEW AND PLANNING

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
