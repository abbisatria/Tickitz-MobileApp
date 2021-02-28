import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';

import {connect} from 'react-redux';

import FooterHome from '../../components/FooterHome';

class Ticket extends Component {
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.row}>
              <QRCode value="http://localhost:3000" />
            </View>
            <View style={styles.rowLine}>
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.circleRight} />
            </View>
            <View style={styles.rowDetail}>
              <View style={[styles.col, styles.widthCol]}>
                <Text style={styles.name}>Movie</Text>
                <Text style={styles.text}>
                  {this.props.order.resultsCheckOut[0].movie}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.name}>Category</Text>
                <Text style={styles.text}>
                  {this.props.order.resultsCheckOut[0].category}
                </Text>
              </View>
              <View style={[styles.col, styles.widthCol]}>
                <Text style={styles.name}>Date</Text>
                <Text style={styles.text}>
                  {moment(
                    this.props.order.resultsCheckOut[0].showtimeDate,
                  ).format('D MMMM')}
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.name}>Time</Text>
                <Text style={styles.text}>
                  {moment(
                    this.props.order.resultsCheckOut[0].showtime,
                    'HH:mm:ss',
                  ).format('hh:mm A')}
                </Text>
              </View>
              <View style={[styles.col, styles.widthCol]}>
                <Text style={styles.name}>Count</Text>
                <Text style={styles.text}>
                  {this.props.order.resultsCheckOut[0].ticketCount} pcs
                </Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.name}>Seats</Text>
                <Text style={styles.text}>
                  {this.props.order.resultsCheckOut[0].seats}
                </Text>
              </View>
            </View>
            <View style={styles.rowTotal}>
              <Text>Total</Text>
              <Text>${this.props.order.resultsCheckOut[0].totalPayment}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerFooter}>
          <FooterHome />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 48,
    marginHorizontal: 40,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLine: {
    position: 'relative',
    marginBottom: 60,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    left: -30,
    bottom: -15,
    zIndex: 1,
  },
  circleRight: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    right: -30,
    bottom: -15,
    zIndex: 1,
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginTop: 40,
  },
  rowDetail: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    marginBottom: 20,
  },
  widthCol: {
    width: 160,
  },
  name: {
    fontSize: 12,
    fontFamily: 'Mulish-SemiBold',
    color: '#AAAAAA',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Mulish-SemiBold',
    color: '#14142B',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  containerFooter: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(Ticket);
