import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {createCinema} from '../../redux/actions/cinema';
import {showMessage} from '../../helpers/showMessage';
import {launchImageLibrary} from 'react-native-image-picker';

import InputText from '../Form/InputText';
import Button from '../Button';

class CinemaAdmin extends Component {
  state = {
    dataImage: null,
    cinemaName: '',
    location: '',
    price: '',
    address: '',
    image: '',
  };
  addPhotoGallery = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 300,
        maxHeight: 300,
      },
      async (response) => {
        if (response.didCancel) {
          showMessage('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };
          this.setState({dataImage, image: response.uri});
        }
      },
    );
  };
  submit = async () => {
    const {cinemaName, location, dataImage, price, address} = this.state;
    await this.props.createCinema(
      this.props.auth.token,
      cinemaName,
      location,
      dataImage,
      price,
      address,
    );
    if (this.props.cinema.success === true) {
      showMessage('Create Cinema successfully', 'success');
    } else {
      showMessage('Failed Create Cinema');
    }
  };
  render() {
    return (
      <ScrollView
        style={[styles.scene, styles.container]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Cinema</Text>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => this.addPhotoGallery()}>
            <View style={styles.cardCinema}>
              {this.state.image === '' ? (
                <Text>Upload Cinema</Text>
              ) : (
                <Image
                  source={{uri: this.state.image}}
                  style={styles.imageCinema}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.gap}>
            <InputText
              label="Cinema Name"
              placeholder="Type your cinema name"
              paddingVertical={10}
              onChange={(cinemaName) => this.setState({cinemaName})}
            />
          </View>
          <View style={styles.gap}>
            <InputText
              label="Location"
              placeholder="Type your location"
              paddingVertical={10}
              onChange={(location) => this.setState({location})}
            />
          </View>
          <View style={styles.gap}>
            <InputText
              label="Price"
              placeholder="Type your price"
              paddingVertical={10}
              keyboardType="numeric"
              onChange={(price) => this.setState({price})}
            />
          </View>
          <View style={styles.gap}>
            <InputText
              multiline={true}
              numberOfLines={4}
              label="Address"
              placeholder="Type your location"
              paddingVertical={10}
              onChange={(address) => this.setState({address})}
            />
          </View>
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
  cardCinema: {
    borderWidth: 1,
    borderColor: '#A0A3BD',
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  imageCinema: {
    width: 72,
    height: 23,
    resizeMode: 'contain',
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
  cinema: state.cinema,
});

const mapDispatchToProps = {createCinema};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaAdmin);
