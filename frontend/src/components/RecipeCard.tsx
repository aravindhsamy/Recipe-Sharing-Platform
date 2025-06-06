import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart, ChefHat } from 'lucide-react';
import { Recipe } from '../contexts/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
  onLike?: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onLike }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden hover:scale-[1.02]">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <Link to={`/recipe/${recipe.id}`}>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
              {recipe.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {recipe.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime}m</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings}</span>
            </div>
          </div>
          <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-medium">
            {recipe.category}
          </span>
        </div>

        {/* Author & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{recipe.author.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(recipe.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => onLike?.(recipe.id)}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/80 hover:bg-red-50 transition-colors duration-200 group/like"
          >
            <Heart className="w-4 h-4 text-red-500 group-hover/like:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">{recipe.likes}</span>
          </button>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map(tag => (
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
  );
};

export default RecipeCard;