import { StyleSheet } from 'react-native';

import fonts from '@styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 40,
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    fontFamily: fonts.text,
  },
});

export default styles;
