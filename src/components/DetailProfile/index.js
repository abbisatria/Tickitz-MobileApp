import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { connect } from 'react-redux'
import { updateProfile } from '../../redux/actions/auth'
import { REACT_APP_API_URL as API_URL } from '@env'
import { launchImageLibrary } from 'react-native-image-picker'
import { showMessage } from '../../helpers/showMessage'

import InputText from '../Form/InputText'
import InputPassword from '../Form/InputPassword'
import InputNumber from '../Form/InputNumber'
import Button from '../Button'
import FooterHome from '../FooterHome'

import Stars from '../../assets/icons/ic-stars.svg'
import PhotoProfile from '../../assets/images/profile.jpg'

class DetailProfile extends Component {
  state = {
    loading: false,
    email: '',
    fullname: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  }
  addPhoto = () => {
    launchImageLibrary({
      quality: 0.5,
      maxWidth: 300,
      maxHeight: 300
    }, async (response) => {
      console.log('Response = ', response)
      this.setState({ loading: true })
      if (response.didCancel) {
        this.setState({ loading: false })
        showMessage('User cancelled image picker')
      } else if (response.errorMessage) {
        this.setState({ loading: false })
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        this.setState({ loading: false })
        const dataImage = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }
        await this.props.updateProfile(this.props.auth.token, this.props.auth.user.id, { file: dataImage })
        showMessage(this.props.auth.message, 'success')
      }
    })
  }
  updatePersonalInfo = async () => {
    const { token, user } = this.props.auth
    const { password, confirmPassword, fullname, email, phoneNumber } = this.state
    if (password !== confirmPassword) {
      showMessage('New password and password confirmation do not match')
    } else {
      const splitFullname = fullname.split(' ')
      if (splitFullname.length > 1) {
        await this.props.updateProfile(token, user.id, { 
          firstname: splitFullname[0],
          lastname: splitFullname.splice(1, splitFullname.length).join(' '),
          email: email,
          password: password,
          phoneNumber: phoneNumber
        })
        showMessage(this.props.auth.message, 'success')
      } else {
        console.log('test')
        await this.props.updateProfile(token, user.id, { 
          firstname: splitFullname[0],
          lastname: ' ',
          email: email,
          password: password,
          phoneNumber: phoneNumber
        })
        showMessage(this.props.auth.message, 'success')
      }
    }
  }
  render() {
    return (
      <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.textInfo}>INFO</Text>
              <Text style={styles.info}>...</Text>
            </View>
            <View style={styles.rowImage}>
              <TouchableOpacity onPress={this.addPhoto}>
                {this.props.auth.user.image ? <Image source={{uri: `${API_URL}uploads/users/${this.props.auth.user.image}`}} style={styles.image} /> : <Image source={PhotoProfile} style={styles.image} />}
              </TouchableOpacity>
              {this.state.loading ? <ActivityIndicator size="large" color="#000000" /> : (this.props.auth.errorMsg !== '' ? <Text>{this.props.auth.errorMsg}</Text> : null) }
              <Text style={styles.name}>{this.props.firstname ? `${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`: 'No Name'}</Text>
              <Text style={styles.moviegoers}>Moviegoers</Text>
            </View>
            <View style={styles.line} />
            <Text style={styles.loyalty}>Loyalty Points</Text>
            <View style={styles.cardLoyalty}>
              <View style={styles.row}>
                <Text style={styles.textMoviegoer}>Moviegoers</Text>
                <Stars />
              </View>
              <Text style={styles.numPoint}>320<Text style={styles.textPoint}> points</Text></Text>
            </View>
            <View style={styles.rowProgres}>
              <Text style={styles.textMaster}>180 points become a master</Text>
            </View>
            <ProgressBar progress={0.5} color='#5F2EEA' style={{borderRadius: 2, height: 5}} />
          </View>
          <Text style={styles.account}>Account Setting</Text>
          <View style={styles.card}>
            <Text style={styles.detailInfo}>Detail Information</Text>
            <View style={styles.line} />
            <InputText label="Full Name" value={this.props.firstname && `${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`} placeholder="Type your full name" paddingVertical={12} onChange={(fullname) => this.setState({fullname})} />
            <View style={{height: 24}} />
            <InputText label="Email" value={this.props.auth.user.email} placeholder="Type your email" paddingVertical={12} onChange={(email) => this.setState({email})} />
            <View style={{height: 24}} />
            <InputNumber label="Phone Number" value={this.props.auth.user.phoneNumber} placeholder="Type your phonenumber" onChange={(phoneNumber) => this.setState({phoneNumber})} />
          </View>
          <View style={styles.card}>
            <Text style={styles.detailInfo}>Account and Privacy</Text>
            <View style={styles.line} />
            <InputPassword label="New Password" placeholder="New password" paddingVertical={1} onChange={(password) => this.setState({password})} />
            <View style={{height: 24}} />
            <InputPassword label="Confirm" placeholder="Confirm password" paddingVertical={1} onChange={(confirmPassword) => this.setState({confirmPassword})} />
          </View>
          <View style={styles.buttonChange}>
            <Button text="Update changes" onPress={() => this.updatePersonalInfo()} />
          </View>
        </View>
        <View style={styles.containerFooter}>
          <FooterHome />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24
  },
  card: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInfo: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66'
  },
  info: {
    fontSize: 20,
    fontFamily: 'Mulish-Regular',
    color: '#5F2EEA'
  },
  rowImage: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 32
  },
  image: {
    width: 136,
    height: 136,
    borderRadius: 68,
    resizeMode: 'cover'
  },
  name: {
    fontSize: 20,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
    marginTop: 32,
    marginBottom: 4
  },
  moviegoers: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66'
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEDEDE',
    marginBottom: 40
  },
  cardLoyalty: {
    backgroundColor: '#5F2EEA',
    marginVertical: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16
  },
  textMoviegoer: {
    fontSize: 18,
    fontFamily: 'Mulish-Bold',
    color: 'white'
  },
  loyalty: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    color: '#4E4B66'
  },
  numPoint: {
    fontSize: 24,
    fontFamily: 'Mulish-Regular',
    color: 'white'
  },
  textPoint: {
    fontSize: 10,
    fontFamily: 'Mulish-Regular',
    color: 'white'
  },
  rowProgres: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMaster: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginBottom: 5
  },
  account: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
    marginTop: 48
  },
  detailInfo: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#14142B',
    marginBottom: 8
  },
  buttonChange: {
    marginVertical: 50
  },
  containerFooter: {
    paddingHorizontal: 24,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = { updateProfile }

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfile)
