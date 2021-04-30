import { StyleSheet } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 54,
  },
  emoji: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 14,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputActive: {
    borderBottomColor: colors.green,
  },
});

export default styles;
