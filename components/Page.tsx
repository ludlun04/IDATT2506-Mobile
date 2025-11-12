import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableHighlight, View, Keyboard, TouchableOpacity } from 'react-native';
import { TextInput as PaperTextInput, List, Checkbox, TouchableRipple, Dialog } from 'react-native-paper';
import ListIcon from 'assets/list.svg'
import TrashIcon from 'assets/trash.svg'
import { cssInterop } from "nativewind";
import colors from "../colors"
import { TodoEntry, TodoList } from '../types';
import { TextInput } from './TextInput';
import { deleteTodoList, readTodoLists, writeTodoList } from 'utils/FileHandler';
import { DeleteDialog } from './DeleteDialog';
import { NestableDraggableFlatList, NestableScrollContainer, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

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

  const currentCheckedEntries = currentList?.entries.filter(e => e.state) ?? []
  const currentUncheckedEntries = currentList?.entries.filter(e => !e.state) ?? []

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

  const onEntryDragEnd = (data: TodoEntry[]) => {
    if (currentList) {
      const newCurrentList = { ...currentList }
      newCurrentList.entries = data
      setCurrentList(newCurrentList)
      writeTodoList(currentList)
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

  const handleDeleteDialog = (entry: TodoEntry) => {
    setEntryToBeDeleted(entry)
    setDeleteEntryDialogVisible(true)
  }

  const onPressList = (list: TodoList) => {
    reloadLists()
    setCurrentList(list)
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

  const renderItem = ({item, drag, isActive}: RenderItemParams<TodoEntry>) => {
    return (
      <ScaleDecorator>
        <View className='flex flex-row justify-between mx-6'>
          <TouchableRipple
            className='rounded-md flex-1'
            rippleColor={colors['primary-transparent']}
            borderless={true}
            onPress={() => onPressEntry(item)}
            onLongPress={drag}
          >
            <View className='h-20 flex flex-row justify-between items-center'>
              <Text className='text-text'>{item.title}</Text>
              <Checkbox
                color={colors.primary}
                status={item.state ? 'checked' : 'unchecked'}>
              </Checkbox>
            </View>
          </TouchableRipple>
          <TouchableHighlight
            className='justify-center items-center'
            onPress={() => {
              handleDeleteDialog(item)
            }}>
            <TrashIcon height={30} color={colors.destructive}/>
          </TouchableHighlight>
        </View>
      </ScaleDecorator>
    )
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
                onPress={() => onPressList(list)}
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
        

        <NestableScrollContainer>
          <View className='flex-1 bg-surface rounded-md'>
            <NestableDraggableFlatList
            data={currentUncheckedEntries}
            onDragEnd={({ data }) => onEntryDragEnd([...data, ...currentCheckedEntries])}
            keyExtractor={(entry) => String(entry.id)}
            renderItem={renderItem}
            />
          <NestableDraggableFlatList
            data={currentCheckedEntries}
            onDragEnd={({ data }) => onEntryDragEnd([...currentUncheckedEntries, ...data])}
            keyExtractor={(entry) => String(entry.id)}
            renderItem={renderItem}
            />
          </View>
        </NestableScrollContainer>
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

