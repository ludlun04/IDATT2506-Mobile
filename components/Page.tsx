import React, { useState } from 'react';
import { ScrollView, Text, TouchableHighlight, View, Keyboard } from 'react-native';
import { TextInput as PaperTextInput, List, Checkbox, TouchableRipple, Dialog } from 'react-native-paper';
import ListIcon from 'assets/list.svg'
import { cssInterop } from "nativewind";
import colors from "../colors"
import { TodoEntry, TodoList } from '../types';
import { TextInput } from './TextInput';
import { deleteTodoList, readTodoLists, writeTodoList } from 'utils/FileHandler';
import { DeleteDialog } from './DeleteDialog';

  [ListIcon, PaperTextInput].forEach(c => {
    cssInterop(c, {
      className: {
        target: "style",
      }
    });
  })

  let lists: TodoList[] = readTodoLists() ?? []

export const Page = () => {

  const [currentList, setCurrentList] = useState<TodoList | undefined>();

  const [addListEntryText, setAddListEntryText] = useState<string>("")
  const [addListText, setAddListText] = useState<string>("")
  
  const [newListDialogVisible, setNewListDialogVisible] = useState<boolean>(false)

  const [deleteListDialogVisible, setDeleteListDialogVisible] = useState<boolean>(false)
  const [listToBeDeleted, setListToBeDeleted] = useState<TodoList | undefined>()

  const [deleteEntryDialogVisible, setDeleteEntryDialogVisible] = useState<boolean>(false)
  const [entryToBeDeleted, setEntryToBeDeleted] = useState<TodoEntry | undefined>()

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
    setNewListDialogVisible(false)
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

  const onLongPressEntry = (entry: TodoEntry) => {
    setEntryToBeDeleted(entry)
    setDeleteEntryDialogVisible(true)
  }

  const onLongPressList = (list: TodoList) => {
    setListToBeDeleted(list)
    setDeleteListDialogVisible(true)
  } 

  const onDeleteList = () => {
    if (listToBeDeleted) {
      deleteTodoList(listToBeDeleted)
      reloadLists()
    }
  }

  const onDeleteEntry = () => {
    if (entryToBeDeleted && currentList) {
      currentList.entries = currentList.entries.filter(e => e.id !== entryToBeDeleted.id)
      writeTodoList(currentList)
      reloadLists()
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
                onLongPress={() => onLongPressList(list)}
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
              setNewListDialogVisible(true)
            }}>
            <View className='w-20 h-20 bg-primary rounded-full items-center justify-center'>
              <ListIcon className='color-on-primary'/>
            </View>
          </TouchableHighlight>
        </View>
        

        <View className='flex-1 bg-surface rounded-md'>
          <ScrollView>
            {currentList?.entries
              .sort((a, b) => Number(a.state) - Number(b.state))
              .map((entry, index) => (
              <TouchableRipple
                className='rounded-md'
                key={index}
                rippleColor={colors['primary-transparent']}
                borderless={true}
                onPress={() => onPressEntry(entry)}
                onLongPress={() => onLongPressEntry(entry)}
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
        visible={newListDialogVisible}
        onDismiss={() => setNewListDialogVisible(false)}
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
      { listToBeDeleted &&
        <DeleteDialog
          item={listToBeDeleted.title}
          onDelete={onDeleteList}
          setVisible={setDeleteListDialogVisible}
          visible={deleteListDialogVisible}
          />
      }
      { entryToBeDeleted &&
        <DeleteDialog
          item={entryToBeDeleted.title}
          onDelete={onDeleteEntry}
          setVisible={setDeleteEntryDialogVisible}
          visible={deleteEntryDialogVisible}
          />
      }
    </>
    
  );
};

