import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { TextInput } from '@react-native-material/core';
import ListIcon from 'assets/list.svg'
import { cssInterop } from "nativewind";
import colors from "../colors"

export const Page = () => {

  [ListIcon, TextInput].forEach(c => {
    cssInterop(c, {
      className: {
        target: "style",
      }
    });
  })
  

  return (

      

      <View className="h-full flex flex-col gap-10 p-10">
        <View className='h-60 bg-green-500'>

        </View>
        <Text className="text-primary">testing</Text>
        <View className='flex flex-row gap-10 h-20'>
          <TextInput
            cursorColor={colors.text}
            label="Add"
            className="grow"
            inputContainerStyle={{
              backgroundColor: colors.surface,
              height: "100%",
            }}
            inputStyle={{
              color: colors.text
            }}
            color={colors.text}
            />
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

