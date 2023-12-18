
import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from './firebaseconfig';

const ShoppingCart = ({ route }) => {
  const { cart } = route.params;
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigation = useNavigation();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const ordersCollection = collection(firestore, 'Orders');
      const orderDocRef = await addDoc(ordersCollection, {
        items: cart.map((item) => ({ name: item.name, quantity: item.quantity })),
        total: calculateTotal(),
        timestamp: Timestamp.now(),
    
      });
      setIsCheckingOut(false);
      navigation.navigate('OrderConfirmation', { orderId: orderDocRef.id });
    } catch (error) {
      console.error('Error during checkout:', error.message);
      setIsCheckingOut(false);
      Alert.alert('Please try again.');
    }
  };

  return (
    <View>
      <Text>Shopping Cart</Text>
      {cart.map((item) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
         
        </View>
      ))}
      <Text>Total: {calculateTotal()}</Text>
      <Button title={isCheckingOut ? 'Checking Out...' : 'Checkout'} onPress={handleCheckout} disabled={isCheckingOut} />
    </View>
  );
};

export default ShoppingCart;
