import {
  GOOGLE_API_KEY,
  GOOGLE_GEOCODE_API_BASE_URL,
  GOOGLE_PACES_API_BASE_URL,
} from '@/constants';
import axios from 'axios';

export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  structured_formatting: any;
  terms: any[];
  types: string[];
  selected?: boolean;
};

// https://medium.com/nerd-for-tech/react-native-custom-search-bar-with-google-places-autocomplete-api-69b1c98de6a0
const PlacesService = {
  async placePredictions(search: string) {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search}`;
    const response = await axios.request({
      method: 'post',
      url: apiUrl,
    });
    return response.data;
  },
  async getGeolocationByPlaceId(placeId: string) {
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
    const response = await axios.request({
      method: 'post',
      url: apiUrl,
    });
    return response.data;
  },

  async getPlaceAddressByGeolocation(latitude: number, longitude: number) {
    const apiUrl = `${GOOGLE_GEOCODE_API_BASE_URL}/json?key=${GOOGLE_API_KEY}&latlng=${latitude},${longitude}`;
    const response = await axios.request({
      method: 'post',
      url: apiUrl,
    });
    return response.data;
  },
};

export default PlacesService;
