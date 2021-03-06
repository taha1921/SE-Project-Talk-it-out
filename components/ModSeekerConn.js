import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
} from 'react-native';
import RF from "react-native-responsive-fontsize";
import * as firebase from "firebase";
import "firebase/firestore";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Fire from '../Fire.js';


export default class ModSeekerConn extends Component {

    static navigationOptions = {
        title: 'Seeker Requests',
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: false,
            ListOfReq: []

        }

    }
    SendId = Key => {
        firebase.firestore().collection("Helpers").get().then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {

                var ref = firebase.database().ref(doc.id + '/Requests/');
                ref.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {

                        var value = childSnapshot.val();
                        if (value.request.uid) {
                            if (value.request.uid == Key) {

                                var key1 = childSnapshot.key
                                ref.child(key1).remove()

                            }

                        }
                        else {
                            alert("lol")
                        }

                    });
                });

            });
        });
        firebase.firestore().collection("Moderator").get().then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {

                var ref = firebase.database().ref(doc.id + '/Requests/');
                ref.once('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {

                        var value = childSnapshot.val();
                        if (value.request.uid) {
                            if (value.request.uid == Key) {

                                var key1 = childSnapshot.key
                                ref.child(key1).remove()

                            }

                        }
                        else {
                            alert("lol")
                        }

                    });
                });

            });
        });
        var uid = Fire.shared.uid
        var ref = firebase.database().ref(Key + '/CurrentlyConnected/');
        const connect = {
            "uid": uid
        }

        ref.push(connect)
        ref = firebase.database().ref(uid + '/CurrentlyConnectedSeeker/');
        const second = {
            "uid": Key
        }
        ref.push(second)



        // this.props.navigation.state.params.onGoBack({ key: Key })
        this.props.navigation.goBack()
    }

    componentDidMount() {
        var uid = Fire.shared.uid
        var temp = this
        if (!uid) {
            setTimeout(function () { temp.SearchRequests(uid) }, 3000)
        } else {
            this.SearchRequests(uid)
        }
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    SearchRequests = uid => {
        uid = Fire.shared.uid
        var ref = firebase.database().ref(uid + '/Requests/');
        const temp = this
        ref.on('value', function (snapshot) {
            try {


                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    if (value.request.uid) {
                        var present = false
                        temp.state.ListOfReq.forEach(element => {
                            if (element.key == value.request.uid) {
                                present = true
                            }
                        })

                        if (!present) {
                            var timeref = firebase.database().ref("/Time/")
                            var time = {
                                "time": temp.timestamp
                            }
                            var timekey = timeref.push(time).getKey()
                            timeref = firebase.database().ref("/Time/" + timekey)
                            timeref.once('value').then(function (snapshot) {
                                var currentTime = (snapshot.val().time)
                                var joined = temp.state.ListOfReq.concat({ key: value.request.uid });
                                var timeDiff = (currentTime - value.request.time) / 1000
                                console.log(timeDiff / 60)
                                alert(timeDiff / 3600)
                                if ((timeDiff / 3600) > 0) {
                                    temp.setState({
                                        ListOfReq: joined,
                                    });
                                }

                                // ...
                            });
                            timeref.remove()

                        }


                    }
                    else {
                        // alert("lol")
                    }

                });
            } catch (error) {
                alert(error)
            }
        });
    }



    componentWillUnmount() {
        var uid = Fire.shared.uid

        var ref = firebase.database().ref(uid + '/Requests/');

        ref.off();
    }


    render() {
        return (
            <View style={styles.viewstyle}>

                <View style={{ flex: 1 }}>
                    {

                        this.state.ListOfReq.length > 0 ?
                            <FlatList data={this.state.ListOfReq}
                                contentContainerStyle={styles.container}

                                renderItem={({ item }) => (
                                    <View>
                                        <TouchableOpacity style={styles.button} onPress={() => this.SendId(item.key)}>
                                            <Text style={styles.buttontext}>New Request: Tap on this button to Accept</Text>
                                        </TouchableOpacity>
                                    </View>


                                )}
                            />

                            :
                            <View>
                                <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'white', fontFamily: 'Poppins-Medium', fontSize: RF(4) }}> NO Request </Text>
                            </View>


                    }


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
        borderRadius: 20,
        margin: 10,
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
        flexDirection: 'column',
        paddingTop: 10
    },

    info: {
        flex: 0.07,
        alignSelf: 'center',
    },

    inputlayout: {
        flex: 0,
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
    },
    button: {
        fontFamily: "Poppins",
        alignItems: "center",
        backgroundColor: "#244882",
        padding: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width,
        borderRadius: 20
    },
    container: {
        justifyContent: "space-evenly",
        flex: 0.8,
    }

});

AppRegistry.registerComponent("ModSeekerConn", () => ModSeekerConn)