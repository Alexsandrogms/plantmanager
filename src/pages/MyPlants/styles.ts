import { StyleSheet, Dimensions } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

const { width: screenW } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.white,
  },
  spotlight: {
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
    maxWidth: screenW - 36,
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.blue,
  },
  plantList: {
    flex: 1,
    width: '100%',
  },
  plantListTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    color: colors.heading,
    paddingTop: 40,
    paddingBottom: 10,
  },
});

export default styles;
