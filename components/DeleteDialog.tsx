import { Text } from "react-native"
import { Button, Dialog } from "react-native-paper"
import colors from "colors"

interface DeleteDialogProps {
  item: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (() => void)
}

export const DeleteDialog = ({item, visible, setVisible, onDelete}: DeleteDialogProps) => {

  const onPressDelete = () => {
    onDelete()
    setVisible(false)
  }

  return <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={{
            backgroundColor: colors.background,
          }}
          >
          <Dialog.Title>
            <Text className='text-text'>{`Delete ${item}?`}</Text>
          </Dialog.Title>
          <Dialog.Content className='flex flex-row gap-5 ml-auto mt-10'>
            <Button
              onPress={() => setVisible(false)}
              mode="outlined"

              textColor={colors.text}
              >
              <Text>Cancel</Text>
            </Button>
            <Button
              onPress={onPressDelete}
              mode="contained"
              style={{backgroundColor: colors.destructive}}
              textColor={colors["on-destructive"]}
              >
              <Text>Delete</Text>
            </Button>
          </Dialog.Content>
        </Dialog>
}