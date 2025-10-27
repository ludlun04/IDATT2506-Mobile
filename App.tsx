import { Page } from 'components/Page';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function App() {
  return (
    <SafeAreaView className='bg-background'>
      <Page/>  
      <StatusBar style='light'/>
    </SafeAreaView>
  );
}
