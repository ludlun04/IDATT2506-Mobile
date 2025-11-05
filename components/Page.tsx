import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, TextInputSubmitEditingEvent, Text, TouchableHighlight, View, Keyboard } from 'react-native';
import { TextInput as PaperTextInput, List, Checkbox, TouchableRipple, Dialog, Button } from 'react-native-paper';
import { Directory, File, Paths,  } from 'expo-file-system';
import ListIcon from 'assets/list.svg'
import { cssInterop } from "nativewind";
import colors from "../colors"

  [ListIcon, PaperTextInput].forEach(c => {
    cssInterop(c, {
      className: {
        target: "style",
      }
    });
  })

  interface TextInputProps {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    onSubmitEditing: ((e: TextInputSubmitEditingEvent) => void)
  }
  const TextInput = React.memo(({value, setValue, onSubmitEditing}: TextInputProps) => {
    return <PaperTextInput
            label={"Add new item"}
            className='grow'
            underlineColor={colors.text}
            activeUnderlineColor={colors.text}
            textColor={colors.text}
            contentStyle={{backgroundColor: colors.surface, borderTopLeftRadius: 6,  borderTopRightRadius: 6}}
            theme={{roundness: 20}}
            value={value}
            onChangeText={setValue}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={false}
            />
  });

  interface TodoEntry {
    id: number
    title: string
    state: boolean
  }

  interface TodoList {
    id: number
    title: string
    entries: TodoEntry[]
  }


  const listsDir = new Directory(Paths.cache, "lists")
  if (!listsDir.exists) listsDir.create()

  const readTodoLists = () => {
    const newLists: TodoList[] = []
    try {
      const listPaths = listsDir.list()
      for (const path of listPaths) {
        newLists.push(JSON.parse(new File(path).textSync()))
      }
      return newLists
    } catch(error) {
      console.error("Error reading list", error)
    }
  }

  const writeTodoList = (list :TodoList) => {
    try {
      const file = new File(listsDir, list.id + ".json")
      if (!file.exists) {
        file.create()
      }
      file.write(JSON.stringify(list))
    } catch (error) {
      console.error("Error writing list", error)
    }
  }
  let lists: TodoList[] = readTodoLists() ?? []

export const Page = () => {

  const [currentList, setCurrentList] = useState<TodoList | undefined>(undefined);
  const [addListEntryText, setAddListEntryText] = useState<string>("")
  const [addListText, setAddListText] = useState<string>("")
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

  const reloadLists = () => {
    lists = readTodoLists() ?? []
    setCurrentList(lists.find(l => l.id === currentList?.id))
  }

  const onSubmitEntryTextFieldEditing = () => {
    if (currentList) {
      const entries = currentList.entries
      const nextId = entries.length > 0 ? (Math.max(...entries.map(e => e.id)) + 1) : 0
      currentList.entries.push({
        id: nextId,
        state: false,
        title: addListEntryText
      })
      setAddListEntryText("")
      writeTodoList(currentList)
      reloadLists()
    }
  }

  const onSubmitNewListTextFieldEditing = () => {
    const nextId = lists.length > 0 ? (Math.max(...lists.map(l => l.id)) + 1) : 0
    const newList = {
      title: addListText,
      id: nextId,
      entries: []
    }
    setDialogVisible(false)
    setAddListText("")
    writeTodoList(newList)
    reloadLists()
  }

  const onPressEntry = (entry: TodoEntry) => {
    if (currentList) {
      const updatedCurrentList = { ...currentList }
      const updatedEntry = updatedCurrentList.entries
        .find(e => e.id === entry.id)
      if (updatedEntry) {
        updatedEntry.state = !entry.state
        writeTodoList(updatedCurrentList)
        reloadLists()
      }
    }
  }

  return (

    <>
      <View className="h-full flex flex-col gap-10 p-10 overflow-">
        <View className='h-60 bg-surface rounded-md'>
          <ScrollView>
            {lists
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((list, index) => (
              <List.Item
              className={`rounded-md ${list.id === currentList?.id ? 'bg-on-primary-transparent' : ''}`}
                title={<Text className='text-text rounded-full h-20'>{list.title}</Text>}
                key={index}
                onPress={() => setCurrentList(list)}
                borderless={true}
                rippleColor={colors['primary-transparent']}
              />
            ))}
          </ScrollView>
        </View>
        <View className='flex flex-row gap-10 h-20 rounded-md'>
          <TextInput
            value={addListEntryText}
            setValue={setAddListEntryText} 
            onSubmitEditing={onSubmitEntryTextFieldEditing}
            />
          <TouchableHighlight
            onPress={() => {
              Keyboard.dismiss()
              setDialogVisible(true)
            }}>
            <View className='w-20 h-20 bg-primary rounded-full items-center justify-center'>
              <ListIcon className='color-on-primary'/>
            </View>
          </TouchableHighlight>
        </View>
        

        <View className='flex-1 bg-surface rounded-md'>
          <ScrollView>
            {currentList?.entries
              .sort((a, b) => a.title.localeCompare(b.title))
              .sort((a, b) => Number(a.state) - Number(b.state))
              .map((entry, index) => (
              <TouchableRipple
                className='rounded-md'
                key={index}
                rippleColor={colors['primary-transparent']}
                borderless={true}
                onPress={() => onPressEntry(entry)}
                onLongPress={() => alert("Long press!")}
                >
                <View className='flex flex-row justify-between items-center mr-10'>
                  <List.Item
              className='rounded-md'
                title={<Text className='text-text rounded-full h-20'>{entry.title}</Text>}
                
              />
              <Checkbox
                color={colors.primary}
                status={entry.state ? 'checked' : 'unchecked'}
                />
                </View>
              </TouchableRipple>
            ))}
          </ScrollView>
        </View>
      </View>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        style={{
          backgroundColor: colors.background,
        }}
        >
        <Dialog.Title>
          <Text className='text-text'>Add new list</Text>
        </Dialog.Title>
        <Dialog.Content className='text-text'>
          <TextInput
            value={addListText}
            setValue={setAddListText}
            onSubmitEditing={onSubmitNewListTextFieldEditing}/>
        </Dialog.Content>
      </Dialog>
    </>
    
  );
};

