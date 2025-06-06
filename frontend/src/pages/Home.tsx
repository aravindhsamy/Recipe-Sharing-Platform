import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Clock, Award, Users, ArrowRight, Star, ChefHat } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import { useAuth } from '../contexts/AuthContext';
import RecipeCard from '../components/RecipeCard';

const Home: React.FC = () => {
  const { recipes, likeRecipe } = useRecipes();
  const { user } = useAuth();
  
  const trendingRecipes = recipes.slice(0, 3);
  const recentRecipes = [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-blue-100"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23f97316%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Share Recipes
              </span>
              <br />
              <span className="text-gray-800">Connect Through Food</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover amazing recipes from home cooks around the world. Share your culinary creations and connect with fellow food enthusiasts.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/recipes"
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl hover:from-orange-600 hover:to-red-600 font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-200 hover:scale-105 flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Explore Recipes</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {user ? (
              <Link
                to="/add-recipe"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl hover:bg-white font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20 hover:scale-105"
              >
                Share Your Recipe
              </Link>
            ) : (
              <Link
                to="/signup"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl hover:bg-white font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20 hover:scale-105"
              >
                Join Community
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <StatCard
              icon={<ChefHat className="w-8 h-8" />}
              title="Active Cooks"
              value="10,000+"
              description="Food enthusiasts sharing recipes"
            />
            <StatCard
              icon={<Star className="w-8 h-8" />}
              title="Recipes Shared"
              value="50,000+"
              description="Delicious recipes to explore"
            />
            <StatCard
              icon={<Users className="w-8 h-8" />}
              title="Daily Users"
              value="2,500+"
              description="People cooking together"
            />
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Trending This Week</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most loved recipes by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onLike={likeRecipe}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/recipes"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Recipes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-blue-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Recently Added</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fresh recipes from our talented community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onLike={likeRecipe}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Culinary Masterpiece?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Join thousands of home cooks sharing their favorite recipes and discovering new flavors from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/add-recipe"
                className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-gray-50 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Add Your Recipe
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-gray-50 font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent text-white rounded-xl hover:bg-white/10 font-semibold text-lg transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}> = ({ icon, title, value, description }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:scale-105">
    <div className="text-orange-500 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{value}</h3>
    <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default Home;