import { View, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import LojaCard from '../../components/LojaCard';
import { useLojas } from '../../hooks/useLojas';
import styles from './StyleHome';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import { RootStackParamList } from '../../@types/loja';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { lojas, loading, recaregarLojas } = useLojas();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      recaregarLojas();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" color="#27ae60"/>;

  return (
    <View style={styles.container}>
      <FlatList
        data={lojas}
        renderItem={({ item }) => <LojaCard loja={item} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}