import React from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';

const Arrow = ({direction}: {direction: 'up' | 'down'}) => (
  <FeatherIcon name={`chevron-${direction}`} size={20} color="#818183" />
);

export default Arrow;
