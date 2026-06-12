import { View, Text, Image, Button, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { styles } from './StyleDetalhes';
import { api } from '../../services/api';

export default function LojaDetalhes({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [deletando, setDeletando] = useState(false);
  
  const { loja } = route.params;

  const imageUri = loja.imagem && loja.imagem.trim() !== '' 
    ? loja.imagem 
    : 'https://via.placeholder.com/300x200?text=Sem+Foto';

  const handleDeletear = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja deletar "${loja.nome}"?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              setDeletando(true);
              await api.delete(`/lojas/${loja.id}`);
              Alert.alert('Sucesso', 'Loja deletada com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              console.error('Erro ao deletar:', error);
              Alert.alert('Erro', 'Não foi possível deletar a loja');
            } finally {
              setDeletando(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && <ActivityIndicator size="large" color="#27ae60" style={styles.loader} />}
        {imageError ? (
          <View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: '#999' }}>Erro ao carregar imagem</Text>
          </View>
        ) : (
          <Image 
            source={{ uri: imageUri }} 
            style={styles.image}
            resizeMode="cover"
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.nome}>{loja.nome}</Text>
        <Text style={styles.categoria}>{loja.categoria}</Text>
        <Text style={styles.distancia}>Distância: {loja.distancia}m</Text>
        <Text style={styles.descricao}>{loja.descricao || 'Bem-vindo à ' + loja.nome + '! Aqui você encontra os melhores produtos da região com entrega rápida.'}</Text>
        
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button 
              title="Editar" 
              onPress={() => navigation.navigate('Cadastro', { loja })} 
              color="#27ae60"
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button 
              title="Deletar" 
              onPress={handleDeletear}
              disabled={deletando}
              color="#e74c3c"
            />
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button 
            title="Voltar" 
            onPress={() => navigation.goBack()} 
            color="#666"
          />
        </View>
      </View>
    </ScrollView>
  );
}