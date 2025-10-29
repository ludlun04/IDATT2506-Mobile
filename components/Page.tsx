import React from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import ListIcon from 'assets/list.svg'
import { cssInterop } from "nativewind";
export const Page = () => {

  cssInterop(ListIcon, {
    className: {
      target: "style",
    }
  });

  return (

      

      <View className="h-full flex flex-col gap-10 p-10">
        <View className='h-60 bg-green-500'>

        </View>
        <View className='flex flex-row gap-10 h-20'>
          <Text className="text-primary">Bsrdsdfsdddfudh</Text>
          <TextInput className='bg-yellow-500 grow'/>
          <TouchableHighlight>
            <View className='w-20 h-20 bg-primary rounded-full items-center justify-center'>
              <ListIcon className='color-on-primary'/>
            </View>
          </TouchableHighlight>
        </View>
        

        <View className='grow bg-blue-500'>

        </View>
      </View>
    
  );
};

