import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'

export default class Select extends Component {
  state = {
    value: ''
  }
  render() {
    return (
      <View style={styles.input}>
        {this.props.icon && this.props.icon}
        <Picker
          selectedValue={this.state.value}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({value: itemValue})
          }
          style={styles.select}
          >
          {this.props.label && (<Picker.Item label={this.props.label} />)}
          {this.props.data && this.props.data.map((item, index) => {
            return (
              <Picker.Item key={index} label={item} value={item} />
            )
          })}
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EFF0F6',
    borderRadius: 16,
    paddingHorizontal: 26,
    paddingVertical: 11,
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  select: {
    flex: 1, 
    marginLeft: 18
  }
})
