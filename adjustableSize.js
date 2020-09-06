import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const screenHeightBasis= 812;
const screenWidthBasis = 375;

const horizontalScale = (base) => {
  return (width/ screenWidthBasis) * base
}

const verticalScale = (base) => {
  return (height/screenHeightBasis) * base
}

export {horizontalScale, verticalScale}