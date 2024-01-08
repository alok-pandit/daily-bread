import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <SafeAreaView className='bg-lime-400 flex-1 items-center justify-center'>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
          <Text>Yo</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
