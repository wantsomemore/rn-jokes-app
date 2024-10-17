import React from 'react';
import Svg, {Path, G, ClipPath, Defs, Rect} from 'react-native-svg';

const TodayIcon = ({color}: {color: string}) => {
  return (
    <Svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
      <G clipPath='url(#clip0_4_385)'>
        <Path
          d='M4.00404 15.8416L14.7711 3.41806C15.1955 2.92838 16 3.22852 16 3.87651V10.3C16 10.6866 16.3134 11 16.7 11H23.4671C24.0669 11 24.3889 11.7052 23.9961 12.1585L13.229 24.5819C12.8046 25.0716 12 24.7715 12 24.1235V17.7C12 17.3134 11.6866 17 11.3 17H4.53302C3.93317 17 3.61118 16.2949 4.00404 15.8416Z'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_4_385'>
          <Rect width='28' height='28' fill='white' />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default TodayIcon;
