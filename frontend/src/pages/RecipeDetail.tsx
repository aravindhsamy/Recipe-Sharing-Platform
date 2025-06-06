import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Bookmark, Share2, PrinterIcon } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, likeRecipe } = useRecipes();
  
  const recipe = id ? getRecipeById(id) : undefined;

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe not found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist</p>
          <Link
            to="/recipes"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-200">
            <PrinterIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{recipe.title}</h1>
          <p className="text-white/90 text-lg">{recipe.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recipe Meta */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-500">Cook Time</p>
                  <p className="font-semibold">{recipe.cookTime} mins</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-semibold">{recipe.servings}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                    <ChefHat className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500">Difficulty</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => likeRecipe(recipe.id)}
                    className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-2 hover:bg-red-200 transition-colors"
                  >
                    <Heart className="w-6 h-6 text-red-600" />
                  </button>
                  <p className="text-sm text-gray-500">Likes</p>
                  <p className="font-semibold">{recipe.likes}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg border border-white/20">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 text-sm font-medium">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex space-x-4 p-4 bg-white/60 rounded-lg border border-white/20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recipe by</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{recipe.author.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Category & Tags */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Category & Tags</h3>
              <div className="space-y-3">
                <div>
                  <span className="inline-block px-3 py-2 bg-orange-100 text-orange-600 rounded-lg text-sm font-medium border border-orange-200">
                    {recipe.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium border border-blue-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 font-medium transition-all duration-200">
                  Save to Favorites
                </button>
                <button className="w-full px-4 py-3 bg-white/80 text-gray-700 rounded-lg hover:bg-white border border-gray-200 font-medium transition-all duration-200">
                  Print Recipe
                </button>
                <button className="w-full px-4 py-3 bg-white/80 text-gray-700 rounded-lg hover:bg-white border border-gray-200 font-medium transition-all duration-200">
                  Share Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;