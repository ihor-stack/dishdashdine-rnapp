import React from 'react';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import DishSpinner from '@/components/DishSpinner';
import {Colors, fonts} from '@/themes';
import {isEmpty} from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IAddressResolveResponse} from '@/api/generic';
import {PredictionType} from '@/api/google-places';
import {FlatList, StyleSheet} from 'react-native';
import DishButton from '@/components/DishButton';
import DishCurrentLocation from '@/components/DishCurrentLocation';

export interface AddressViewProps {
  navigation?: any;
  isSaving?: boolean;
  showLoading?: boolean;
  searchText?: string;
  setSearchText?: any;
  params?: any;
  predictionsArr?: PredictionType[];
  curLocation?: IAddressResolveResponse;
  renderButtonLabel: () => string;
  onSaveCurrentLocation: (geolocation: any) => Promise<void>;
  onSelectLocation: (item: PredictionType) => void;
  onSaveAddress: () => Promise<void>;
  onLogin: () => Promise<void>;
}

const AddressView = (props: AddressViewProps) => {
  const {
    isSaving,
    navigation,
    searchText,
    setSearchText,
    onSaveCurrentLocation,
    renderButtonLabel,
    curLocation,
    params,
    predictionsArr,
    onSelectLocation,
    showLoading,
    onSaveAddress,
    onLogin,
  } = props;

  const predictedLocationItem = ({
    item,
    index,
  }: {
    item: PredictionType;
    index: number;
  }) => {
    return (
      <DynamicPressable
        flexDirection="row"
        key={index}
        borderBottomColor={Colors.lightGrey}
        borderBottomWidth={1}
        paddingVertical={16}
        style={item.selected && styles.selected}
        onPress={() => onSelectLocation(item)}>
        <DynamicView marginLeft={14}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={15}
            lineHeight={18}
            color="#303030">
            {item.structured_formatting?.main_text}
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={13}
            lineHeight={16}
            color="#818183">
            {item.description}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  return (
    <>
      {isSaving && <DishSpinner />}
      {showLoading && <DishSpinner />}
      <DynamicView flex={1} backgroundColor="#fff">
        <DynamicView paddingHorizontal={12} paddingTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Your Address
          </DynamicText>
          <DynamicView justifyContent="center">
            <DynamicTextInput
              testID="@test-id/addres-input"
              onChangeText={val => {
                setSearchText(val);
              }}
              value={searchText}
              placeholder={'Enter your street, town or postcode...'}
              placeholderTextColor={Colors.grey}
              backgroundColor="#F8F8F8"
              marginTop={4}
              borderRadius={4}
              paddingLeft={41}
              paddingRight={21}
              paddingVertical={11}
              fontSize={14}
              lineHeight={19}
              fontFamily={fonts.DMSans400Regular}
              fontWeight="400"
              color="#303030"
            />
            <DynamicView position="absolute" left={12} top={12}>
              <AntDesign
                size={24}
                name="enviromento"
                color="rgba(129, 129, 131, 1)"
              />
            </DynamicView>
          </DynamicView>
        </DynamicView>
        <DishCurrentLocation
          onPressLocation={({latitude, longitude}) =>
            onSaveCurrentLocation({latitude, longitude})
          }
        />
        <FlatList
          data={predictionsArr}
          renderItem={predictedLocationItem}
          keyExtractor={(item: PredictionType) => item.place_id}
        />
        <DynamicView paddingHorizontal={12} marginTop="auto" marginBottom={28}>
          <DishButton
            onPress={onSaveAddress}
            variant="primary"
            icon="arrowright"
            label={renderButtonLabel()}
          />
          {!isEmpty(params?.isFrom) && params?.isFrom === 'register' && (
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
              <DynamicPressable marginLeft={6} onPress={onLogin}>
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
    </>
  );
};

export default AddressView;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#E0040425',
  },
});
