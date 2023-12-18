import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerDashboard from './CustomerDashboard';
import SellerDashboard from './SellerDashboard';
import AddProduct from './AddProduct';
import ShoppingCart from './ShoppingCart';
import OrderConfirmation from './OrderConfirmation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SellerDashboard" >
      <Stack.Screen name="SellerDashboard" component={SellerDashboard} />
      <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
