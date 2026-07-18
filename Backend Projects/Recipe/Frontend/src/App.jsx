import React, { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import { ChefHat, Flame, Sparkles } from 'lucide-react';

export default function App() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
  };

  const handleDeleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="app-container">
      {/* Left Column: Creator Panel */}
      <aside className="creator-panel">
        <h1 className="brand-title">
          <ChefHat size={32} style={{ color: '#f97316' }} />
          ChefCraft
        </h1>
        <p className="panel-description">
          Create, organize, and view your custom cooking creations with a modern, glassmorphic interactive kitchen dashboard.
        </p>
        <RecipeForm onAddRecipe={handleAddRecipe} />
      </aside>

      {/* Right Column: Recipe List Explorer */}
      <main className="explorer-panel">
        <RecipeList recipes={recipes} onDeleteRecipe={handleDeleteRecipe} />
      </main>
    </div>
  );
}
