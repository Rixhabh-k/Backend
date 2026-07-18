import React, { useEffect, useState } from "react";
import {
  Search,
  Clock,
  ChevronDown,
  Trash2,
  UtensilsCrossed,
  Tag,
  Flame,
} from "lucide-react";
import axios from "axios";

export default function RecipeList({ recipes, onDeleteRecipe }) {
  const [recipeData, setRecipeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCards, setExpandedCards] = useState({});

 function fetchRecipe() {
  axios.get("http://localhost:3000/api/recipe/get-recipe")
    .then((res) => {
      console.log(res.data.recipe);
      console.log(Array.isArray(res.data));

      setRecipeData(res.data);
    });
}

  useEffect(() => {
    fetchRecipe();
  }, []);

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Beverage",
  ];

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getDifficultyStyles = (diff) => {
    switch (diff) {
      case "Easy":
        return {
          "--diff-bg": "rgba(16, 185, 129, 0.1)",
          "--diff-text": "#a7f3d0",
          "--diff-border": "rgba(16, 185, 129, 0.2)",
        };
      case "Medium":
        return {
          "--diff-bg": "rgba(245, 158, 11, 0.1)",
          "--diff-text": "#fde68a",
          "--diff-border": "rgba(245, 158, 11, 0.2)",
        };
      case "Hard":
        return {
          "--diff-bg": "rgba(239, 68, 68, 0.1)",
          "--diff-text": "#fca5a5",
          "--diff-border": "rgba(239, 68, 68, 0.2)",
        };
      default:
        return {};
    }
  };

  // Filter and Search logic
  const filteredRecipes = recipeData.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explorer-panel">
      {/* Search and Filters Header */}
      <div className="explorer-header">
        <h2 className="explorer-title">
          <UtensilsCrossed size={24} style={{ color: "#f97316" }} />
          Culinary Catalog ({filteredRecipes.length})
        </h2>

        <div className="search-filter-bar">
          {/* Search Bar */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search title, ingredients or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="filter-group">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => {
            const isExpanded = expandedCards[recipe._id];
            const diffStyle = getDifficultyStyles(recipe.difficulty);

            return (
              <div key={recipe._id} className="recipe-card">
                {/* Header */}
                <div className="card-header">
                  <div>
                    <h3 className="recipe-card-title">{recipes.title}</h3>
                    <p className="card-description">{recipes.description}</p>
                  </div>
                  <button
                    onClick={() => onDeleteRecipe(recipe._id)}
                    className="btn-delete-recipe"
                    title="Delete recipe"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Metadata badges */}
                <div className="card-badges">
                  <span className="badge badge-tag">
                    <Tag size={12} />
                    {recipe.category}
                  </span>
                  <span className="badge badge-time">
                    <Clock size={12} />
                    {recipe.prepTime} mins
                  </span>
                  <span className="badge badge-difficulty" style={diffStyle}>
                    <Flame size={12} />
                    {recipe.difficulty}
                  </span>
                </div>

                <div className="card-divider"></div>

                {/* Ingredients section */}
                <div>
                  <h4 className="card-section-title">Ingredients</h4>
                  <ul className="card-ingredients-list">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="card-ingredient-tag">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions section (Expandable) */}
                <div
                  className={`expandable-content ${isExpanded ? "expanded" : ""}`}
                >
                  <div className="card-divider"></div>
                  <h4 className="card-section-title">Instructions</h4>
                  <ol className="card-steps-list">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="card-step-item">
                        <span className="card-step-num">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Expand toggler */}
                <button
                  onClick={() => toggleExpand(recipe._id)}
                  className={`btn-expand-card ${isExpanded ? "expanded" : ""}`}
                >
                  <span>{isExpanded ? "Hide Steps" : "View Steps"}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <UtensilsCrossed size={48} className="empty-state-icon" />
            <h3>No culinary creations found</h3>
            <p>
              {recipeData.length === 0
                ? "Get started by creating your very first recipe using the panel on the left."
                : "No recipes match your search filters. Try adjusting them!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
