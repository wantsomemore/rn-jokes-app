import React from 'react';
import Svg, {Path, G, ClipPath, Defs, Rect} from 'react-native-svg';

const HistoryIcon = ({color}: {color: string}) => {
  return (
    <Svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <G clipPath='url(#clip0_4_386)'>
        <Path
          d='M14 9V14H18M25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14Z'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_4_386'>
          <Rect width='28' height='28' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default HistoryIcon;
