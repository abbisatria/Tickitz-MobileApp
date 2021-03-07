import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createGenre} from '../../redux/actions/genre';
import {showMessage} from '../../helpers/showMessage';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../Form/InputText';
import Button from '../Button';

const validationSchema = Yup.object().shape({
  genreName: Yup.string()
    .min(2, '*Genre name must have at least 2 characters')
    .max(50, '*Genre name must be less than 50 characters')
    .required('*Genre name is required'),
});

class GenreAdmin extends Component {
  submit = async (values) => {
    const {genreName} = values;
    await this.props.createGenre(this.props.auth.token, genreName);
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
          <Formik
            initialValues={{genreName: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
              this.submit(values);
              resetForm();
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              isValid,
              touched,
            }) => (
              <View>
                <InputText
                  label="Genre Name"
                  placeholder="Type your genre name"
                  paddingVertical={10}
                  onChange={handleChange('genreName')}
                  onBlur={handleBlur('genreName')}
                  value={values.genreName}
                />
                {errors.genreName && touched.genreName ? (
                  <Text style={styles.textError}>{errors.genreName}</Text>
                ) : null}
                <View style={styles.gap}>
                  <Button
                    text="Save"
                    padding={15}
                    color={!isValid ? '#D8CCFA' : '#5F2EEA'}
                    onPress={!isValid ? null : handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
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
  textError: {
    fontFamily: 'Mulish-Regular',
    fontSize: 12,
    color: 'red',
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  genre: state.genre,
});

const mapDispatchToProps = {createGenre};

export default connect(mapStateToProps, mapDispatchToProps)(GenreAdmin);
