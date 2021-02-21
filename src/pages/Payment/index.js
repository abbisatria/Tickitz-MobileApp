import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'
import { checkOut } from '../../redux/actions/order'

import FooterHome from '../../components/FooterHome'
import GooglePay from '../../assets/icons/ic-google-pay.svg'
import Visa from '../../assets/icons/ic-visa.svg'
import Gopay from '../../assets/icons/ic-gopay.svg'
import Paypal from '../../assets/icons/ic-paypal.svg'
import Ovo from '../../assets/icons/ic-ovo.svg'
import Dana from '../../assets/icons/ic-dana.svg'

import InputText from '../../components/Form/InputText'
import InputNumber from '../../components/Form/InputNumber'
import Button from '../../components/Button'

class Payment extends Component {
  state = {
    loading: false
  }
  payOrder = async () => {
    this.setState({loading: true})
    await this.props.checkOut(this.props.order.results[0].idMovie, this.props.order.results[0].idCinema, this.props.order.results[0].id, this.props.order.seatChecked, this.props.auth.token)
    this.setState({loading: false})
    this.props.navigation.navigate('Ticket')
  }
  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardTotal}>
            <Text style={styles.textTotal}>Total Payment</Text>
            <Text style={styles.numTotal}>${this.props.order.results[0].price * this.props.order.seatChecked.join(', ').split(', ').length}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>
            <View style={styles.card}>
              <View style={styles.payment}>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <GooglePay />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <Visa />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <Gopay />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <Paypal />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <Ovo />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.borderPayment}>
                    <Dana />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.or}>
                <View style={styles.lineLeft} />
                <Text style={styles.textOr}>or</Text>
                <View style={styles.lineRight} />
              </View>
              <View style={styles.cash}>
                <Text style={styles.textCash}>Pay via cash. </Text>
                <TouchableOpacity><Text style={styles.link}>See how it work</Text></TouchableOpacity>
              </View>
            </View>
            <Text style={styles.title}>Personal Info</Text>
            <View style={styles.card}>
              <InputText label="Full Name" placeholder="Type your full name" value={`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`} paddingVertical={12} />
              <View style={{height: 24}} />
              <InputText label="Email" placeholder="Type your email" value={this.props.auth.user.email} paddingVertical={12} />
              <View style={{height: 24}} />
              <InputNumber label="Phone Number" placeholder="Type your phone number" value={this.props.auth.user.phoneNumber} />
              <View style={{height: 24}} />
              <View style={styles.alert}>
                <Icon name="exclamation-triangle" color="#F4B740" size={20} />
                <Text style={styles.textAlert}>Fill your data correctly.</Text>
              </View>
            </View>
            {this.state.loading ? <ActivityIndicator size="large" color="#000000" /> : <Button text="Pay your order" onPress={() => this.payOrder()} />}
          </View>
          <View style={styles.containerFooter}>
            <FooterHome />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: 'white',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  textTotal: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: '#AAAAAA'
  },
  numTotal: {
    fontSize: 20,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B'
  },
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 32,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 40
  },
  payment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24

  },
  borderPayment: {
    width: 80,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    marginBottom: 16
  },
  or: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  lineLeft: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#DEDEDE'
  },
  textOr: {
    marginHorizontal: 40, 
    color: '#A0A3BD'
  },
  lineRight: {
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#DEDEDE'
  },
  cash: {
    marginTop: 30, 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  textCash: {
    color: '#6E7191',
    fontSize: 14,
    fontFamily: 'Mulish-Medium'
  },
  link: {
    fontSize: 14,
    color: '#5F2EEA', 
    fontFamily: 'Mulish-Medium'
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: 'rgba(244, 183, 64, 0.3)',
    borderRadius: 12
  },
  textAlert: {
    fontSize: 14,
    fontFamily: 'Mulish-Regular',
    color: '#4E4B66',
    marginLeft: 16
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 72
  },
  containerFooter: {
    paddingHorizontal: 24,
    backgroundColor: 'white'
  }
})

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
})

const mapDispatchToProps = { checkOut }

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
