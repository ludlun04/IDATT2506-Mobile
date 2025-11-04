import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, TextInputSubmitEditingEvent, Text, TouchableHighlight, View, Keyboard } from 'react-native';
import { TextInput as PaperTextInput, List, Checkbox, TouchableRipple, Dialog, Button } from 'react-native-paper';
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

  let lists = [
  {
    id: 1,
    title: "Rema 1000 – Ukeshandel",
    entries: [
      { id: 1, title: "Melk 1L lett", state: false },
      { id: 2, title: "Brød – grovt", state: true },
      { id: 3, title: "Egg 12 stk", state: false },
      { id: 4, title: "Smør – Bremykt", state: false },
      { id: 5, title: "Kjøttdeig 400g", state: true },
      { id: 6, title: "Epler 6 stk", state: false },
      { id: 7, title: "Salatmix", state: false },
      { id: 8, title: "Tomatsaus", state: true },
      { id: 9, title: "Knekkebrød – Wasa", state: false },
      { id: 10, title: "Yoghurt naturell", state: false },
      { id: 11, title: "Yoghurt unaturell", state: false },
      { id: 12, title: "Yoghurt tjanaturell", state: false }
    ]
  },
  {
    id: 2,
    title: "Kiwi – Middag og grønt",
    entries: [
      { id: 1, title: "Kyllingfilet 1kg", state: true },
      { id: 2, title: "Brokkoli", state: false },
      { id: 3, title: "Paprika", state: false },
      { id: 4, title: "Hvitløk", state: false },
      { id: 5, title: "Løk", state: true },
      { id: 6, title: "Avokado", state: false },
      { id: 7, title: "Sitron", state: false },
      { id: 8, title: "Tomater", state: true },
      { id: 9, title: "Fullkornspasta", state: false },
      { id: 10, title: "Soya saus", state: true }
    ]
  },
  {
    id: 3,
    title: "Apotek 1 – Helse og hygiene",
    entries: [
      { id: 1, title: "Paracet 500mg", state: false },
      { id: 2, title: "Ibux 200mg", state: true },
      { id: 3, title: "Plaster", state: false },
      { id: 4, title: "Nesespray", state: true },
      { id: 5, title: "Vitamin D", state: false },
      { id: 6, title: "Allergitabletter", state: false },
      { id: 7, title: "Tannkrem", state: true },
      { id: 8, title: "Tanntråd", state: false },
      { id: 9, title: "Solkrem SPF 30", state: false },
      { id: 10, title: "Hånddesinfeksjon", state: true }
    ]
  },
  {
    id: 4,
    title: "Meny – Helgekos",
    entries: [
      { id: 1, title: "Entrecôte 400g", state: false },
      { id: 2, title: "Bearnaisesaus", state: false },
      { id: 3, title: "Potetbåter", state: false },
      { id: 4, title: "Hvitløksbrød", state: true },
      { id: 5, title: "Rødvin", state: false },
      { id: 6, title: "Sjokoladefondant", state: false },
      { id: 7, title: "Vaniljeis", state: true },
      { id: 8, title: "Bringebær", state: false },
      { id: 9, title: "Snacks – Sørlandschips", state: false },
      { id: 10, title: "Karamellsaus", state: false }
    ]
  },
  {
    id: 5,
    title: "Europris – Husholdning og rengjøring",
    entries: [
      { id: 1, title: "Vaskepulver", state: true },
      { id: 2, title: "Skurekrem", state: false },
      { id: 3, title: "Oppvasktabletter", state: false },
      { id: 4, title: "Søppelposer 30L", state: false },
      { id: 5, title: "Telys 100 stk", state: true },
      { id: 6, title: "Batterier AA", state: false },
      { id: 7, title: "Mikrofiberkluter", state: true },
      { id: 8, title: "Glassrens", state: false },
      { id: 9, title: "Luftfrisker", state: false },
      { id: 10, title: "Håndsåpe", state: true }
    ]
  },
  {
    id: 6,
    title: "Clas Ohlson – Verktøy og småelektrisk",
    entries: [
      { id: 1, title: "Forlengerledning 5m", state: true },
      { id: 2, title: "USB-lader 20W", state: false },
      { id: 3, title: "Batterier AAA", state: true },
      { id: 4, title: "Lommelykt LED", state: false },
      { id: 5, title: "Skrutrekker-sett", state: true },
      { id: 6, title: "Hammer", state: false },
      { id: 7, title: "Målebånd", state: false },
      { id: 8, title: "Vernebriller", state: false },
      { id: 9, title: "Multimeter", state: true },
      { id: 10, title: "Verktøykasse", state: false }
    ]
  },
  {
    id: 7,
    title: "Obs! – Storhandel",
    entries: [
      { id: 1, title: "Kjøttdeig 2kg", state: true },
      { id: 2, title: "Mel", state: false },
      { id: 3, title: "Sukker", state: false },
      { id: 4, title: "Egg 24 stk", state: false },
      { id: 5, title: "Smør 1kg", state: false },
      { id: 6, title: "Potetgull", state: true },
      { id: 7, title: "Frosne bær", state: false },
      { id: 8, title: "Grønnsaksblanding", state: false },
      { id: 9, title: "Skinke", state: false },
      { id: 10, title: "Ferskpresset juice", state: true }
    ]
  },
  {
    id: 8,
    title: "Bunnpris – Nærhandel",
    entries: [
      { id: 1, title: "Pølsebrød", state: false },
      { id: 2, title: "Grillpølser", state: true },
      { id: 3, title: "Ketchup", state: false },
      { id: 4, title: "Sennep", state: false },
      { id: 5, title: "Lomper", state: false },
      { id: 6, title: "Isbiter", state: false },
      { id: 7, title: "Sjokolade", state: true },
      { id: 8, title: "Brus 0,5L", state: false },
      { id: 9, title: "Chips", state: false },
      { id: 10, title: "Rømme", state: true }
    ]
  }
  ];

export const Page = () => {

  const [currentList, setCurrentList] = useState<TodoList | undefined>(undefined);
  const [addListEntryText, setAddListEntryText] = useState<string>("")
  const [addListText, setAddListText] = useState<string>("")
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

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
            onSubmitEditing={() => {
              if (currentList) {
                const entries = currentList.entries
                const nextId = Math.max(...entries.map(e => e.id)) + 1
                currentList.entries.push({
                  id: nextId,
                  state: false,
                  title: addListEntryText
                })
                lists = lists.filter(l => l.id !== currentList.id)
                lists.push(currentList)
                setCurrentList(currentList)
                setAddListEntryText("")
              }
            }}
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
                onPress={() => {
                  const newCurrentList = { ...currentList }
                  const newEntry = newCurrentList.entries
                    .find(e => e.id === entry.id)
                  if (newEntry) newEntry.state = !entry.state
                  setCurrentList(newCurrentList)
                }}
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
            onSubmitEditing={() => {
              const nextId = Math.max(...lists.map(l => l.id)) + 1
              lists.push({
                title: addListText,
                id: nextId,
                entries: []
              })
              setDialogVisible(false)
              setAddListText("")
            }}/>
        </Dialog.Content>
      </Dialog>
    </>
    
  );
};

