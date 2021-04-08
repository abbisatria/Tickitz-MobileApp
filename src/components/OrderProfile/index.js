import React, {useEffect} from 'react';
import {Text, StyleSheet, View, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {orderHistory, detailTicket} from '../../redux/actions/order';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';
import Button from '../Button';
import FooterHome from '../FooterHome';
import {useNavigation} from '@react-navigation/native';

function OrderProfile(props) {
  const fetchData = async () => {
    await props.orderHistory(props.auth.token, props.auth.user.id);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const navigation = useNavigation();
  const ticketDetail = async (id) => {
    await props.detailTicket(props.auth.token, id);
    navigation.navigate('Ticket');
  };
  return (
    <View style={styles.scene}>
      {props.order.orderHistory !== null ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={props.order.orderHistory}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={() => (
            <View style={styles.containerFooter}>
              <FooterHome />
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image
                source={{uri: `${API_URL}uploads/cinemas/${item.image}`}}
                style={styles.imageCinema}
              />
              <Text style={styles.date}>
                {moment(item.createdAt).format('dddd, D MMMM YYYY - hh:mm A')}
              </Text>
              <Text style={styles.movie}>{item.movie}</Text>
              <View style={styles.line} />
              <Button
                text="Ticket in active"
                textColor="white"
                color="#00BA88"
                padding={10}
                onPress={() => ticketDetail(item.id)}
              />
            </View>
          )}
        />
      ) : (
        <Text>No Order</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  card: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40,
    marginHorizontal: 24,
  },
  imageCinema: {
    width: 106,
    height: 43,
    resizeMode: 'contain',
  },
  date: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#AAAAAA',
    marginTop: 17,
    marginBottom: 4,
  },
  movie: {
    fontSize: 18,
    fontFamily: 'Mulish-SemiBold',
    marginBottom: 32,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEDEDE',
    marginBottom: 40,
  },
  containerFooter: {
    marginTop: 20,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

const mapDispatchToProps = {orderHistory, detailTicket};

export default connect(mapStateToProps, mapDispatchToProps)(OrderProfile);
