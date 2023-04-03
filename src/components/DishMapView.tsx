import {StyleSheet, ViewStyle, StyleProp, Platform} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import MapView, {
  Circle,
  MapViewProps,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {Colors} from '@/themes';
import {convertMilestoMeters} from '@/utils/common';
import {DEFAULT_DURATION} from '@/constants';

export interface DishMapViewProps extends MapViewProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  radius?: number | null;
  maxRadius?: number | null;
  style?: StyleProp<ViewStyle>;
  restaurants?: any[];
  zooms?: number;
  showRadius?: boolean;
  showMaxRadius?: boolean;
}

const locationPin = require('@/assets/images/LocationPin.png');
const activePin = require('@/assets/images/ActiveRestaurantPin.png');
const inActivePin = require('@/assets/images/InactiveRestaurantPin.png');

const DishMapView = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
  radius,
  maxRadius,
  style,
  restaurants,
  showRadius,
  showMaxRadius,
}: DishMapViewProps) => {
  const mapView = useRef<MapView>(null);
  const initialRegion: Region = useMemo(() => {
    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }, [latitude, longitude, latitudeDelta, longitudeDelta]);

  useEffect(() => {
    mapView.current?.animateToRegion(initialRegion, DEFAULT_DURATION);
  }, [initialRegion]);

  const isRestaurantActive = (restaurant: any, index: number) => {
    const isTakingOrders = restaurant.takingOrders;

    return isTakingOrders ? (
      <Marker
        key={index}
        identifier="user-location"
        icon={activePin}
        image={activePin}
        tracksViewChanges={false}
        coordinate={{
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        }}
      />
    ) : (
      <Marker
        key={index}
        identifier="user-location"
        icon={inActivePin}
        image={inActivePin}
        tracksViewChanges={false}
        coordinate={{
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        }}
      />
    );
  };

  return (
    <MapView
      ref={mapView}
      provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
      // provider={PROVIDER_GOOGLE}
      style={[styles.MapView, style]}
      initialRegion={initialRegion}
      zoomEnabled
      rotateEnabled
      pitchEnabled
      zoomControlEnabled>
      {showRadius && (
        <Circle
          radius={convertMilestoMeters(Number(radius))}
          strokeColor={Colors.red}
          fillColor="#E0040425"
          center={{
            latitude,
            longitude,
          }}
          zIndex={1}
        />
      )}
      {showMaxRadius && (
        <Circle
          radius={convertMilestoMeters(Number(maxRadius))}
          strokeColor={Colors.red}
          fillColor="#E0040425"
          center={{
            latitude,
            longitude,
          }}
          zIndex={1}
        />
      )}
      <Marker
        identifier="user-location"
        icon={locationPin}
        image={locationPin}
        tracksViewChanges={false}
        coordinate={{
          latitude,
          longitude,
        }}
      />
      {restaurants &&
        restaurants?.map((item, index) => isRestaurantActive(item, index))}
    </MapView>
  );
};

export default DishMapView;

const styles = StyleSheet.create({
  MapView: {
    flex: 1,
  },
});
