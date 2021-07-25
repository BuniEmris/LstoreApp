import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const LoginInput = ({
  name,
  iconname,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  const data = useSelector(state => state.add);
  const styles = style(data.size);
  return (
    <View>
      <Text style={styles.inputText}>{name}</Text>
      <View style={styles.container}>
        <Icon name={iconname} size={28} />
        <View style={styles.input}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.inputc}
            secureTextEntry={secureTextEntry}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginInput;
const style = size =>
  StyleSheet.create({
    container: {
      width: 335 * size,
      height: 60 * size,
      borderRadius: 15 * size,
      paddingLeft: 20 * size,
      backgroundColor: 'white',
      marginBottom: 20 * size,
      alignItems: 'center',
      flexDirection: 'row',
    },
    input: {
      marginLeft: 10 * size,
      width: 244 * size,
      height: 50 * size,
    },
    inputText: {
      fontWeight: '600',
      fontSize: 14 * size,
      color: 'rgba(37, 52, 102, 0.5)',
      marginBottom: 8 * size,
    },
    inputc: {
      padding: 10 * size,
    },
  });
