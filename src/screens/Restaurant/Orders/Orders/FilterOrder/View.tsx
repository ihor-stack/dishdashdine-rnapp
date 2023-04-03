import React from 'react';
import FilterContainer from '@/screens/Home/FilterContainer';
import {Colors, fonts} from '@/themes';
import {
  VStack,
  Button,
  Center,
  Divider,
  Radio as NRadio,
  Stack,
  Text,
  Icon,
} from 'native-base';
import {IRadioProps} from 'native-base/lib/typescript/components/primitives/Radio/types';
import {DynamicText} from '@/components';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ORDER_TYPE} from '@/constants';

export interface SortAndFilterViewProps {
  filterBy: string;
  setFilterBy: any;
  handleOnPressApply: () => Promise<void>;
  showOrderFilter: boolean;
  restaurantID: string;
  setRestaurantID: any;
}

interface Props extends IRadioProps {
  last?: boolean;
}

const Radio = (props: Props) => {
  return (
    <VStack space={3} alignContent="center">
      <NRadio colorScheme="warning" _text={{fontSize: 'xs'}} {...props} />
      {!props.last && <Divider bgColor={Colors.lightGrey} />}
    </VStack>
  );
};

const FilterOrderView = (props: SortAndFilterViewProps) => {
  const {filterBy, setFilterBy, handleOnPressApply, showOrderFilter} = props;

  return (
    <FilterContainer
      type="showOrderFilter"
      homeState={showOrderFilter}
      useDynamicHeight>
      <VStack bgColor={Colors.white} mb={2}>
        <VStack bgColor={Colors.white} space={3} p={2} pb={4}>
          <Text color={Colors.grey} bold>
            Filter by:
          </Text>
          <NRadio.Group
            name="sort-group"
            accessibilityLabel="sort"
            value={String(filterBy)}
            onChange={selectedValue => {
              setFilterBy(selectedValue);
            }}>
            <Stack space={3} width="full">
              <Radio
                colorScheme="warning"
                value="-1"
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>All</DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value={String(ORDER_TYPE.COLLECTION)}
                fontFamily={fonts.DMSans700Bold}
                fontSize={13}
                lineHeight={17}
                color={Colors.black}
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>
                  Collections
                </DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value={String(ORDER_TYPE.DELIVERY)}
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>
                  Delivery
                </DynamicText>
              </Radio>
            </Stack>
          </NRadio.Group>
        </VStack>
        {/* <VStack bgColor={Colors.white} space={3} p={2}>
          <Text color={Colors.grey} bold>
            Filter by order status
          </Text>
          <NRadio.Group
            name="sort-group"
            accessibilityLabel="sort"
            value={filterOrderStatus}
            onChange={selectedValue => {
              setFilterOrderStatus(selectedValue);
            }}>
            <Stack space={3} width="full">
              <Radio
                colorScheme="warning"
                value="0,1,2,3,4,5,6,7"
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>All</DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value="0,1"
                fontFamily={fonts.DMSans700Bold}
                fontSize={13}
                lineHeight={17}
                color={Colors.black}
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>
                  Pending
                </DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value="2, 3, 4, 5"
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>Active</DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value="6"
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>
                  Completed
                </DynamicText>
              </Radio>
              <Radio
                colorScheme="warning"
                value="7"
                style={styles.radioButton}
                icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                <DynamicText style={styles.radioButtonText}>
                  Cancelled
                </DynamicText>
              </Radio>
            </Stack>
          </NRadio.Group>
        </VStack> */}
      </VStack>
      <Center>
        <Button
          py={4}
          variant="link"
          _text={{
            color: Colors.ember,
          }}
          onPress={handleOnPressApply}>
          Apply
        </Button>
      </Center>
    </FilterContainer>
  );
};

export default FilterOrderView;

export const styles = StyleSheet.create({
  radioButtonText: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 13,
    lineHeight: 17,
    color: Colors.black,
  },
});
