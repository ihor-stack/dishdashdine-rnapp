import React from 'react';
import {Divider, Icon} from 'native-base';
import {Colors, fonts} from '@/themes';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DynamicText, DynamicView, DynamicPressable} from '@/components/index';
import {getAddressTypeLabel} from '@/utils/common';
import {isEmpty} from 'lodash';

export interface DishAddressItemProps {
  addressType: number;
  formattedAddress: string;
  otherAddressType: string;
  showDivider?: boolean;
  onPress?: any;
}

const DishAddressItem = ({
  addressType,
  formattedAddress,
  otherAddressType,
  showDivider,
  onPress,
}: DishAddressItemProps) => {
  const getAddressIcon = (type: number) => {
    switch (type) {
      case 1:
        return (
          <Icon as={<Feather name="map-pin" />} color={Colors.ember} size={6} />
        );
      case 2:
        return (
          <Icon as={<Feather name="home" />} color={Colors.ember} size={6} />
        );
      case 3:
        return (
          <Icon
            as={<MaterialIcons name="work-outline" />}
            color={Colors.ember}
            size={6}
          />
        );
      case 4:
        return (
          <Icon
            as={<AntDesign name="enviromento" />}
            color={Colors.ember}
            size={6}
          />
        );
      default:
        return (
          <Icon as={<Feather name="home" />} color={Colors.ember} size={6} />
        );
    }
  };

  return (
    <>
      <DynamicPressable
        flexDirection="row"
        marginVertical={20}
        onPress={onPress}>
        {getAddressIcon(addressType)}
        <DynamicView paddingLeft={12}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={15}
            lineHeight={18}
            color={Colors.black}>
            {!isEmpty(otherAddressType)
              ? otherAddressType
              : getAddressTypeLabel(addressType)}
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontSize={13}
            lineHeight={15.62}
            color={Colors.grey}
            numberOfLines={2}>
            {formattedAddress}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
      {showDivider && <Divider bgColor={Colors.lightGrey} />}
    </>
  );
};

export default DishAddressItem;
