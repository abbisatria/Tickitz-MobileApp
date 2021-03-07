import React, {Component} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import FooterHome from '../../components/FooterHome';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {seatChecked} from '../../redux/actions/order';

import Button from '../../components/Button';
import Seat from '../../components/Seat';

class Order extends Component {
  state = {
    alfabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    seatNumber: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
    ],
    seat: [],
    loading: false,
  };
  selectSeat = (id) => {
    const {seat} = this.state;
    let newArray = [];
    if (seat.indexOf(id) === -1) {
      seat.push(id);
      newArray = seat;
    } else {
      newArray = seat.filter((item) => item !== id);
    }
    this.setState({
      seat: newArray,
    });
  };
  checkOut = () => {
    this.setState({loading: true});
    this.props.seatChecked(this.state.seat);
    this.setState({loading: false});
    this.props.navigation.navigate('Payment');
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cardChooseSeat}>
            <Text style={styles.textChooseSeat}>Choose Your Seat</Text>
            <View style={styles.cardSeat}>
              <View style={styles.lineScreen} />
              <View style={styles.rowSeat}>
                {this.state.alfabet.map((item, index) => {
                  return (
                    <View key={index} style={styles.colSeat}>
                      {this.state.seatNumber.map((value, indexSeat) => {
                        return (
                          <React.Fragment key={indexSeat}>
                            {`${item}${value}` === 'F11' ? (
                              this.props.order.seatSold.some(
                                (sold) => sold.name === 'F11, F12',
                              ) ? (
                                <Seat seatLoveSold />
                              ) : (
                                <TouchableOpacity
                                  onPress={() => this.selectSeat('F11, F12')}>
                                  <Seat
                                    seatLove
                                    selected={this.state.seat.includes(
                                      'F11, F12',
                                    )}
                                  />
                                </TouchableOpacity>
                              )
                            ) : `${item}${value}` ===
                              'F12' ? null : this.props.order.seatSold.some(
                                (sold) => sold.name === `${item}${value}`,
                              ) ? (
                              <Seat seatSold />
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  this.selectSeat(`${item}${value}`)
                                }>
                                <Seat
                                  seat
                                  selected={this.state.seat.includes(
                                    `${item}${value}`,
                                  )}
                                />
                              </TouchableOpacity>
                            )}
                            {`${item}${value}` === `${item}7` ? (
                              <View style={styles.gap} />
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
              <View>
                <Text style={styles.textSeatKey}>Seating key</Text>
                <View style={styles.rowSeatKey}>
                  <View style={styles.colLeft}>
                    <Icon size={20} name="arrow-down" />
                    <Text style={styles.textInfo}> A - G</Text>
                  </View>
                  <View style={styles.colRight}>
                    <Icon size={20} name="arrow-right" />
                    <Text style={styles.textInfo}> A - G</Text>
                  </View>
                </View>
                <View style={styles.rowSeatKey}>
                  <View style={styles.colLeft}>
                    <View style={styles.seat} />
                    <Text style={styles.textInfo}> Available</Text>
                  </View>
                  <View style={styles.colRight}>
                    <View style={styles.seatSelected} />
                    <Text style={styles.textInfo}> Selected</Text>
                  </View>
                </View>
                <View style={styles.rowSeatKey}>
                  <View style={styles.colLeft}>
                    <View style={styles.seatLove} />
                    <Text style={styles.textInfo}> Love nest</Text>
                  </View>
                  <View style={styles.colRight}>
                    <View style={styles.seatSold} />
                    <Text style={styles.textInfo}> Sold</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.cardChoosed}>
              <Text>Choosed</Text>
              <Text>{this.state.seat.join(', ')}</Text>
            </View>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <Button
                text="Checkout now"
                onPress={() => this.checkOut()}
                disabled={this.state.seat.length > 0 ? false : true}
                color={this.state.seat.length > 0 ? '#5F2EEA' : '#D8CCFA'}
              />
            )}
          </View>
          <View style={styles.containerFooter}>
            <FooterHome />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  cardChooseSeat: {
    paddingHorizontal: 24,
    backgroundColor: '#EFF0F7',
    paddingTop: 32,
    paddingBottom: 72,
  },
  textChooseSeat: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
  },
  cardSeat: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 41,
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 32,
  },
  lineScreen: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#9570FE',
  },
  rowSeat: {
    marginTop: 10,
    marginBottom: 24,
  },
  colSeat: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 6,
  },
  gap: {
    width: 16,
  },
  textSeatKey: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 18,
  },
  rowSeatKey: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  colLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  colRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 13,
    fontFamily: 'Mulish-SemiBold',
    color: '#4E4B66',
  },
  seat: {
    width: 20,
    height: 20,
    backgroundColor: '#D6D8E7',
    marginRight: 6,
    borderRadius: 2,
  },
  seatSelected: {
    width: 20,
    height: 20,
    backgroundColor: '#5F2EEA',
    marginRight: 6,
    borderRadius: 2,
  },
  seatLove: {
    width: 20,
    height: 20,
    backgroundColor: '#F589D7',
    marginRight: 6,
    borderRadius: 2,
  },
  seatSold: {
    width: 20,
    height: 20,
    backgroundColor: '#6E7191',
    marginRight: 6,
    borderRadius: 2,
  },
  cardChoosed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
  },
  containerFooter: {
    paddingHorizontal: 24,
  },
});

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {seatChecked};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
