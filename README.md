# Forktastic
![MIT License](https://img.shields.io/badge/License-MIT-green) 
## Description

 This is a recipe app that lets users save and create recipes online. This is so that users can take a more modern approach to the recipe books you would have at home while being able to take up less space.

## 📁 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Usage

1. View, Save, and Review Recipies
<img src="assets/RecipeView.gif"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

2. Change Account Information
<img src="assets/AccountUpdate.gif"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

3. Search for Recipes
<img src="assets/RecipeSearch.gif"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

4. Edit and Creating Recipes
<img src="assets/RecipeEdit.gif"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

5. AI Custom Recipies
<img src="assets/AIRecipe.gif"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

6. Deleting a Recipe
<img src="assets/RecipeDelete.gif"/>


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Installation

please visit [our deployed site](https://forktastic.onrender.com/) to access the application. If you want to run the application from your local machine, follow these instructions:

Ensure you have the Node Package Manager and Postgres installed on your machine. You will need a JWT Secret Key, a Spoonacular API key, and optionally an OpenAI API key.
- [Node.js](https://nodejs.org)
- [MongoDB installation guide](https://www.mongodb.com/docs/manual/installation/)
- [Generate a JWT Secret Key](https://pinetools.com/random-string-generator)
- [Spoonacular API Key](https://spoonacular.com/food-api/console#Dashboard)
- [OpenAI API Key](https://platform.openai.com/settings/organization/api-keys)
```shell
# Step 1: clone this repository, and go to the root directory
git clone https://github.com/Dan-Swarts/Forktacular.git
cd Forktacular

# Step 2: Ensure you have node installed, then use the Node Package Manager to install dependencies:
node -v 
# Example output: v20.17.0
npm install

# Step 3: remove the '.example' from .env.example. Fill in the .env file with your Postgres password,
# JWT Secret Key, Spoonacular API Key, and optionally fill in the port number and/or the OpenAI API
# Key.

# Step 4 (optional): seed the database:
cd server/
npm run build
npm run seed
cd ../ 

# Step 5: start the application:
npm run build
npm run start

# step 6: acess the application through your web browser
# http://localhost:3001/
```

## Contributing

> [!IMPORTANT]
> Whether you have feedback on features, have encountered any bugs, or have suggestions for enhancements, we're eager to hear from you. Your insights help us make the react-portfolio library more robust and user-friendly.

Please feel free to contribute by [submitting an issue](https://github.com) or [joining the discussions](https://github.com). Each contribution helps us grow and improve.

We appreciate your support and look forward to making our product even better with your help!
