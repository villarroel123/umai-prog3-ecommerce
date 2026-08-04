'use client'
import { useState, useContext, createContext, useEffect } from "react";

const AppContext= createContext();

//creo provider

export const AppContextProvider= ({children})=>{
  const [cart, setCart] = useState([]);
  const [favoritos,setFavoritos]=useState([]);
  const [userActive, setUserActive] = useState(null);
  
    const login = (userData) => {
      setUserActive(userData);
    };
    const logout = () => {
      setUserActive(null);
    };
    const addToCart = (product, quantity = 1, customizations = null) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.productId === (product._id || product.id) && JSON.stringify(item.customizations) === JSON.stringify(customizations)
        );
        //si esxiste
        if (existingIndex > -1) {
            const updatedCart = [...prevCart];
            const currentItem = updatedCart[existingIndex];
            const newQuantity = currentItem.quantity + quantity;//sumamos cantidad

            updatedCart[existingIndex] = {
            ...currentItem,
            quantity: newQuantity,
            subtotal: newQuantity * currentItem.price,
            };
            return updatedCart;
        }

        //si es item nuevo
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
    //para eliminar item
    const removeFromCart = (productId, customizations) => {
        setCart((prevCart) =>
        prevCart.filter(
            (item) =>
            !(
                item.productId === productId &&
                JSON.stringify(item.customizations) === JSON.stringify(customizations)
            )
        )
        );
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

    //para favoritos
    const toggleFavorite = (productId) => {
    setFavoritos((item) =>
      item.includes(productId)
        ? item.filter((id) => id !== productId)
        : [...item, productId]
    );
  };


    return( 
        <AppContext.Provider value={{ favoritos, setFavoritos, cart, setCart,toggleFavorite, addToCart, removeFromCart, clearCart, updateQuantity, userActive,setUserActive,login,logout}}>
            {children}
        </AppContext.Provider>
    )


}
export const useAppContext=()=>{
    const context= useContext(AppContext)

    if(!context){
        throw new Error ('useAppContext solo puede usarse dentro del provider');
    }

    return context

}
export default AppContext;