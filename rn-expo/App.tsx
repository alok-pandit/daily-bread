import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {addChangeListener, addSubListener, hello, setValueAsync, subAsync} from "./modules/go-calc";
import { useEffect } from 'react';

// @ts-ignore
export default function App() {

  console.log(hello());

  useEffect(() => {
    (async() => {
      addChangeListener((c) => {
        console.log("change", c)
      })

      addSubListener(c => {
        console.log("sub", c)
      })

     setValueAsync("4")

     subAsync(5,2)
     
    })()

  },[])

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
