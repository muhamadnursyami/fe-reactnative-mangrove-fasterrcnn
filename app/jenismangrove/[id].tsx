import { useFetchJenisMangroveDetail } from '@/service/useFetch';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function JenisMangroveDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    data: detailsMangrove,
    loading: detailsMangroveLoading,
    error: detailsMangroveError,
  } = useFetchJenisMangroveDetail(id as string);

  const imageUrlDaun = `http://195.200.15.181:5001${detailsMangrove?.imgSRCDaun}`;
  const imageUrlBunga = `http://195.200.15.181:5001${detailsMangrove?.imgSRCBunga}`;

  console.log(imageUrlDaun);
  console.log(imageUrlBunga);
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.backgroundImage}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {detailsMangroveLoading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.loader}
        />
      ) : detailsMangroveError ? (
        <Text style={styles.errorText}>Error: {detailsMangroveError.message}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>{detailsMangrove?.nama}</Text>
            <Image
            source={{ uri: imageUrlDaun }}
            style={styles.image}
            resizeMode="cover"
          />
            <Text style={styles.list}>
                Jenis Mangrove :
                <Text style={styles.text}> {detailsMangrove?.nama}</Text>
            </Text>
            <Text style={styles.list}>
                Deskripsi :
                <Text style={styles.text}> {detailsMangrove?.dekripsi}</Text>
            </Text>
            <Text style={styles.list}>
                Ekologi :
                <Text style={styles.text}> {detailsMangrove?.ekologi}</Text>
            </Text>
            <Text style={styles.list}>
                Manfaat :
                <Text style={styles.text}> {detailsMangrove?.manfaat}</Text>
            </Text>
            <Text style={styles.list}>
                Penyebaran :
                <Text style={styles.text}> {detailsMangrove?.penyebaran}</Text>
            </Text>
            
           <Text style={styles.list}>
            Gambar Bunga :
           </Text>
          <Image
            source={{ uri: imageUrlBunga }}
            style={styles.image}
            resizeMode="cover"
          />
          </View>
          
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
  loader: {
    marginTop: 80,
    alignSelf: 'center',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 80,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 80,
    
  },
  card: {
    backgroundColor:'rgba(255, 255, 255, 0.7)',
    paddingHorizontal:10,
    paddingVertical:15,
    borderRadius:10
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign:"center"
  },
  list :{
    marginVertical:5,
    color: '#333',
    fontWeight: "500",
    textAlign:"justify"
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: "400"
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginVertical: 15,
  },
});
