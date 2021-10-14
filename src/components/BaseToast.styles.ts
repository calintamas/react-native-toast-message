import { StyleSheet } from 'react-native';

export const HEIGHT = 60;
export const WIDTH = 340;
export const BORDER_RADIUS = 6;

export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 2,
    backgroundColor: '#FFF'
  },
  leadingBorder: {
    borderLeftWidth: 5,
    borderLeftColor: '#D8D8D8'
  },
  contentContainer: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start' // In case of RTL, the text will start from the right
  },
  text1: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#000',
    width: '100%' // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
  },
  text2: {
    fontSize: 10,
    color: '#979797',
    width: '100%' // Fixes: https://github.com/calintamas/react-native-toast-message/issues/130
  }
});
