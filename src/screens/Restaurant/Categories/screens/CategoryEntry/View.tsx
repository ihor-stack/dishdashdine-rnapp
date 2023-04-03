import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {Checkbox} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {IAdminCategory} from '@/api/admin_restaurant/model';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {Controller} from 'react-hook-form';
import DishButton from '@/components/DishButton';
import {isEmpty} from 'lodash';

export interface CategoryEntryViewProps {
  control: any;
  onSubmit: any;
  showLoading: boolean;
  menus: any[];
  assignedMenus: string[];
  setAssignedMenus: any;
  category: IAdminCategory;
  action: string;
}

const CategoryEntryView: React.FC<CategoryEntryViewProps> = ({
  control,
  onSubmit,
  showLoading,
  menus,
  assignedMenus,
  setAssignedMenus,
  category,
  action,
}) => {
  const CATEGORY_DETAILS = () => {
    return (
      <DynamicView style={styles.containerView}>
        <DynamicView marginTop={15}>
          {!isEmpty(category?.name) && (
            <DynamicText style={styles.categoryTitle}>
              {category?.name}
            </DynamicText>
          )}
          {!isEmpty(category?.displayMenus) && (
            <DynamicText style={styles.categorySubTitle}>
              Included in: {category?.displayMenus}
            </DynamicText>
          )}
        </DynamicView>
        <DynamicView marginTop={22} marginBottom={10}>
          <DynamicText style={styles.categoryLabelStyle}>Name</DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                marginTop={4}
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
        <DynamicView marginTop={22}>
          <DynamicText style={styles.categoryLabelStyle}>
            Description
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                placeholder="Please enter a desciption"
                placeholderTextColor={Colors.grey}
                marginTop={4}
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
        <DynamicView marginTop={19}>
          <DynamicText style={styles.categoryLabelStyle}>
            Specials Categories to appear in:
          </DynamicText>
          <Checkbox.Group
            marginTop={29}
            value={assignedMenus}
            onChange={values => {
              setAssignedMenus(values || []);
            }}>
            {menus?.map((item, index) => {
              return (
                <Checkbox
                  key={index}
                  value={item.menuId}
                  colorScheme="red"
                  marginBottom={28}
                  marginRight={11}>
                  <DynamicText style={styles.categoryLabelStyle}>
                    {item.name}
                  </DynamicText>
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </DynamicView>
      </DynamicView>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      {CATEGORY_DETAILS()}
      <DynamicView flex={1} />
      <DynamicView
        marginHorizontal={11}
        marginBottom={21}
        backgroundColor={Colors.white}>
        {action === 'add' ? (
          <DishButton
            icon="arrowright"
            label="Save Category"
            variant="primary"
            onPress={onSubmit}
            showSpinner={showLoading}
          />
        ) : (
          <>
            <DishButton
              icon="arrowright"
              label="Update Category"
              variant="primary"
              onPress={onSubmit}
              showSpinner={showLoading}
            />
            <DishButton
              showIcon={false}
              label="Delete Category"
              variant="lightGrey"
            />
          </>
        )}
      </DynamicView>
    </ScrollView>
  );
};

export default CategoryEntryView;

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryTitle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 16,
    lineHeight: 21,
    color: Colors.black,
  },
  categorySubTitle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
  categoryLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
});
