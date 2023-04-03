import {ImageSourcePropType} from 'react-native';

export type Restaurant = {
  name: string;
  rating: number;
  distance: number;
  servingTime: string;
  image: ImageSourcePropType;
  favorite: boolean;
};
