import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native'

import { ListUsers } from '../../apis/list-users'
import { login } from '../../apis/login'
import { Refresh } from '../../apis/refresh'
import { clmx, textGradient } from '../../utils'

const Login = () => {
  return (
    <ImageBackground
      source={require('./../../assets/bg11.jpeg')}
      resizeMode="cover"
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 items-center justify-center blur-lg backdrop-blur-md bg-white/30 w-full">
        <View
          className={clmx(
            'h-screen w-full px-4',
            'border-1 flex items-center justify-center'
          )}
        >
          <View
            className={clmx(
              'h-[20%] w-[40%] ',
              'border-1 flex items-center justify-between',
              'p-2 rounded-xl shadow-lg border-white border-2 mb-1'
            )}
          >
            <Image
              source={require('./../../assets/logo.png')}
              resizeMode="contain"
              className="h-full w-full"
            />
          </View>
          <View
            className={clmx(
              'h-2/5 w-full bg-white/50',
              'border-1 flex items-center justify-between',
              'p-3 rounded-xl shadow-lg border-white border-2'
            )}
          >
            <Text
              className={clmx(
                `text-2xl text-center backdrop-blur-sm backdrop-opacity-100 ${textGradient} bg-lime-500 w-full rounded-md px-3`
              )}
            >
              Daily Bread
            </Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor={'black'}
              className="bg-white text-black px-4 border-1 border-slate-800 w-[85%] rounded-md"
            />
            <TextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor={'black'}
              className="bg-white text-black px-4 border-1 border-slate-800 w-[85%] rounded-md"
            />
            <View className="flex flex-row items-center justify-between w-4/5">
              <Pressable
                onPress={async () => {
                  const lg = await login({
                    username: 'alok',
                    password: 'alok'
                  })
                  Alert.alert('Success', JSON.stringify(lg))
                }}
                className={clmx(
                  `group bg-lime-500 active:bg-lime-500 focus-within:text-white rounded-lg p-4 active:scale-75`
                )}
              >
                <Text className={clmx(`text-lg text-center text-white`)}>
                  Login
                </Text>
              </Pressable>
              <Text className="text-black text-xl">Or</Text>
              <Pressable
                className={clmx(
                  `group bg-lime-500 active:bg-lime-500 focus-within:text-white rounded-lg p-4 active:scale-75`
                )}
                onPress={async () => {
                  const lg = await Refresh()
                  Alert.alert('Success', JSON.stringify(lg))
                }}
              >
                <Text className={clmx(`text-lg text-center text-white`)}>
                  Sign Up
                </Text>
              </Pressable>

              <Pressable
                className={clmx(
                  `group bg-lime-500 active:bg-lime-500 focus-within:text-white rounded-lg p-4 active:scale-75`
                )}
                onPress={async () => {
                  const lg = await ListUsers()
                  Alert.alert('Success', JSON.stringify(lg))
                }}
              >
                <Text className={clmx(`text-lg text-center text-white`)}>
                  Get Users
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Login
