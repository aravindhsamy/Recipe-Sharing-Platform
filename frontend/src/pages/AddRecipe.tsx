import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Upload, X } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';

const AddRecipe: React.FC = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    category: 'Italian',
    tags: ['']
  });
  
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Italian', 'Asian', 'Mexican', 'American', 'French', 'Indian', 'Mediterranean', 'Healthy', 'Dessert', 'Breakfast'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cookTime' || name === 'servings' ? parseInt(value) : value
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setter(newArray);
  };

  const addArrayItem = (array: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter([...array, '']);
  };

  const removeArrayItem = (
    index: number,
    array: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (array.length > 1) {
      setter(array.filter((_, i) => i !== index));
    }
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      setFormData(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      const recipe = {
        ...formData,
        ingredients: ingredients.filter(ingredient => ingredient.trim() !== ''),
        instructions: instructions.filter(instruction => instruction.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }
      };

      addRecipe(recipe);
      navigate('/recipes');
    } catch (error) {
      console.error('Error adding recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to add a recipe</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Share Your <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Recipe</span>
          </h1>
          <p className="text-lg text-gray-600">
            Share your culinary creation with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter recipe title"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your recipe"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/recipe-image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time (minutes)</label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
              <button
                type="button"
                onClick={() => addArrayItem(ingredients, setIngredients)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ingredient</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, e.target.value, ingredients, setIngredients)}
                    className="flex-1 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter ingredient"
                    required
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, ingredients, setIngredients)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
              <button
                type="button"
                onClick={() => addArrayItem(instructions, setInstructions)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 flex space-x-3">
                    <textarea
                      value={instruction}
                      onChange={(e) => handleArrayChange(index, e.target.value, instructions, setInstructions)}
                      rows={3}
                      className="flex-1 px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder="Describe this step"
                      required
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, instructions, setInstructions)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors h-fit"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Tags</h2>
              <button
                type="button"
                onClick={addTag}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tag</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/80 rounded-lg border border-gray-200 px-3 py-2">
                  <span className="text-blue-600">#</span>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="bg-transparent focus:outline-none text-sm"
                    placeholder="tag"
                    required
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Publishing Recipe...' : 'Publish Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;