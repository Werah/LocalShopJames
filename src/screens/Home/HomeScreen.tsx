import { View, FlatList, ActivityIndicator } from 'react-native';
import { useLojas } from '../../Hooks/useLojas';
import LojaCard from '../../components/LojaCard';

//import { View, Text, FlatList } from 'react-native';
//import LojaCard from '../../components/LojaCard';
//import { LOJAS } from '../../data/mockData';
//import { styles } from './StyleHome';

export default function HomeScreen() {
  const {lojas, loading} = useLojas();

  if (loading) return <ActivityIndicator size="large" color="#27ae60" />;

  return (
    <View style={{ flex: 1}}>
      <FlatList
        data={lojas}
        renderItem={({ item }) => <LojaCard loja={item}/>}
    />
    </View>
      );
}