import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoria: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  distancia: {
    color: '#27ae60',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
  }
});

export default styles;