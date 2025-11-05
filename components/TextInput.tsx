import { TextInput as PaperTextInput } from 'react-native-paper';
import colors from "../colors"
import { TextInputSubmitEditingEvent } from 'react-native';


interface TextInputProps {
value: string
setValue: React.Dispatch<React.SetStateAction<string>>
onSubmitEditing: ((e: TextInputSubmitEditingEvent) => void)
}

export const TextInput = ({value, setValue, onSubmitEditing}: TextInputProps) => {
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
};