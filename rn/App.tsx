import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'

import Routes from './src/routes'
const App = () => {
  return (
    <SafeAreaView className="bg-lime-400 flex-1 items-center justify-center">
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
