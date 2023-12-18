import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { firestore } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigation } from '@react-navigation/native'; 

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const navigation = useNavigation();

  const saveProduct = async () => {
    try {
      if (!productName.trim() || !productType.trim()) {
        alert('Please enter both product name and type.');
        return;
      }

      const productsCollection = collection(firestore, 'Products');
      await addDoc(productsCollection, {
        name: productName,
        type: productType,
     
      });

      setProductName('');
      setProductType('');

      alert('Product added successfully!');
      navigation.navigate('CustomerDashboard');

    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <View>
      <Text>Add Product</Text>
      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        placeholder="Product Type"
        value={productType}
        onChangeText={(text) => setProductType(text)}
      />
      <Button title="Add Product" onPress={saveProduct} />
    </View>
  );
};

export default AddProduct;
