"use client";

import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userActive, setUserActive] = useState(null);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (!userActive) return;
      const userId = userActive._id || userActive.id;
      try {
        const response = await axios.get(`/api/users/${userId}/favorites`);
        if (response.data?.favorites) {
          setFavorites(response.data.favorites);
        }
      } catch (error) {
        console.error("Error al cargar favoritos de la BD:", error);
      }
    };

    fetchUserFavorites();
  }, [userActive]);

  const login = async (userData) => {
    setUserActive(userData);
    if (userData) {
      await syncFavoritesOnLogin(userData);
    }
  };

  const logout = () => {
    setUserActive(null);
    setFavorites([]);
  };

  const addToCart = (product, quantity = 1, customizations = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.productId === (product._id || product.id) && 
          JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingIndex];
        const newQuantity = currentItem.quantity + quantity;

        updatedCart[existingIndex] = {
          ...currentItem,
          quantity: newQuantity,
          subtotal: newQuantity * currentItem.price,
        };
        return updatedCart;
      }

      const newItem = {
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        customizations,
        subtotal: product.price * quantity,
      };

      return [...prevCart, newItem];
    });
  };
  const removeFromCart = (identifier, customizations) => {
    setCart((prevCart) => {
      if (typeof identifier === "number") {
        return prevCart.filter((_, index) => index !== identifier);
      }
      return prevCart.filter(
        (item) =>
          !(
            item.productId === identifier &&
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
          )
      );
    });
  };

  const updateQuantity = (indexToUpdate, newQuantity) => {
    if (newQuantity < 1) return; 

    setCart((prevCart) =>
      prevCart.map((item, index) => {
        if (index === indexToUpdate) {
          return {
            ...item,
            quantity: newQuantity,
            subtotal: item.price * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };
  const addFavorite = async (product) => {
    const productId = product._id || product.id;
    
    if (favorites.some((item) => (item._id || item.id) === productId)) return;

    setFavorites((prev) => [...prev, product]);

    if (userActive) {
      const userId = userActive._id || userActive.id;
      try {
        await axios.post(`/api/users/${userId}/favorites`, { productId });
      } catch (error) {
        console.error("Error al guardar favorito en la BD:", error);
        setFavorites((prev) => prev.filter((p) => (p._id || p.id) !== productId));
      }
    }
  };

  const removeFavorite = async (productId) => {
    setFavorites((prev) =>
      prev.filter((item) => {
        const id = typeof item === "string" ? item : (item._id || item.id);
        return id !== productId;
      })
    );

    if (userActive) {
      const userId = userActive._id || userActive.id;
      try {
        await axios.delete(`/api/users/${userId}/favorites/${productId}`);
      } catch (error) {
        console.error("Error al eliminar favorito de la BD:", error);
      }
    }
  };

  const toggleFavorite = (product) => {
    const productId = product._id || product.id;
    const isFav = favorites.some((item) => (item._id || item.id) === productId);

    if (isFav) {
      removeFavorite(productId);
    } else {
      addFavorite(product);
    }
  };

  const syncFavoritesOnLogin = async (user) => {
    const userId = user._id || user.id;
    const temporaryIds = favorites.map((item) => item._id || item.id);

    try {
      const response = await axios.put(`/api/users/${userId}/favorites/sync`, {
        productIds: temporaryIds,
      });

      if (response.data?.favorites) {
        setFavorites(response.data.favorites);
      }
    } catch (error) {
      console.error("Error al sincronizar favoritos:", error);
    }
  };

  return ( 
    <AppContext.Provider value={{ 
      favorites, 
      setFavorites, 
      addFavorite, 
      removeFavorite, 
      syncFavoritesOnLogin, 
      toggleFavorite, 
      cart, 
      setCart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateQuantity, 
      userActive, 
      setUserActive, 
      login, 
      logout 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext solo puede usarse dentro del provider');
  }

  return context;
};

export default AppContext;