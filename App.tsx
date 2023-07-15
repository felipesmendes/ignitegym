import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { SignUp } from '@screens/Signup';
import { Routes } from '@routes/index';
import { AuthContext } from '@contexts/AuthContext';
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AuthContext.Provider value={{
        user: {
          id: '1',
          name: 'Felipe',
          email: 'contato@felipems.com.br',
          avatar: 'felipe.png'
        }
      }}>
        {fontsLoaded ? <Routes /> : <View />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

