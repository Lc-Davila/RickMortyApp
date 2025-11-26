import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CharacterListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CharacterDetail', { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Status: {item.status === 'Alive' ? 'Vivo' : item.status === 'Dead' ? 'Morto' : 'Desconhecido'}</Text>
              <Text style={styles.detail}>Espécie: {item.species === 'Human' ? 'Humano': item.species === 'Alien' ? 'Alien':''}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#222' },
  card: { flexDirection: 'row', backgroundColor: '#333', borderRadius: 8, padding: 10, marginVertical: 5 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  name: { color: '#00ff00', fontSize: 16 },
  detail: { color: '#fff' },
});
