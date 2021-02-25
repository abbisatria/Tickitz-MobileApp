import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import DetailProfile from '../../components/DetailProfile'
import OrderProfile from '../../components/OrderProfile'

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'details', title: 'Details' },
      { key: 'order', title: 'Order' }
    ]
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

  initialLayout = { width: Dimensions.get('window').width }
  renderScene = SceneMap({
    details: () => <DetailProfile />,
    order: () => <OrderProfile />,
  })

  render() {
    const { index, routes } = this.state
    return (
      <View style={styles.scene}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={this.initialLayout}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  }
})

export default Profile
