import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </Layout>
        </Router>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;