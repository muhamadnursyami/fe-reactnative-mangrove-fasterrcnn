import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    
    <View>

    
    <ImageBackground source={ require("../assets/images/background.png")}  style={{ height:'100%', width:'100%'  }}>
          
          
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../assets/images/logouniversitas.png")} resizeMode="contain"></Image>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                      Mangrove ID  
                      
              </Text>
              
            </View>

            <View style={styles.containerMenu}>
              <Link href={"/ambilfoto"} style={styles.button}>Ambil Foto</Link>
              <Link href={"/unggahgambar"} style={styles.button}>Unggah gambar</Link>
              <Link href={"/jenismangrove"} style={styles.button}>Jenis Mangrove</Link>
              <Link href={"/developer"}style={styles.button} >Developer</Link>
            </View>
          </View>
          

    </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({ 
  container:{
    flex: 1, 
    
  },
  logoContainer :{
    position:"absolute",
    top:20,
    right:20,
    zIndex:10


  },
  logo :{
    width:50,
    height:50
  }
  ,
  containerTitle:{
    paddingTop:"50%",
    paddingBottom:50,
    alignItems: "center",
    justifyContent: "center",
    
  },
  containerMenu:{
    justifyContent: "center",
    alignItems: "center",
    
  },
  
  title:{
    fontWeight:"bold",
    fontSize: 24,
    opacity:0.8,
    width: "80%",
    textAlign:"center",
    backgroundColor:"mediumseagreen",
    paddingVertical:20,
    paddingHorizontal:10,
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
  button :{
    fontSize:16,
    fontWeight:"500",
    opacity:0.9,
    width: "50%",
    textAlign:"center",
    backgroundColor:"mediumseagreen",
    padding: 20,
    marginVertical:10,
    color:"white",
    borderRadius:20,
    // Shadow For IOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Shadow For Android
    elevation: 5,
    
  }
})