import { Page } from 'components/Page';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <PaperProvider>
      <GestureHandlerRootView>
        <SafeAreaView className='bg-background'>
          <Page/>  
        <StatusBar style='light'/>
      </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
    
  );
}
