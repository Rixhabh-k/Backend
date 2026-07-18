import React, { useState } from "react";
import {
  Plus,
  X,
  Clock,
  ChefHat,
  Tag,
  BookOpen,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import axios from "axios";

export default function RecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("Dinner");

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [stepInput, setStepInput] = useState("");
  const [steps, setSteps] = useState([]);

  const [errors, setErrors] = useState({});

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const val = ingredientInput.trim();
    if (val) {
      if (!ingredients.includes(val)) {
        setIngredients([...ingredients, val]);
      }

      setIngredientInput("");
      setErrors((prev) => ({ ...prev, ingredients: null }));
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    const val = stepInput.trim();
    if (val) {
      setSteps([...steps, val]);
      setStepInput("");
      setErrors((prev) => ({ ...prev, steps: null }));
    }
  };

  const handleRemoveStep = (indexToRemove) => {
    setSteps(steps.filter((_, index) => index !== indexToRemove));
  };

  function fetchRecipe(){
    axios.get("http://localhost:3000/api/recipe/get-recipe").then((res)=>{
      const data = res.data

      console.log(data)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required";
    if (ingredients.length === 0)
      newErrors.ingredients = "Add at least one ingredient";
    if (steps.length === 0) newErrors.steps = "Add at least one step";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddRecipe({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || "A delicious homemade recipe.",
      prepTime: Number(prepTime) || 15,
      difficulty,
      category,
      ingredients,
      steps,
    });

    axios.post("http://localhost:3000/api/recipe/create-recipe", {
      title,
      description,
      prepTime,
      difficulty,
      category,
      ingredients,
      steps,
    }).then((res)=>{
      console.log(res.data)
    })

    fetchRecipe()

    // Reset Form
    setTitle("");
    setDescription("");
    setPrepTime("");
    setDifficulty("Easy");
    setCategory("Dinner");
    setIngredients([]);
    setSteps([]);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      {/* Recipe Title */}
      <div className="form-group">
        <label className="form-label">Recipe Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
          }}
          placeholder="e.g. Creamy Tuscan Chicken"
          className="form-input"
        />
        {errors.title && (
          <span
            style={{
              color: "var(--hard-color)",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <AlertCircle size={14} /> {errors.title}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">Brief Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your recipe in a sentence or two..."
          className="form-textarea"
        />
      </div>

      {/* Prep Time & Difficulty */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Prep Time (mins)</label>
          <input
            type="number"
            min="1"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g. 25"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="form-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Dinner">Dinner</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dessert">Dessert</option>
          <option value="Snack">Snack</option>
          <option value="Beverage">Beverage</option>
        </select>
      </div>

      {/* Ingredients Builder */}
      <div className="form-group">
        <label className="form-label">Ingredients *</label>
        <div className="list-builder-row">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddIngredient(e);
              }
            }}
            placeholder="e.g. 2 boneless chicken breasts"
            className="form-input list-builder-input"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="btn-add-item"
          >
            <Plus size={20} />
          </button>
        </div>
        {errors.ingredients && (
          <span
            style={{
              color: "var(--hard-color)",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <AlertCircle size={14} /> {errors.ingredients}
          </span>
        )}
        {ingredients.length > 0 && (
          <div className="items-list">
            {ingredients.map((ing, idx) => (
              <span key={idx} className="item-tag">
                {ing}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="btn-remove-tag"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Instructions Steps Builder */}
      <div className="form-group">
        <label className="form-label">Instructions / Steps *</label>
        <div className="list-builder-row">
          <input
            type="text"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddStep(e);
              }
            }}
            placeholder="e.g. Season chicken with salt and paprika..."
            className="form-input list-builder-input"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="btn-add-item"
          >
            <Plus size={20} />
          </button>
        </div>
        {errors.steps && (
          <span
            style={{
              color: "var(--hard-color)",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <AlertCircle size={14} /> {errors.steps}
          </span>
        )}
        {steps.length > 0 && (
          <div className="steps-list">
            {steps.map((step, idx) => (
              <div key={idx} className="step-item">
                <span className="step-number">{idx + 1}</span>
                <span className="step-text">{step}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="btn-remove-step"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-submit">
        <Sparkles size={20} />
        Create Recipe
      </button>
    </form>
  );
}

// Inline mini helper component for steps deletion
function TrashIcon({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
