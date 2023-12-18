import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { firestore} from './firebaseconfig';

const SellerDashboard = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = firestore.collection('products');
      const snapshot = await productsRef.get();
      const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const addProduct = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <View>
      <Text>Seller Dashboard</Text>
      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))}
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

export default SellerDashboard;
