import React, {useState} from 'react';
import {DynamicText, DynamicView} from '@/components';
import MenuItemDetails from '../MenuItemDetails/Details';
import {ScrollView, StyleSheet, Switch} from 'react-native';
import {Colors, fonts} from '@/themes';
import {Divider} from 'native-base';
import DishButton from '@/components/DishButton';
import {IAdminMenuItem, IAdminMenus} from '@/api/admin_restaurant/model';

export interface MenuItemFormViewProps {
  menuDetails: IAdminMenuItem;
  menu: IAdminMenus;
}

const AboutTab: React.FC<MenuItemFormViewProps> = ({menuDetails, menu}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const onSubmit = () => {};

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        backgroundColor: Colors.white,
        flexGrow: 1,
        paddingBottom: 19,
      }}>
      <MenuItemDetails menuDetails={menuDetails} menu={menu} />
      <DynamicView flex={1} />
      <DynamicView marginTop={26} marginBottom={20} paddingHorizontal={12}>
        <DishButton
          icon="arrowright"
          label="Save Item"
          variant="primary"
          onPress={onSubmit}
          showSpinner={showLoading}
        />
        <DishButton showIcon={false} label="Delete Item" />
      </DynamicView>
    </ScrollView>
  );
};

export default AboutTab;

const styles = StyleSheet.create({

  textLabel: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
});
