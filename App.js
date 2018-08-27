/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const tfImageRecognition = new TfImageRecognition({
  model: require('./assets/tensorflow_inception_graph.pb'),
  labels: require('./assets/tensorflow_labels.txt'),
  imageMean: 117, // Optional, defaults to 117
  imageStd: 1 // Optional, defaults to 1
})


type Props = {};
export default class App extends Component<Props> {
  state = {
    results: [],
  }
  handlePress = async () => {
    const results = await tfImageRecognition.recognize({
      image: require('./assets/burger.jpeg'),
      inputName: "input", //Optional, defaults to "input"
      inputSize: 224, //Optional, defaults to 224
      outputName: "output", //Optional, defaults to "output"
      maxResults: 3, //Optional, defaults to 3
      threshold: 0.1, //Optional, defaults to 0.1
    })
    
    this.setState({results});

    await tfImageRecognition.close() 
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/burger.jpeg')}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.handlePress()}>
          <Text style={styles.instructions}>TensorFlow POWER</Text>
        </TouchableOpacity>
        <Text style={styles.results}>{this.state.results.map(r => `#${r.name}`)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
    alignItems: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 25
  },
  results: {
    textAlign: 'center',
    color: '#EF6C00',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 25,
  },
  button: {
    height: 50,
    margin: 20,
    borderRadius: 25,
    backgroundColor: `#EF6C00`,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: '100%',

  }
});
