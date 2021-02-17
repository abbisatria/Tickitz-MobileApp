import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Logo from '../../assets/images/logo.svg'
import CineOne21 from '../../assets/images/cineone21.svg'
import EbvId from '../../assets/images/ebv.id.svg'
import Hiflix from '../../assets/images/hiflix.svg'
import Facebook from '../../assets/icons/eva-facebook.svg'
import Instagram from '../../assets/icons/eva-instagram.svg'
import Twitter from '../../assets/icons/eva-twitter.svg'
import Youtube from '../../assets/icons/eva-youtube.svg'

const FooterHome = () => {
  return (
    <View style={styles.footer}>
      <Logo />
      <Text style={styles.desc}>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</Text>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.text}>Cinemas</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Movies List</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>My Ticket</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Our Sponsor</Text>
      <View style={styles.row}>
        <TouchableOpacity>
          <EbvId />
        </TouchableOpacity>
        <TouchableOpacity>
          <CineOne21 />
        </TouchableOpacity>
        <TouchableOpacity>
          <Hiflix />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Follow us</Text>
      <View style={styles.rowFollow}>
        <TouchableOpacity style={styles.marginRight}>
          <Facebook />
        </TouchableOpacity>
        <TouchableOpacity style={styles.marginRight}>
          <Instagram />
        </TouchableOpacity>
        <TouchableOpacity style={styles.marginRight}>
          <Twitter />
        </TouchableOpacity>
        <TouchableOpacity>
          <Youtube />
        </TouchableOpacity>
      </View>
      <Text style={styles.copyright}>© 2020 Tickitz. All Rights Reserved.</Text>
    </View>
  )
}

export default FooterHome

const styles = StyleSheet.create({
  footer: {
    marginTop: 64
  },
  desc : {
    fontSize: 14, 
    color: '#6E7191',
    fontFamily: 'Mulish-Regular', 
    marginTop: 24
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowFollow: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  marginRight: {
    marginRight: 34
  },
  title: {
    fontSize: 16,
    fontFamily: 'Mulish-SemiBold',
    marginTop: 40, 
    marginBottom: 12
  },
  text: {
    fontSize: 14,  
    color: '#6E7191',
    fontFamily: 'Mulish-Regular'
  },
  copyright: {
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
    color: '#6E7191',
    marginVertical: 64
  }
})
