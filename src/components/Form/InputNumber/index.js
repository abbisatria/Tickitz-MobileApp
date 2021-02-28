import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const InputNumber = ({
  label,
  placeholder,
  value,
  onChange,
  paddingHorizontal = 22,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row(paddingHorizontal)}>
        <Text style={styles.phone}>+62</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          defaultValue={value}
          onChangeText={onChange}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

export default InputNumber;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
  },
  phone: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderColor: '#DEDEDE',
  },
  row: (paddingHorizontal) => ({
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: paddingHorizontal,
  }),
});
