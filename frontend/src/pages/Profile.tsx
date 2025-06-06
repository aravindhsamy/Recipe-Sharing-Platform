import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, BookOpen, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { recipes, likeRecipe } = useRecipes();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userRecipes = recipes.filter(recipe => recipe.author.id === user.id);
  const totalLikes = userRecipes.reduce((sum, recipe) => sum + recipe.likes, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-16 h-16 text-white" />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{userRecipes.length}</div>
                  <div className="text-sm text-gray-500">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{totalLikes}</div>
                  <div className="text-sm text-gray-500">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-500">Joined</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  to="/add-recipe"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Add New Recipe
                </Link>
                <button className="px-6 py-3 bg-white/80 text-gray-700 rounded-xl hover:bg-white border border-gray-200 font-semibold transition-all duration-300 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 border border-red-200 font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User's Recipes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-800">My Recipes</h2>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
              {userRecipes.length} recipe{userRecipes.length !== 1 ? 's' : ''}
            </span>
          </div>

          {userRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onLike={likeRecipe}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes yet</h3>
              <p className="text-gray-500 mb-6">Start sharing your favorite recipes with the community!</p>
              <Link
                to="/add-recipe"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300"
              >
                Add Your First Recipe
              </Link>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Member Since</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {new Date(user.joinedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Total Likes Received</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalLikes}</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Recipes Shared</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">{userRecipes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;