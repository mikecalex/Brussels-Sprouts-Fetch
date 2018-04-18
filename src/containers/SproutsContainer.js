import React, { Component } from 'react';
import RandomSprout from '../components/RandomSprout';
import SproutsIndex from '../components/SproutsIndex';
import LongestRecipe from '../components/LongestRecipe';


class SproutsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: "",
      recipes: [],
      longestRecipe: ""
    }
  }

  getRandomRecipe(){
    fetch('http://localhost:4567/api/v1/random-recipe')
    .then(response => response.json())
    .then(data => {
      this.setState({ recipe: data})
    })
  }

  getAllRecipes(){
    fetch('http://localhost:4567/api/v1/recipes')
    .then(response => response.json())
    .then(data => {
      this.setState({ recipes: data})
    })
  }

  getLongestRecipe(){
    fetch('http://localhost:4567/api/v1/longest-recipe')
    .then(response => response.json())
    .then(data => {
      this.setState({ longestRecipe: data})
    })
  }

  render(){

    let handleRandomClick = () => {
      if(this.state.recipes.length == 0 && this.state.longestRecipe == '') {
        this.getRandomRecipe();
      } else {
        this.setState({ recipes: [] })
        this.setState({ longestRecipe: ''})
        this.getRandomRecipe();
      }
    }

    let handleIndexClick = () => {
      if(this.state.recipe == '' && this.state.longestRecipe == '') {
        this.getAllRecipes();
      } else {
        this.setState({ recipe: '' })
        this.setState({ longestRecipe: ''})
        this.getAllRecipes();
      }
    }

    let handleLongestClick = () => {
      if(this.state.recipes.length == 0 && this.state.recipe == '') {
        this.getLongestRecipe();
      } else {
        this.setState({ recipes: [] })
        this.setState({ recipe: ''})
        this.getLongestRecipe();
      }
    }

    return(
      <div className="container">
        <h1>Sprout Fetcher</h1>
        <RandomSprout
          recipe={this.state.recipe}
        />
        <SproutsIndex
          recipes={this.state.recipes}
        />
        <LongestRecipe
          longest={this.state.longestRecipe}
        />

        <div className="buttons">
          <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

          <button onClick={handleIndexClick} className="btn">See All Recipes</button>

          <button onClick={handleLongestClick} className="btn">See Longest Recipe</button>
        </div>
      </div>
    )
  }
}

export default SproutsContainer;
