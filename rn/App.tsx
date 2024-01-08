import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native'

const App = () => {
  return (
    <SafeAreaView className="bg-lime-400 flex-1 items-center justify-center">
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Yo</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
