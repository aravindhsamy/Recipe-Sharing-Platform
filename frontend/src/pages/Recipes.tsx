import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const Recipes: React.FC = () => {
  const { recipes, likeRecipe } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', ...Array.from(new Set(recipes.map(recipe => recipe.category)))];

  const filteredAndSortedRecipes = useMemo(() => {
    let filteredRecipes = recipes;

    // Filter by search query
    if (searchQuery) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }

    // Sort recipes
    switch (sortBy) {
      case 'recent':
        return [...filteredRecipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popular':
        return [...filteredRecipes].sort((a, b) => b.likes - a.likes);
      case 'quickest':
        return [...filteredRecipes].sort((a, b) => a.cookTime - b.cookTime);
      case 'alphabetical':
        return [...filteredRecipes].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filteredRecipes;
    }
  }, [recipes, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Recipes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore thousands of delicious recipes shared by our talented community of home cooks
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="quickest">Quickest</option>
                <option value="alphabetical">Alphabetical</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-white/80 rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'All') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedCategory !== 'All' && (
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing {filteredAndSortedRecipes.length} recipe{filteredAndSortedRecipes.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Recipe Grid/List */}
        {filteredAndSortedRecipes.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onLike={likeRecipe}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No recipes found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all recipes
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-semibold transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;