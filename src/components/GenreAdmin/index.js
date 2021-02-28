import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createGenre} from '../../redux/actions/genre';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../Form/InputText';
import Button from '../Button';

class GenreAdmin extends Component {
  state = {
    genre: '',
  };
  submit = async () => {
    const {genre} = this.state;
    await this.props.createGenre(this.props.auth.token, genre);
    if (this.props.genre.success === true) {
      showMessage('Create Genre successfully', 'success');
    } else {
      showMessage('Failed Create Cinema');
    }
  };
  render() {
    console.log(this.props.auth.token);
    return (
      <ScrollView
        style={[styles.scene, styles.container]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Genre</Text>
        <View style={styles.card}>
          <InputText
            label="Genre Name"
            placeholder="Type your genre name"
            paddingVertical={10}
            onChange={(genre) => this.setState({genre})}
          />
          <View style={styles.gap}>
            <Button text="Save" padding={15} onPress={() => this.submit()} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 16,
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  gap: {
    marginTop: 15,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  genre: state.genre,
});

const mapDispatchToProps = {createGenre};

export default connect(mapStateToProps, mapDispatchToProps)(GenreAdmin);
