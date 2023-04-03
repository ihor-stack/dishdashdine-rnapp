import React from 'react';
import {
  Button,
  Center,
  Divider,
  Icon,
  Radio as NRadio,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {IRadioProps} from 'native-base/lib/typescript/components/primitives/Radio/types';
import FilterContainer from '../FilterContainer';
import {Colors} from '@/themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native';

export interface SortAndFilterViewProps {
  value: string;
  setValue: any;
  handleOnPressApply: () => Promise<void>;
  setIsVegan: any;
  setIsVegetarian: any;
  setIsGlutenFree: any;
  dietary: string;
  setDietary: any;
  showSortAndFilter: boolean;
}

interface Props extends IRadioProps {
  last?: boolean;
}

const Radio = (props: Props) => {
  return (
    <VStack space={3} alignContent="center">
      <NRadio colorScheme="red" _text={{fontSize: 'xs'}} {...props} />
      {!props.last && <Divider bgColor={Colors.lightGrey} />}
    </VStack>
  );
};

const SortAndFilterView = (props: SortAndFilterViewProps) => {
  const {
    value,
    setValue,
    handleOnPressApply,
    setIsVegan,
    setIsVegetarian,
    setIsGlutenFree,
    dietary,
    setDietary,
    showSortAndFilter,
  } = props;

  return (
    <FilterContainer
      type="showSortAndFilter"
      homeState={showSortAndFilter}
      useDynamicHeight>
      <ScrollView style={{flexGrow: 1}}>
        <VStack space={2} bgColor={Colors.lightGrey} mb={2}>
          <VStack bgColor={Colors.white} space={3} p={2}>
            <Text color={Colors.grey} bold>
              Sort
            </Text>
            <NRadio.Group
              name="sort-group"
              accessibilityLabel="sort"
              value={value}
              onChange={selectedValue => {
                setValue(selectedValue);
              }}>
              <Stack space={3} width="full">
                <Radio
                  colorScheme="red"
                  value="1"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Best match
                </Radio>
                <Radio
                  colorScheme="red"
                  value="2"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Most popular
                </Radio>
                <Radio
                  colorScheme="red"
                  value="3"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Customer rating
                </Radio>
                <Radio
                  colorScheme="red"
                  value="4"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Distace
                </Radio>
                <Radio
                  colorScheme="red"
                  value="5"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Hygiene rating
                </Radio>
                <Radio
                  colorScheme="red"
                  value="6"
                  last
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Price(low to high)
                </Radio>
              </Stack>
            </NRadio.Group>
          </VStack>
          <VStack bgColor={Colors.white} space={3} p={2}>
            <Text color={Colors.grey} bold>
              Dietary
            </Text>
            <NRadio.Group
              name="sort-group"
              accessibilityLabel="sort"
              value={dietary}
              onChange={val => {
                setDietary(val);
                if (val === '') {
                  setIsVegan(false);
                  setIsVegetarian(false);
                  setIsGlutenFree(false);
                } else if (val === 'vegan') {
                  setIsVegan(true);
                  setIsVegetarian(false);
                  setIsGlutenFree(false);
                } else if (val === 'vegetarian') {
                  setIsVegan(false);
                  setIsVegetarian(true);
                  setIsGlutenFree(false);
                } else if (val === 'gluten free') {
                  setIsVegan(false);
                  setIsVegetarian(false);
                  setIsGlutenFree(true);
                }
              }}>
              <Stack space={2} width="full">
                <Radio
                  colorScheme="red"
                  value=""
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  None
                </Radio>
                <Radio
                  colorScheme="red"
                  value="vegan"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Vegan
                </Radio>
                <Radio
                  colorScheme="red"
                  value="vegetarian"
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Vegetarian
                </Radio>
                <Radio
                  colorScheme="red"
                  value="gluten free"
                  last
                  icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
                  Gluten Free
                </Radio>
              </Stack>
            </NRadio.Group>
          </VStack>
        </VStack>
        <Divider bgColor={Colors.lightGrey} />
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
      </ScrollView>
    </FilterContainer>
  );
};

export default SortAndFilterView;
