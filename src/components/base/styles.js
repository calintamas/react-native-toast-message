import { StyleSheet } from 'react-native';
import colors from '../../colors';

export const HEIGHT = 60;

export default StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: '90%',
    borderRadius: 6,
    backgroundColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2
  },
  borderLeft: {
    borderLeftWidth: 5,
    borderLeftColor: colors.alto
  },
  leadingIconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start' // in case of rtl the text will start from the right
  },
  trailingIconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leadingIcon: {
    width: 20,
    height: 20
  },
  trailingIcon: {
    width: 9,
    height: 9
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3
  },
  text2: {
    fontSize: 10,
    color: colors.dustyGray
  }
});
