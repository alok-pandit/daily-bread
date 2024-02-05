import { ImageBackground, Pressable, Text, TextInput, View } from 'react-native'

import { clmx, textGradient } from '../../utils'

const Login = () => {
  return (
    <ImageBackground
      source={require('./../../assets/bg11.jpeg')}
      resizeMode="cover"
      className="flex-1 items-center justify-center"
    >
      <View
        className={clmx(
          'h-screen w-[100%] bg-white/25 px-4',
          'border-1 flex items-center justify-center'
        )}
      >
        <View
          className={clmx(
            'h-2/5 w-full bg-white/25',
            'border-1 flex items-center justify-between',
            'p-3 rounded-xl shadow-lg border-white border-2'
          )}
        >
          <Text
            className={clmx(
              `text-4xl text-center backdrop-blur-sm backdrop-opacity-100 ${textGradient} bg-lime-400 w-full rounded-md px-3`
            )}
          >
            Login
          </Text>
          <TextInput
            placeholder="Username"
            className="bg-white px-4 border-1 border-slate-800 w-[85%] rounded-md"
          />
          <TextInput
            placeholder="Password"
            textContentType="password"
            className="bg-white px-4 border-1 border-slate-800 w-[85%] rounded-md"
          />
          <View className="flex flex-row items-center justify-between w-4/5">
            <Pressable
              className={clmx(
                `group bg-lime-500 active:bg-lime-500 focus-within:text-white rounded-lg p-4 active:scale-75`
              )}
            >
              <Text className={clmx(`text-xl text-center text-white`)}>
                Login
              </Text>
            </Pressable>
            <Text className="text-white text-xl">Or</Text>
            <Pressable
              className={clmx(
                `group bg-lime-500 active:bg-lime-500 focus-within:text-white rounded-lg p-4 active:scale-75`
              )}
            >
              <Text className={clmx(`text-xl text-center text-white`)}>
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Login
