import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  category: string;
  tags: string[];
}

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'likes'>) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  searchRecipes: (query: string) => Recipe[];
  getRecipesByCategory: (category: string) => Recipe[];
  likeRecipe: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

const defaultRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, and basil.',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '1 pizza dough',
      '1/2 cup marinara sauce',
      '8 oz fresh mozzarella',
      '2 large tomatoes',
      'Fresh basil leaves',
      '2 tbsp olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on floured surface',
      'Spread marinara sauce evenly',
      'Add sliced mozzarella and tomatoes',
      'Drizzle with olive oil and season',
      'Bake for 12-15 minutes until golden',
      'Top with fresh basil before serving'
    ],
    author: { id: '1', name: 'Chef Mario', avatar: '' },
    createdAt: '2024-01-15T10:00:00Z',
    likes: 124,
    category: 'Italian',
    tags: ['pizza', 'vegetarian', 'classic']
  },
  {
    id: '2',
    title: 'Creamy Chicken Alfredo',
    description: 'Rich and creamy pasta dish with tender chicken and parmesan cheese.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '1 lb fettuccine pasta',
      '2 chicken breasts',
      '1 cup heavy cream',
      '1/2 cup butter',
      '1 cup parmesan cheese',
      '3 cloves garlic',
      'Salt, pepper, parsley'
    ],
    instructions: [
      'Cook pasta according to package directions',
      'Season and grill chicken, then slice',
      'Melt butter in large pan, add garlic',
      'Pour in cream and bring to simmer',
      'Add parmesan and stir until smooth',
      'Toss pasta with sauce',
      'Top with chicken and parsley'
    ],
    author: { id: '2', name: 'Sarah Johnson', avatar: '' },
    createdAt: '2024-01-14T15:30:00Z',
    likes: 89,
    category: 'Italian',
    tags: ['pasta', 'chicken', 'creamy']
  },
  {
    id: '3',
    title: 'Fresh Garden Salad',
    description: 'Crisp mixed greens with seasonal vegetables and homemade vinaigrette.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      'Mixed greens',
      '1 cucumber',
      '2 tomatoes',
      '1/2 red onion',
      '1/4 cup olive oil',
      '2 tbsp balsamic vinegar',
      '1 tsp honey',
      'Salt and pepper'
    ],
    instructions: [
      'Wash and dry all greens thoroughly',
      'Chop vegetables into bite-sized pieces',
      'Whisk olive oil, vinegar, and honey',
      'Season dressing with salt and pepper',
      'Combine vegetables in large bowl',
      'Drizzle with dressing just before serving',
      'Toss gently and serve immediately'
    ],
    author: { id: '3', name: 'Emma Green', avatar: '' },
    createdAt: '2024-01-13T12:00:00Z',
    likes: 67,
    category: 'Healthy',
    tags: ['salad', 'vegetarian', 'fresh']
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
    image: 'https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: 45,
    servings: 24,
    difficulty: 'Easy',
    ingredients: [
      '2 1/4 cups flour',
      '1 tsp baking soda',
      '1 cup butter',
      '1/2 cup sugar',
      '1 cup brown sugar',
      '2 eggs',
      '2 tsp vanilla',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C)',
      'Mix flour and baking soda in bowl',
      'Cream butter and both sugars',
      'Beat in eggs and vanilla',
      'Gradually add flour mixture',
      'Stir in chocolate chips',
      'Drop spoonfuls on baking sheet',
      'Bake 9-11 minutes until golden'
    ],
    author: { id: '4', name: 'Baker Bob', avatar: '' },
    createdAt: '2024-01-12T09:15:00Z',
    likes: 156,
    category: 'Dessert',
    tags: ['cookies', 'chocolate', 'baking']
  },
  {
    id: '5',
    title: 'Spicy Thai Pad Thai',
    description: 'Authentic Thai stir-fried noodles with shrimp, tofu, and fresh vegetables.',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=500',
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '8 oz rice noodles',
      '1/2 lb shrimp',
      '4 oz firm tofu',
      '2 eggs',
      '1 cup bean sprouts',
      '3 green onions',
      'Pad thai sauce',
      'Peanuts, lime wedges'
    ],
    instructions: [
      'Soak rice noodles in warm water',
      'Heat oil in large wok or pan',
      'Scramble eggs and set aside',
      'Stir-fry shrimp and tofu',
      'Add drained noodles and sauce',
      'Toss in vegetables and eggs',
      'Garnish with peanuts and lime',
      'Serve immediately while hot'
    ],
    author: { id: '5', name: 'Chef Lin', avatar: '' },
    createdAt: '2024-01-11T18:45:00Z',
    likes: 98,
    category: 'Asian',
    tags: ['thai', 'noodles', 'spicy']
  }
];

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(defaultRecipes);

  useEffect(() => {
    const stored = localStorage.getItem('recipes');
    if (stored) {
      setRecipes(JSON.parse(stored));
    }
  }, []);

  const addRecipe = (newRecipe: Omit<Recipe, 'id' | 'createdAt' | 'likes'>) => {
    const recipe: Recipe = {
      ...newRecipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    const updatedRecipes = [recipe, ...recipes];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const searchRecipes = (query: string) => {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const getRecipesByCategory = (category: string) => {
    return recipes.filter(recipe => recipe.category === category);
  };

  const likeRecipe = (id: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === id ? { ...recipe, likes: recipe.likes + 1 } : recipe
      )
    );
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      addRecipe,
      getRecipeById,
      searchRecipes,
      getRecipesByCategory,
      likeRecipe
    }}>
      {children}
    </RecipeContext.Provider>
  );
};