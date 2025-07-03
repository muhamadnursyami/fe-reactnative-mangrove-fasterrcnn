import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HasilIdentifikasi() {
  const navigation = useNavigation();
  const { detections, imageUri } = useLocalSearchParams<{
    detections?: string;
    imageUri?: string;
  }>();

  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const parsedDetections: any[] = detections
    ? (() => {
        try {
          return JSON.parse(detections);
        } catch {
          return [];
        }
      })()
    : [];

  const filteredDetections = parsedDetections.filter((det) => det.score >= 0.6);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(
        imageUri,
        (width, height) => setImageSize({ width, height }),
        () => setImageSize({ width: 0, height: 0 })
      );
    }
  }, [imageUri]);

  const screenWidth = Dimensions.get('window').width;
  const scaleFactor = imageSize.width ? screenWidth / imageSize.width : 1;

  // Warna berbeda untuk tiap bounding box
  const colors = [
    { borderColor: 'red', backgroundColor: 'rgba(255, 0, 0, 0.2)', labelBg: 'rgba(255, 0, 0, 0.7)' },
    { borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.2)', labelBg: 'rgba(0, 0, 255, 0.7)' },
    { borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.2)', labelBg: 'rgba(0, 255, 0, 0.7)' },
    { borderColor: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.2)', labelBg: 'rgba(255, 165, 0, 0.7)' },
    { borderColor: 'purple', backgroundColor: 'rgba(128, 0, 128, 0.2)', labelBg: 'rgba(128, 0, 128, 0.7)' },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.backgroundImage}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Hasil Deteksi Mangrove</Text>

        {!imageUri || !imageSize.width ? (
          <Text style={styles.noDetectionText}>Gambar tidak tersedia</Text>
        ) : (
          <View
            style={{
              width: '100%',
              height: imageSize.height * scaleFactor,
              paddingHorizontal: 2,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                width: '100%',
                height: imageSize.height * scaleFactor,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
            {filteredDetections.map((det, i) => {
              const [x1, y1, x2, y2] = det.box;
              const color = colors[i % colors.length];
              const boxStyle = {
                position: 'absolute' as const,
                left: x1 * scaleFactor,
                top: y1 * scaleFactor,
                width: (x2 - x1) * scaleFactor,
                height: (y2 - y1) * scaleFactor,
                borderWidth: 2,
                borderColor: color.borderColor,
                borderRadius: 4,
                backgroundColor: color.backgroundColor,
              };
              return (
                <View key={i} style={boxStyle}>
                  <Text
                    style={[
                      styles.boxLabel,
                      { backgroundColor: color.labelBg },
                    ]}
                  >
                    {det.label} ({(det.score * 100).toFixed(1)}%)
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {filteredDetections.length === 0 && (
          <Text style={styles.noDetectionText}>Tidak ada deteksi ditemukan.</Text>
        )}

        {filteredDetections.length > 0 && (
          <View style={styles.card}>
            {filteredDetections.length > 1 && (
              <View>
                <Text style={[styles.label, { marginBottom: 12, color: 'crimson' }]}>
                  Mangrove yang anda ambil, terdeteksi memiliki kesamaan dengan jenis yang lain.
                </Text>
                <Text style={[styles.label, { marginBottom: 12, color: 'crimson' }]}>
                  Silakan identifikasi bagian lain seperti bunga untuk hasil yang lebih akurat.
                </Text>
              </View>
            )}

            {filteredDetections.map((det, i) => (
              <View key={i} style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Prediksi {i + 1}:</Text>
                <Text style={styles.label}>
                  Jenis Mangrove: <Text style={styles.value}>{det.label}</Text>
                </Text>
                <Text style={styles.label}>
                  Keyakinan: <Text style={styles.value}>{(det.score * 100).toFixed(2)}%</Text>
                </Text>
                <Text style={styles.label}>
                  Detail Prediksi: <Text style={styles.value}>{det.data_tanaman?.catatan ?? 'Tidak ditemukan'}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 6,
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'mediumseagreen',
    width: '100%',
  },
  noDetectionText: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 20,
    width: '100%',
  },
  label: {
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    color: '#111827',
  },
  value: {
    fontWeight: '400',
    color: '#374151',
  },
  boxLabel: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    paddingHorizontal: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: -18,
    left: 0,
    zIndex: 10,
  },
});
