import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function CharacterDetailScreen({ route }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => setCharacter(response.data))
      .catch(error => console.log(error));
  }, []);

  if (!character) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.detail}>Status: {character.status === 'Alive' ? 'Vivo' : character.status === 'Dead' ? 'Morto' : 'Desconhecido'}</Text>
      <Text style={styles.detail}>Espécie: {character.species}</Text>
      <Text style={styles.detail}>Gênero: {character.gender === 'Male' ? 'Masculino' : character.gender === 'Female' ? 'Feminino' : 'Outro'}</Text>
      <Text style={styles.detail}>Origem: {character.origin.name}</Text>
      <Text style={styles.detail}>Local Atual: {character.location.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#222' },
  image: { width: 200, height: 200, borderRadius: 10 },
  name: { color: '#00ff00', fontSize: 22, marginVertical: 10 },
  detail: { color: '#fff', fontSize: 16, marginTop: 4 },
});
