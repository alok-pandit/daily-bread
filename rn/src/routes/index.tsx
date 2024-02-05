import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'

import LandingPage from './LandingScreen'
import Login from './Login'

const Stack = createNativeStackNavigator()
const Routes = () => {
  return (
    <SafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Landing" component={LandingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default Routes
