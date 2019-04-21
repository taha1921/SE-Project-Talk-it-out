import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import RF from "react-native-responsive-fontsize";

export default class LoginHelper extends Component {
  
  static navigationOptions = {
    title: 'Helper Login',
  }

    render() {
        return (
          <View style={styles.viewstyle}>
            <View style={styles.HeaderStyle}>
                <View style={styles.logostyle}>
                    <Text style={styles.textstyle}>Talk It Out</Text>
                </View>
                <View style={styles.Headermessage}>
                    <Text style={styles.HMStyle}>Helper</Text>
                </View>
            </View>
            
            <View style={styles.Title}>
       
                <View style={styles.info}>
                    <Text style={styles.message}>Email Address</Text>
                </View>
 
                <View style={styles.inputlayout}>
                    <TextInput 
                    style={styles.input}
                    placeholder="LUMS Email"
                    returnKeyType="done"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='rgba(255,255,255,0.5)'/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.message}>Password</Text>
                </View>
                <View style={styles.inputlayout}>
                    <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    returnKeyType="go"
                    keyboardType="default"
                    // password={true}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='rgba(255,255,255,0.5)'/>
                </View>
                <View style={styles.submitbutton}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('')}
                    >
                        <Text 
                        style={styles.buttontext}
                        activeOpacity={0.5}>Login</Text>
                    </TouchableOpacity>
                </View>

              {/* </View> */}
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    fontFamily: "Poppins",
    alignItems: "center",
    backgroundColor: "#244882",
    padding: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width / 2.5,
    borderRadius: 20
  },

  buttontext: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "white"
  },

  textstyle: {
    fontFamily: "Poppins",
    fontSize: 15,
    color: "#536787"
  },

  logostyle: {
    flex: 0.3,
    justifyContent: "flex-start",
    // backgroundColor: 'purple'
  },

  Headermessage: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center"
  },

  HMStyle: {
    fontFamily: "Poppins",
    fontSize: RF(4.5),
    color: "#158ec1"
  },

  HeaderStyle: {
    flex: 0.1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  viewstyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#1a2942"
  },

  message: {
    alignSelf: "center",
    fontFamily: "Poppins",
    fontSize: 17,
    color: "#158ec1"
  },

  Title: {
    flex: 0.7,
    // backgroundColor: "green",
    flexDirection: 'column',
    paddingTop: 10
    // justifyContent: 'center'
  },

  EmailPosition: {
    flex: 0.13,
    // backgroundColor: "brown",
    justifyContent: 'center'
  },

  TitleStyle: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: "#158ec1",
    alignSelf: 'center'
  },

  info: {
    flex: 0.07,
    alignSelf: 'center',
    // marginLeft: 15,
    // alignContent: 'center'
    // backgroundColor: 'red'
  },

  inputlayout: {
    flex: 0,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 20
  },

  submitbutton: {
      flex: 0.1,
      // backgroundColor: 'pink',
    //   justifyContent: 'center'
  }

});

AppRegistry.registerComponent("HelperEmail", () => HelperEmail)