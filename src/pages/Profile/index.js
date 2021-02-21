import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { connect } from 'react-redux'
import { orderHistory } from '../../redux/actions/order'
import {REACT_APP_API_URL as API_URL} from '@env'
import moment from 'moment'
import { ProgressBar } from 'react-native-paper';

import ProfilePicture from '../../assets/images/profile.jpg'
import Stars from '../../assets/icons/ic-stars'

import InputText from '../../components/Form/InputText'
import InputPassword from '../../components/Form/InputPassword'
import InputNumber from '../../components/Form/InputNumber'
import Button from '../../components/Button'
import FooterHome from '../../components/FooterHome'

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'details', title: 'Details' },
      { key: 'order', title: 'Order' }
    ]
  }
  async componentDidMount() {
    await this.props.orderHistory(this.props.auth.token, this.props.auth.user.id)
  }
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#5F2EEA' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 14, color: focused ? 'black' : '#AAAAAA' }}>
          {route.title}
        </Text>
      )}
    />
  )
  DetailsRoute = () => (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.textInfo}>INFO</Text>
            <Text style={styles.info}>...</Text>
          </View>
          <View style={styles.rowImage}>
            <Image source={{uri: `${API_URL}uploads/users/${this.props.auth.user.image}`}} style={styles.image} />
            <Text style={styles.name}>{this.props.auth.user.firstname} {this.props.auth.user.lastname}</Text>
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
          <InputText label="Full Name" value={`${this.props.auth.user.firstname} ${this.props.auth.user.lastname}`} placeholder="Type your full name" paddingVertical={12} />
          <View style={{height: 24}} />
          <InputText label="Email" value={this.props.auth.user.email} placeholder="Type your email" paddingVertical={12} />
          <View style={{height: 24}} />
          <InputNumber label="Phone Number" value={this.props.auth.user.phoneNumber} placeholder="Type your phonenumber" />
        </View>
        <View style={styles.card}>
          <Text style={styles.detailInfo}>Account and Privacy</Text>
          <View style={styles.line} />
          <InputPassword label="New Password" placeholder="New password" paddingVertical={1} />
          <View style={{height: 24}} />
          <InputPassword label="Confirm" placeholder="Confirm password" paddingVertical={1} />
        </View>
        <View style={styles.buttonChange}>
          <Button text="Update changes" />
        </View>
      </View>
    </ScrollView>
  )
  OrderRoute = () => (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {this.props.order.orderHistory !== null ? this.props.order.orderHistory.map((value, index) => {
          return (
            <View style={styles.card} key={String(index)}>
              <Image source={{uri: `${API_URL}uploads/cinemas/${value.image}`}} style={styles.imageCinema} />
              <Text style={styles.date}>{moment(value.createdAt).format('dddd, D MMMM YYYY - hh:mm A')}</Text>
              <Text style={styles.movie}>{value.movie}</Text>
              <View style={styles.line} />
              <Button text="Ticket in active" textColor="white" color="#00BA88" padding={10} />
            </View>
          )
        }) : <Text>No Order</Text>}
      </View>
    </ScrollView>
  )
  initialLayout = { width: Dimensions.get('window').width }
  renderScene = SceneMap({
    details: this.DetailsRoute,
    order: this.OrderRoute,
  })
  render() {
    const { index, routes } = this.state
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <TabView
            renderTabBar={this.renderTabBar}
            navigationState={{index, routes}}
            renderScene={this.renderScene}
            onIndexChange={index => this.setState({ index })}
            initialLayout={this.initialLayout}
          />
          <View style={styles.containerFooter}>
            <FooterHome />
          </View>
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
  containerFooter: {
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  card: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowImage: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginVertical: 32
  },
  image: {
    width: 136,
    height: 136,
    borderRadius: 68
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
  date: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#AAAAAA',
    marginTop: 17,
    marginBottom: 4
  },
  movie: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 32
  },
  imageCinema: {
    width: 106,
    height: 43,
    resizeMode: 'contain'
  }
})

const mapStateToProps = state => ({
  auth: state.auth,
  order: state.order
})

const mapDispatchToProps = { orderHistory }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
