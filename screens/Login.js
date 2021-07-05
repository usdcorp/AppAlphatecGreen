import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ToastAndroid,
} from "react-native";

import fondologin from "../assets/fondologin.png";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: WIDTH } = Dimensions.get("window");

const App = ({ navigation }) => {
  const [isSecuryEntry, setIsSecureEntry] = useState(true);
  const [Usuario, setUsuario] = useState("");
  const [Password, setPassword] = useState("");

  const signin = async () => {

    if (Usuario != "" && Password != "") {
      await fetch("http://119.8.144.182:1035/api/loginfirma/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Usuario: Usuario,
          Password: Password,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
            AsyncStorage.setItem('Usuario', resData.wsdUsuario.NombreCompleto);
          ToastAndroid.showWithGravity(
            "Bienvenido " + resData.wsdUsuario.NombreCompleto,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          navigation.navigate("HomeCustomer");
        })
        .catch((error) => {
          ToastAndroid.showWithGravity(
            "User Name/Password incorrect",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    } else {
      ToastAndroid.showWithGravity(
        "Campos vacios",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <ImageBackground source={fondologin} style={styles.simgbackground}>
      <View style={styles.scontainer}>
        <TextInput
          value={Usuario}
          onChangeText={(anything) => setUsuario(anything)}
          style={styles.sinput}
          placeholder={"user name"}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          underlineColorAndroid="transparent"
        />
      </View>
      <View>
        <TextInput
          value={Password}
          onChangeText={(anything) => setPassword(anything)}
          style={styles.sinput}
          secureTextEntry={isSecuryEntry}
          placeholder={"password"}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          onPress={() => {
            setIsSecureEntry((prev) => !prev);
          }}
          style={styles.sbtneye}
        >
          <Ionicons
            name={isSecuryEntry ? "ios-eye-outline" : "ios-eye-off-outline"}
            size={26}
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sbtnlogin} onPress={signin}>
        <Text style={styles.stext}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scontainer: {
    marginTop: 270,
  },
  simgbackground: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
  },

  stextinput: {
    fontSize: 100,
  },
  sinput: {
    marginBottom: 12,
    width: WIDTH - 100,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 255)",
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    marginHorizontal: 25,
  },
  sbtnlogin: {
    width: WIDTH - 220,
    height: 25,
    borderRadius: 4,
    backgroundColor: "#01a859",
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 50,
  },
  stext: {
    color: "rgba(255, 255, 255, 255)",
    fontSize: 16,
    textAlign: "center",
  },
  sbtneye: {
    position: "absolute",
    top: 8,
    right: 37,
  },
});

export default App;