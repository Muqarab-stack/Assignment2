import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firestore } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

const CustomerDashboard = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'Products'); 
        const querySnapshot = await getDocs(productsCollection);
        
        const productsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsData.push({ id: doc.id, ...data });
        });

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const viewCart = () => {
    navigation.navigate('ShoppingCart', { cart });
  };

  return (
    <View>
      <Text>Customer Dashboard</Text>
      {products.map((product) => (
        <View key={product.id}>
          <Text>{product.name}</Text>
          <Text>{product.type}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(product)} />
        </View>
      ))}
      <Button title="View Cart" onPress={viewCart} />
    </View>
  );
};

export default CustomerDashboard;
