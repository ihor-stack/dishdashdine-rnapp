import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {useSelector} from 'react-redux';
import {Box, Flex, Pressable, Text} from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';

import {IAdminRestaurant} from '@/api/admin_restaurant/model';
import {Arrow, CheckBox, TopTimeSection} from './components';
import {
  convertMinsToHrsMins,
  getTotalMinutes,
  hours,
  minutes,
  scrollViewProps,
  styles,
  zIndexBoxes,
} from './constants';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {useUpdatePreparationTime} from './hooks';
import DishSpinner from '@/components/DishSpinner';

const PreparationTimeView = () => {
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );

  const {loading, onSubmit} = useUpdatePreparationTime(restaurant);

  const getPreparationTime = (timeMode: TimeModeType) =>
    restaurant?.preparationTimes?.find(p => p.preparationTimeMode === timeMode);

  const normalTime = getPreparationTime(0);

  const normalprepTimeMinData = convertMinsToHrsMins(normalTime?.prepTimeMin);
  const normalprepTimeMaxData = convertMinsToHrsMins(normalTime?.prepTimeMax);

  const [isNormalChecked, setIsNormalChecked] = useState(normalTime?.enabled);
  const onNormalCheckboxPress = () => setIsNormalChecked(f => !f);

  const [normalMinPrepHoursOpen, setNormalMinPrepHoursOpen] = useState(false);
  const [normalMinPrepHoursValue, setNormalMinPrepHoursValue] = useState(
    normalprepTimeMinData.totalHours,
  );

  const [normalMinPrepMinsOpen, setNormalMinPrepMinsOpen] = useState(false);
  const [normalMinPrepMinsValue, setNormalMinPreptMinsValue] = useState(
    normalprepTimeMinData.totalMinutes,
  );

  const [normalMaxPrepHoursOpen, setNormalMaxPrepHoursOpen] = useState(false);
  const [normalMaxPrepHoursValue, setNormalMaxPrepHoursValue] = useState(
    normalprepTimeMaxData.totalHours,
  );

  const [normalMaxPrepMinsOpen, setNormalMaxPrepMinsOpen] = useState(false);
  const [normalMaxPrepMinsValue, setNormalMaxPreptMinsValue] = useState(
    normalprepTimeMaxData.totalMinutes,
  );

  const busyTime = getPreparationTime(1);

  const busyPrepTimeMinData = convertMinsToHrsMins(busyTime?.prepTimeMin);
  const busyPrepTimeMaxData = convertMinsToHrsMins(busyTime?.prepTimeMax);

  const [isBusyChecked, setIsBusyChecked] = useState(busyTime?.enabled);
  const onBusyCheckBoxPress = () => setIsBusyChecked(c => !c);

  const [busyMinPrepHoursOpen, setBusyMinPrepHoursOpen] = useState(false);
  const [busyMinPrepHoursValue, setBusyMinPrepHoursValue] = useState(
    busyPrepTimeMinData.totalHours,
  );

  const [busyMinPrepMinsOpen, setBusyMinPrepMinsOpen] = useState(false);
  const [busyMinPrepMinsValue, setBusyMinPreptMinsValue] = useState(
    busyPrepTimeMinData.totalMinutes,
  );

  const [busyMaxPrepHoursOpen, setBusyMaxPrepHoursOpen] = useState(false);
  const [busyMaxPrepHoursValue, setBusyMaxPrepHoursValue] = useState(
    busyPrepTimeMaxData.totalHours,
  );

  const [busyMaxPrepMinsOpen, setBusyMaxPrepMinsOpen] = useState(false);
  const [busyMaxPrepMinsValue, setBusyMaxPreptMinsValue] = useState(
    busyPrepTimeMaxData.totalMinutes,
  );

  const chaosTime = getPreparationTime(2);

  const chaosPrepTimeMinData = convertMinsToHrsMins(chaosTime?.prepTimeMin);
  const chaosPrepTimeMaxData = convertMinsToHrsMins(chaosTime?.prepTimeMax);

  const [isChaosChecked, setIsChaosChecked] = useState(chaosTime?.enabled);
  const onChaosCheckBoxPress = () => setIsChaosChecked(c => !c);

  const [chaosMinPrepHoursOpen, setChaosMinPrepHoursOpen] = useState(false);
  const [chaosMinPrepHoursValue, setChaosMinPrepHoursValue] = useState(
    chaosPrepTimeMinData.totalHours,
  );

  const [chaosMinPrepMinsOpen, setChaosMinPrepMinsOpen] = useState(false);
  const [chaosMinPrepMinsValue, setChaosMinPreptMinsValue] = useState(
    chaosPrepTimeMinData.totalMinutes,
  );

  const [chaosMaxPrepHoursOpen, setChaosMaxPrepHoursOpen] = useState(false);
  const [chaosMaxPrepHoursValue, setChaosMaxPrepHoursValue] = useState(
    chaosPrepTimeMaxData.totalHours,
  );

  const [chaosMaxPrepMinsOpen, setChaosMaxPrepMinsOpen] = useState(false);
  const [chaosMaxPrepMinsValue, setChaosMaxPreptMinsValue] = useState(
    chaosPrepTimeMaxData.totalMinutes,
  );

  const onSaveSettings = async () => {
    if (loading) return;

    const normalData = {
      enabled: !!isNormalChecked,
      prepTimeMax: getTotalMinutes(
        normalMaxPrepHoursValue,
        normalMaxPrepMinsValue,
      ),
      prepTimeMin: getTotalMinutes(
        normalMinPrepHoursValue,
        normalMinPrepMinsValue,
      ),
      preparationTimeMode: 0,
    };

    const busyData = {
      enabled: !!isBusyChecked,
      prepTimeMax: getTotalMinutes(busyMaxPrepHoursValue, busyMaxPrepMinsValue),
      prepTimeMin: getTotalMinutes(busyMinPrepHoursValue, busyMinPrepMinsValue),
      preparationTimeMode: 1,
    };

    const chaosData = {
      enabled: !!isChaosChecked,
      prepTimeMax: getTotalMinutes(
        chaosMaxPrepHoursValue,
        chaosMaxPrepMinsValue,
      ),
      prepTimeMin: getTotalMinutes(
        chaosMinPrepHoursValue,
        chaosMinPrepMinsValue,
      ),
      preparationTimeMode: 2,
    };

    const data = [normalData, busyData, chaosData];

    await onSubmit(data);
  };

  return (
    <ScrollView
      nestedScrollEnabled
      style={styles.scroll}
      contentContainerStyle={styles.contentContainerStyle}>
      {loading ? <DishSpinner /> : null}
      <Text variant="screenTitle">Preparation Times</Text>
      <Box zIndex={zIndexBoxes[1]}>
        <TopTimeSection
          title="Normal"
          isChecked={!!isNormalChecked}
          onPress={onNormalCheckboxPress}
        />
        <Flex px={10} direction="row">
          <Flex flex={0.5} mr="1.5">
            <Text variant="pickerTitle">Min prep time</Text>
            <Flex direction="row">
              <Flex flex={0.5} mr="1">
                <Text variant="pickerLabel">Hours</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={hours}
                  scrollViewProps={scrollViewProps}
                  zIndex={3000}
                  open={normalMinPrepHoursOpen}
                  setOpen={setNormalMinPrepHoursOpen}
                  value={normalMinPrepHoursValue}
                  setValue={setNormalMinPrepHoursValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
              <Flex flex={0.5} ml="1">
                <Text variant="pickerLabel">Mins</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={minutes}
                  scrollViewProps={scrollViewProps}
                  zIndex={3000}
                  open={normalMinPrepMinsOpen}
                  setOpen={setNormalMinPrepMinsOpen}
                  value={normalMinPrepMinsValue}
                  setValue={setNormalMinPreptMinsValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex flex={0.5} ml="1.5">
            <Text variant="pickerTitle">Max prep time</Text>
            <Flex direction="row">
              <Flex flex={0.5} mr="1">
                <Text variant="pickerLabel">Hours</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={hours}
                  scrollViewProps={scrollViewProps}
                  zIndex={3000}
                  open={normalMaxPrepHoursOpen}
                  setOpen={setNormalMaxPrepHoursOpen}
                  value={normalMaxPrepHoursValue}
                  setValue={setNormalMaxPrepHoursValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
              <Flex flex={0.5} ml="1">
                <Text variant="pickerLabel">Mins</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={minutes}
                  scrollViewProps={scrollViewProps}
                  zIndex={3000}
                  open={normalMaxPrepMinsOpen}
                  setOpen={setNormalMaxPrepMinsOpen}
                  value={normalMaxPrepMinsValue}
                  setValue={setNormalMaxPreptMinsValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box zIndex={zIndexBoxes[2]}>
        <TopTimeSection
          title="Busy"
          isChecked={!!isBusyChecked}
          onPress={onBusyCheckBoxPress}
        />
        <Flex px={10} direction="row">
          <Flex flex={0.5} mr="1.5">
            <Text variant="pickerTitle">Min prep time</Text>
            <Flex direction="row">
              <Flex flex={0.5} mr="1">
                <Text variant="pickerLabel">Hours</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={hours}
                  scrollViewProps={scrollViewProps}
                  zIndex={2000}
                  open={busyMinPrepHoursOpen}
                  setOpen={setBusyMinPrepHoursOpen}
                  value={busyMinPrepHoursValue}
                  setValue={setBusyMinPrepHoursValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
              <Flex flex={0.5} ml="1">
                <Text variant="pickerLabel">Mins</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={minutes}
                  scrollViewProps={scrollViewProps}
                  zIndex={2000}
                  open={busyMinPrepMinsOpen}
                  setOpen={setBusyMinPrepMinsOpen}
                  value={busyMinPrepMinsValue}
                  setValue={setBusyMinPreptMinsValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex flex={0.5} ml="1.5">
            <Text variant="pickerTitle">Max prep time</Text>
            <Flex direction="row">
              <Flex flex={0.5} mr="1">
                <Text variant="pickerLabel">Hours</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={hours}
                  scrollViewProps={scrollViewProps}
                  zIndex={2000}
                  open={busyMaxPrepHoursOpen}
                  setOpen={setBusyMaxPrepHoursOpen}
                  value={busyMaxPrepHoursValue}
                  setValue={setBusyMaxPrepHoursValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
              <Flex flex={0.5} ml="1">
                <Text variant="pickerLabel">Mins</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  items={minutes}
                  scrollViewProps={scrollViewProps}
                  modalTitle="rer"
                  zIndex={2000}
                  open={busyMaxPrepMinsOpen}
                  setOpen={setBusyMaxPrepMinsOpen}
                  value={busyMaxPrepMinsValue}
                  setValue={setBusyMaxPreptMinsValue}
                  ArrowUpIconComponent={() => <Arrow direction="up" />}
                  ArrowDownIconComponent={() => <Arrow direction="down" />}
                  textStyle={styles.textStyle}
                  style={styles.dropDownStyle}
                  dropDownContainerStyle={styles.dropDownContainerStyle}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        zIndex={zIndexBoxes[3]}
        mb={10}
        pb={20}
        borderBottomColor="#e2e2e2"
        borderBottomWidth={1}>
        <Flex px={10} variant="preparationTimeDivider">
          <CheckBox
            isChecked={!!isChaosChecked}
            onPress={onChaosCheckBoxPress}
          />
          <Text variant="pickerRightCheck">Chaos</Text>
        </Flex>
        <Flex direction="row">
          <Text pl={10} flex={0.5} variant="pickerTitle">
            Min prep time
          </Text>
          <Text flex={0.5} variant="pickerTitle">
            Max prep time
          </Text>
        </Flex>
        <Flex direction="row">
          <Flex flex={0.25} ml={10}>
            <Text variant="pickerLabel">Hours</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={scrollViewProps}
              zIndex={1000}
              dropDownDirection="TOP"
              maxHeight={130}
              items={hours}
              open={chaosMinPrepHoursOpen}
              setOpen={setChaosMinPrepHoursOpen}
              value={chaosMinPrepHoursValue}
              setValue={setChaosMinPrepHoursValue}
              ArrowUpIconComponent={() => <Arrow direction="up" />}
              ArrowDownIconComponent={() => <Arrow direction="down" />}
              textStyle={styles.textStyle}
              style={styles.dropDownStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </Flex>
          <Flex flex={0.25} mx={10}>
            <Text variant="pickerLabel">Mins</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={scrollViewProps}
              dropDownDirection="TOP"
              maxHeight={130}
              zIndex={1000}
              items={minutes}
              open={chaosMinPrepMinsOpen}
              setOpen={setChaosMinPrepMinsOpen}
              value={chaosMinPrepMinsValue}
              setValue={setChaosMinPreptMinsValue}
              ArrowUpIconComponent={() => <Arrow direction="up" />}
              ArrowDownIconComponent={() => <Arrow direction="down" />}
              textStyle={styles.textStyle}
              style={styles.dropDownStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </Flex>
          <Flex flex={0.25}>
            <Text variant="pickerLabel">Hours</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={scrollViewProps}
              dropDownDirection="TOP"
              maxHeight={130}
              items={hours}
              open={chaosMaxPrepHoursOpen}
              setOpen={setChaosMaxPrepHoursOpen}
              value={chaosMaxPrepHoursValue}
              setValue={setChaosMaxPrepHoursValue}
              ArrowUpIconComponent={() => <Arrow direction="up" />}
              ArrowDownIconComponent={() => <Arrow direction="down" />}
              textStyle={styles.textStyle}
              style={styles.dropDownStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </Flex>
          <Flex flex={0.25} mx={10}>
            <Text variant="pickerLabel">Mins</Text>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={scrollViewProps}
              dropDownDirection="TOP"
              maxHeight={130}
              items={minutes}
              open={chaosMaxPrepMinsOpen}
              setOpen={setChaosMaxPrepMinsOpen}
              value={chaosMaxPrepMinsValue}
              setValue={setChaosMaxPreptMinsValue}
              ArrowUpIconComponent={() => <Arrow direction="up" />}
              ArrowDownIconComponent={() => <Arrow direction="down" />}
              textStyle={styles.textStyle}
              style={styles.dropDownStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
            />
          </Flex>
        </Flex>
      </Flex>
      <Pressable variant="lgPrimaryBtn" onPress={onSaveSettings}>
        <Text variant="lgText">Save Settings</Text>
      </Pressable>
    </ScrollView>
  );
};

export default PreparationTimeView;

type TimeModeType = 0 | 1 | 2;
