import {StyleSheet} from 'react-native';
import React from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {Checkbox} from 'native-base';
import OpeningHourScheduler from '@/screens/Restaurant/Restaurants/screens/OpeningHours/OpeningHourScheduler';
import DishButton from '@/components/DishButton';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {Controller} from 'react-hook-form';

export interface EntryMenuViewProps {
  categories: any;
  availability: any;
  onSubmit: any;
  showLoading: boolean;
  control: any;
  assignedCategories: string[];
  setAssignedCategories: any;
  onUpdateFormContent: any;
  onDelete: () => void,
  action: string
}

const EntryMenuView = (props: EntryMenuViewProps) => {
  const {
    availability,
    onSubmit,
    showLoading,
    control,
    onUpdateFormContent,
    onDelete,
    action
  } = props;

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.lightGrey,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <DynamicView
        backgroundColor={Colors.white}
        paddingTop={25}
        paddingHorizontal={11}>
        <DynamicText style={styles.textLabelStyle}>Name</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                placeholder="Please enter a name"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Description</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                placeholder="Please enter a description"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline
                height={100}
              />
            )}
            name="description"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView
        marginTop={2}
        paddingTop={22}
        paddingHorizontal={11}
        backgroundColor={Colors.white}>
        <DynamicText style={styles.textLabelStyle}>
          Menus Availability
        </DynamicText>
        <DynamicView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop={25}>
          <DynamicText style={styles.textLabelStyle}>Day</DynamicText>
          <DynamicText paddingLeft={85} style={styles.textLabelStyle}>
            Open
          </DynamicText>
          <DynamicText paddingRight={55} style={styles.textLabelStyle}>
            Close
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop={20}>
          {availability &&
            availability.map((item: any, index: number) => {
              return (
                <OpeningHourScheduler
                  key={index}
                  label={moment().day(item.dayOfWeek).format('dddd').toString()}
                  openingDate={
                    item.openTimeDate ? item.openTimeDate : new Date()
                  }
                  tpOpenValue={
                    item.openTime
                      ? moment(item.openTime).format('HH:mm').toString()
                      : '-'
                  }
                  onOpenChangeDate={(date: any) =>
                    onUpdateFormContent('open', item, index, date)
                  }
                  tpCloseValue={
                    item.closeTime
                      ? moment(item.closeTime).format('HH:mm').toString()
                      : '-'
                  }
                  closingDate={
                    item.closeTimeDate ? item.closeTimeDate : new Date()
                  }
                  onCloseChangeDate={(date: any) =>
                    onUpdateFormContent('close', item, index, date)
                  }
                  isChecked={!!item.open}
                  onToggleSwith={() =>
                    onUpdateFormContent('toggle', item, index)
                  }
                />
              );
            })}
        </DynamicView>
      </DynamicView>
      <DynamicView flex={1} />
      <DynamicView marginBottom={21} marginHorizontal={11}>
        <DishButton
          icon="arrowright"
          label="Save Details"
          variant="primary"
          onPress={onSubmit}
          showSpinner={showLoading}
        />
        {
          action === "update" ? 
            <DishButton
              showIcon={false}
              icon="arrowright"
              label="Delete"
              onPress={onDelete}
              showSpinner={showLoading}
            /> : null
        }
        
      </DynamicView>
    </ScrollView>
  );
};

export default EntryMenuView;

const styles = StyleSheet.create({
  textLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontWeight: '700',
    lineHeight: 20,
    fontSize: 15,
    color: Colors.black,
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
  },
  textInputView: {
    marginTop: 4,
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  selectStyle: {
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
});
