import React from 'react';
import { TextInput, TouchableHighlight, View } from 'react-native';

export const Page = () => {
  return (

      <View className="h-full flex flex-col gap-10 p-10">
        <View className='h-60 bg-green-500'>

        </View>
        <View className='flex flex-row gap-10 h-20'>
          <TextInput className='bg-yellow-500 grow'/>
          <TouchableHighlight className='w-20 bg-red-500'>
            <View>
              
            </View>
          </TouchableHighlight>
        </View>
        

        <View className='grow bg-blue-500'>

        </View>
      </View>
    
  );
};

