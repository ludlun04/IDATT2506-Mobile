import { Page } from 'components/Page';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView className='bg-background'>
        <Page/>  
        <StatusBar style='light'/>
      </SafeAreaView>
    </PaperProvider>
    
  );
}
