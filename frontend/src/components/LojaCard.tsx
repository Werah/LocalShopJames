import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './StyleLojaCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { Loja,RootStackParamList } from '../@types/loja';

type NavigationProp= StackNavigationProp<RootStackParamList, 'Home'>;

interface Props{
  loja: Loja;
}

export default function LojaCard({ loja }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageUri = loja.imagem && loja.imagem.trim() !== '' 
    ? loja.imagem 
    : 'https://via.placeholder.com/100?text=Sem+Foto';

  console.log('LojaCard renderizando:', { nome: loja.nome, imagem: imageUri });

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detalhes', { loja })}
    >
      <View style={styles.imageContainer}>
        {loading && <ActivityIndicator size="small" color="#27ae60" style={styles.loader} />}
        {imageError ? (
          <View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ fontSize: 10, color: '#999' }}>Erro ao carregar</Text>
          </View>
        ) : (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image}
            resizeMode="cover"
            onLoadEnd={() => setLoading(false)}
            onError={(error) => {
              console.error('Erro ao carregar imagem:', error);
              setImageError(true);
              setLoading(false);
            }}
          />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={2}>{loja.nome}</Text>
        <Text style={styles.categoria} numberOfLines={1}>{loja.categoria}</Text>
        <Text style={styles.distancia}>{loja.distancia} m</Text>
      </View>
    </TouchableOpacity>
  );
}

