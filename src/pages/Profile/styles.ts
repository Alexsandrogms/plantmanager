import { StyleSheet } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
  header: {
    flex: 1,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.green_light,
  },
  buttonGoBack: {
    position: 'absolute',
    top: 60,
    left: 30,
    fontSize: 0,
  },
  card: {
    width: '80%',
    minHeight: '35%',
    borderRadius: 24,
    position: 'relative',
    bottom: 100,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.backgroundShadow,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 4,
  },
  cardImageWrapper: {
    borderRadius: 14,
    position: 'relative',
    bottom: 45,
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 8,
  },
  cardButtonEdit: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 2,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  cardText: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 30,
    color: colors.heading,
  },
  cardTodayText: {
    fontFamily: fonts.text,
    fontSize: 18,
    color: colors.gray_dark,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    color: colors.heading,
    // width: '100%',
    fontSize: 18,
    // marginTop: 50,
    padding: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputActive: {
    borderBottomColor: colors.green,
  },
  footer: {
    flex: 2,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.shape,
    paddingBottom: 15,
  },
});

export default styles;
