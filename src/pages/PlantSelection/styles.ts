import { StyleSheet } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  heading: {
    width: '100%',
    padding: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.medium,
    lineHeight: 23,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.text,
    lineHeight: 23,
    color: colors.heading,
  },
  list: {
    paddingLeft: 20,
    paddingBottom: 5,
    justifyContent: 'center',
    width: '100%',
  },
  itemSeparator: {
    marginHorizontal: 6,
  },
  plants: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 32,
    marginTop: 20,
    justifyContent: 'center',
  },
});

export default styles;
