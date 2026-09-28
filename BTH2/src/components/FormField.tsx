import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { formStyles } from '../styles/formStyles';
import { colors } from '../styles/theme';

export function FormField({
  label,
  style,
  ...inputProps
}: TextInputProps & { label: string }) {
  return (
    <View>
      <Text style={formStyles.fieldLabel}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor={colors.muted}
        style={[formStyles.input, style]}
      />
    </View>
  );
}
