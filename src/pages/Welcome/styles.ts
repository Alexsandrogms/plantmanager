import { StyleSheet, Dimensions } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 34,
    textAlign: 'center',
    marginTop: 40,
    color: colors.heading,
  },
  image: {
    height: Dimensions.get('window').height * 0.4,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 25,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.green,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    fontSize: 0,
  },
});

export default styles;
