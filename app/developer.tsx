import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Developer() {
  const navigation = useNavigation();
  return (
    <View>        

      <ImageBackground source={ require("../assets/images/background.png")}  style={{ height:'100%', width:'100%'  }}>
      <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={28} color={"white"}></Ionicons>
          </TouchableOpacity>
          <View style={styles.authorSection}>
            <Text style={styles.title}>Created by Mangrove ID 2025 </Text>
            <Text style={styles.title}>Developer  All Rights Reserved</Text>
            <Text style={styles.title}>Developer :</Text>
            <View style={styles.containerImage}>
              <Image style={styles.fotodeveloper} source={require("../assets/images/developer_mangrove_id.jpg")}></Image>
            </View>
            <Text style={styles.title}>Muhamad Nur Syami</Text>
          </View>
      </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center"
  },
  container :{
    flex: 1,
    justifyContent:'center',
    alignItems: "center",
  
  },
  authorSection :{
    opacity:0.8,
    width: "70%",
    height:"50%",
    backgroundColor:"mediumseagreen",
    padding: 20,
    color:"white",
    borderRadius:20,
    // Shadow For IOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow For Android
    elevation: 5,
  },
  title:{
    fontWeight:"bold",
    color:"white",
    fontSize:16,
    textAlign:"center",
    margin:7,
  },
  fotodeveloper :{
    width : 120,
    height:120,
    borderRadius:60,
  },
  containerImage :{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  backButton:{
    position:"absolute",
    top:40,
    left:20,
    zIndex:10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 6,
  }
})