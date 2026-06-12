import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  content: { 
    padding: 20 
  },
  nome: { 
    fontSize: 26, 
    fontWeight: 'bold',
    marginBottom: 10
  },
  categoria: { 
    fontSize: 18, 
    color: '#666', 
    marginBottom: 5
  },
  distancia: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
    marginBottom: 15
  },
  descricao: { 
    fontSize: 16, 
    lineHeight: 24, 
    marginBottom: 25, 
    color: '#444' 
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  buttonWrapper: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 4,
  }
});

export default styles;