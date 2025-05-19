import { fetchGetAllJenisMangrove } from '@/service/api';
import useFetch from '@/service/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Jenismangrove() {
  const navigation = useNavigation();

  const { data: mangroves, loading: mangrovesLoading, error: mangroveError } = useFetch(() => fetchGetAllJenisMangrove());

  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        {mangrovesLoading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 80, alignSelf: 'center' }} />
        ) : mangroveError ? (
          <Text style={{ color: 'white', textAlign: 'center' }}>Error: {mangroveError?.message}</Text>
        ) : (
          <FlatList
            contentContainerStyle={{ paddingTop: 60, alignItems: 'center', paddingBottom: 100 }}
            data={mangroves}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const imageUrl = `http://195.200.15.181:5001${item.imgSRCDaun}`;
              return (
                <View style={styles.card}>
                  <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.nama}</Text>
                    <Text style={styles.description} numberOfLines={3}>{item.dekripsi}</Text>
                    <Link
                        href={{
                          pathname: "/jenismangrove/[id]",
                          params: { id: item.id.toString() }
                        }}
                      >
                        <View>
                          <Text style={styles.detailButton}>Lihat Detail</Text>
                        </View>
                      </Link>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 6,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
    padding: 10,
    elevation: 3,
    gap: 10,
    
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  detailButton: {
    color: 'white',
    fontWeight: '500',
    marginTop: 4,
    paddingHorizontal:5,
    paddingVertical:5,
    backgroundColor :"seagreen",
    borderRadius:5,
    textAlign:"center",
    fontSize:12,
  },
});
