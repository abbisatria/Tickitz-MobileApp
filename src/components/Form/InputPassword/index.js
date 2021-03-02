import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputPassword extends Component {
  state = {
    isPasswordShown: false,
  };
  togglePasswordVisiblity = () => {
    const {isPasswordShown} = this.state;
    this.setState({isPasswordShown: !isPasswordShown});
  };
  render() {
    const {isPasswordShown} = this.state;
    const {paddingVertical = 20} = this.props;
    return (
      <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.input(paddingVertical)}>
          <TextInput
            style={styles.textInput}
            placeholder={this.props.placeholder}
            secureTextEntry={isPasswordShown ? false : true}
            onChangeText={this.props.onChange}
            defaultValue={this.props.value}
            onBlur={this.props.onBlur}
          />
          <TouchableOpacity onPress={this.togglePasswordVisiblity}>
            <Icon
              name={isPasswordShown ? 'eye-slash' : 'eye'}
              size={20}
              color="#A0A3BD"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 12,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
  },
  input: (paddingVertical) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: paddingVertical,
  }),
});

export default InputPassword;
