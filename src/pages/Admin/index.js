import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import MovieAdmin from '../../components/MovieAdmin';
import CinemaAdmin from '../../components/CinemaAdmin';
import GenreAdmin from '../../components/GenreAdmin';

class Profile extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'movie', title: 'Movie'},
      {key: 'cinema', title: 'Cinema'},
      {key: 'genre', title: 'Genre'},
    ],
  };

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.backgroundTabBar}
      renderLabel={({route, focused, color}) => (
        <Text style={styles.textTabbar(focused)}>{route.title}</Text>
      )}
    />
  );

  initialLayout = {width: Dimensions.get('window').width};
  renderScene = SceneMap({
    movie: () => <MovieAdmin />,
    cinema: () => <CinemaAdmin />,
    genre: () => <GenreAdmin />,
  });

  render() {
    const {index, routes} = this.state;
    return (
      <View style={styles.scene}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({index})}
          initialLayout={this.initialLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  indicator: {
    backgroundColor: '#5F2EEA',
  },
  backgroundTabBar: {
    backgroundColor: 'white',
  },
  textTabbar: (focused) => ({
    fontFamily: 'Mulish-Regular',
    fontSize: 14,
    color: focused ? 'black' : '#AAAAAA',
  }),
});

export default Profile;
