// OrderConfirmation.js
import React from 'react';
import { View, Text } from 'react-native';

const OrderConfirmation = ({ route }) => {
  const { orderId } = route.params;

  return (
    <View>
      <Text>Order Confirmation</Text>
      <Text>Your order was successful!</Text>
      <Text>Order ID: {orderId}</Text>
      {/* You can add more details about the order here */}
    </View>
  );
};

export default OrderConfirmation;
