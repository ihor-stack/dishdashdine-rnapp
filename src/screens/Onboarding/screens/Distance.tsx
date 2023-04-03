import React, {useRef, useState} from 'react';
import {Platform, StyleSheet, useWindowDimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {fonts} from '@/themes/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {authSelectors, setIsAuthenticated} from '@/store/authentication';
import storage from '@/utils/storage';
import {AUTH_TOKEN, DEFAULT_DISTANCE} from '@/constants';
import {isEmpty} from 'lodash';
import {accountSelectors, setCurrentUserDistance} from '@/store/account';
import DishMapView from '@/components/DishMapView';
import {Colors} from '@/themes';
import DishSlider from '@/components/DishSlider';
import DishButton from '@/components/DishButton';
import {fetchCurrentUser} from '@/store/account/thunk';

const maximumTrackTintColor = Platform.OS === 'ios' ? 'red' : '#818183';

const Distance = () => {
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const [distanceValue, setDistanceValue] = useState<number>(DEFAULT_DISTANCE);
  const dispatch = useDispatch<any>();
  const {navigate} = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params;

  const {width, height} = useWindowDimensions();
  const latitudeDelta = useRef(0.05).current;
  const longitudeDelta = useRef(0.05 * (width / height)).current;

  const onNavigateHome = async () => {
    const authToken = await storage.getItem(AUTH_TOKEN);
    if (authToken) {
      await dispatch(setCurrentUserDistance(distanceValue));
      await dispatch(fetchCurrentUser());
      await dispatch(setIsAuthenticated(true));
    }
  };

  return (
    <DynamicView flex={1} backgroundColor="#fff">
      <DynamicView
        marginTop={21}
        marginRight={30}
        marginLeft={30}
        marginHorizontal={11}>
        <DynamicView marginBottom={5} flexDirection="row">
          <DynamicText
            color="#303030"
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}>
            Collection Radius
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row">
          <DynamicText
            color="#818183"
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={13}
            lineHeight={16}>
            You are willing to collect your dish within
          </DynamicText>
          <DynamicText style={styles.within}>{distanceValue} </DynamicText>
          <DynamicText
            color="#818183"
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={13}
            lineHeight={16}>
            miles
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop={16} position="relative">
          <DishSlider
            defaultValue={DEFAULT_DISTANCE}
            value={Number(distanceValue)}
            onChange={v => {
              v && setDistanceValue(Math.floor(v));
            }}
          />
        </DynamicView>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        marginHorizontal={11}
        marginBottom={Platform.OS === 'android' ? 11 : 21}
        paddingTop={Platform.OS === 'ios' ? 0 : 6}>
        <DynamicText style={styles.sliderLabel}> </DynamicText>
      </DynamicView>
      {/*
        custom map:
        https://stackoverflow.com/questions/54220667/custom-map-styling-in-react-native-maps-not-rendering-reverts-to-basic-standard
      */}
      {/* <FastImage
        resizeMode="contain"
        source={mockMap}
        style={{width, height: 380}}
      /> */}
      <DynamicView marginBottom={50} flex={1}>
        <DishMapView
          showRadius={false}
          latitude={Number(currentLocation?.latitude)}
          longitude={Number(currentLocation?.longitude)}
          latitudeDelta={latitudeDelta}
          longitudeDelta={longitudeDelta}
          radius={distanceValue}
          restaurants={[]}
        />
      </DynamicView>
      <DynamicView marginTop="auto" marginHorizontal={11} marginBottom={28}>
        <DishButton
          label={
            isEmpty(params?.isFrom) ? 'Find my dish now' : 'Update distance'
          }
          variant="primary"
          icon="arrowright"
          onPress={onNavigateHome}
        />
        {isEmpty(params?.isFrom) && (
          <DynamicView
            flexDirection="row"
            width="100%"
            justifyContent="center"
            alignItems="center"
            marginTop={15}
            marginBottom={28}>
            <DynamicText
              fontWeight="500"
              fontFamily={fonts.DMSans500Medium}
              lineHeight={20}
              fontSize={15}
              color={'#303030'}>
              Already have an account?
            </DynamicText>
            <DynamicPressable
              marginLeft={6}
              onPress={() => {
                navigate('Login');
              }}>
              <DynamicText
                fontWeight="500"
                fontFamily={fonts.DMSans500Medium}
                lineHeight={20}
                fontSize={15}
                color={'#E00404'}>
                Login
              </DynamicText>
            </DynamicPressable>
          </DynamicView>
        )}
      </DynamicView>
    </DynamicView>
  );
};

export default Distance;

const styles = StyleSheet.create({
  collection: {
    marginLeft: 3,
    height: 20,
    padding: 0,
    color: '#303030',
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
  },
  within: {
    marginLeft: 3,
    height: 16,
    padding: 0,
    color: '#818183',
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 16,
  },
  sliderLabel: {
    textAlign: 'right',
    padding: 0,
    fontFamily: fonts.DMSans400Regular,
    color: Colors.black,
    height: 16,
    lineHeight: 16,
    fontSize: 12,
  },
});
