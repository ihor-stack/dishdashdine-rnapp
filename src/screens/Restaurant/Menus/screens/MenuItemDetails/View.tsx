import {DynamicText, DynamicView} from '@/components';
import {Colors} from '@/themes';
import React from 'react';
import {ScrollView, Platform} from 'react-native';
import {
  IAdminCategories,
  IAdminItemAssignedCategories,
  IAdminMenuItem,
  IAdminMenus,
} from '@/api/admin_restaurant/model';
import DishButton from '@/components/DishButton';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import styles from '@/screens/Restaurant/Menus/screens/MenuItemDetails/styles';
import {Switch} from 'react-native-gesture-handler';
import AboutDetails from '@/screens/Restaurant/Menus/screens/MenuItemDetails/AboutDetails';
import CategoriesDetails from '@/screens/Restaurant/Menus/screens/MenuItemDetails/CategoriesDetails';
import PricingDetails from '@/screens/Restaurant/Menus/screens/MenuItemDetails/PricingDetails';
import ModifiersDetail from '@/screens/Restaurant/Menus/screens/MenuItemDetails/ModifiersDetail';
import NutritionDetails from '@/screens/Restaurant/Menus/screens/MenuItemDetails/NutritionDetails';
import ItemModal from '@/screens/Restaurant/Menus/screens/ItemModal';
import DishSpinner from '@/components/DishSpinner';

export interface MenuItemDetailsViewProps {
  restaurantId: string;
  itemId: string;
  menuItem: IAdminItemAssignedCategories;
  menu: IAdminMenus;
  menuDetails: IAdminMenuItem;
  action: string;
  showLoading: boolean;
  setShowLoading: boolean;
  onSubmit: any;
  onAddMenuITem: any;
  singleFilePicker: () => Promise<void>;
  openCamera: () => Promise<void>;
  largeImagePath: any;
  setLargeImagePath: any;
  control: any;
  onAddPhoto: any;
  CustomActionSheet: any;
  service: string;
  setService: any;
  menuItemCategories: IAdminCategories[];
  setMenuItemCategories: any;
  menuItemModifiers: IAdminCategories[];
  setMenuItemModifiers: any;
  toggleSoldOut: () => void;
  onSelectCategories: () => Promise<void>;
  onSelectModifiers: () => Promise<void>;
  onRemoveCategory: (index: number) => void;
  onRemoveModifier: (index: number) => void;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
  setIsVegetarian: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVegan: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGlutenFree: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteItem: any;
}

const MenuItemDetailsView: React.FC<MenuItemDetailsViewProps> = ({
  action,
  menuDetails,
  showLoading,
  onSubmit,
  control,
  largeImagePath,
  singleFilePicker,
  openCamera,
  onAddPhoto,
  CustomActionSheet,
  menuItemCategories,
  menuItemModifiers,
  toggleSoldOut,
  onSelectCategories,
  onSelectModifiers,
  onRemoveCategory,
  isVegan,
  isVegetarian,
  isGlutenFree,
  setIsVegetarian,
  setIsVegan,
  setIsGlutenFree,
  onRemoveModifier,
  temperature,
  setTemperature,
  onDeleteItem,
}) => {
  return (
    <>
      {showLoading && <DishSpinner />}
      <ScrollView
        style={{flex: 1, backgroundColor: Colors.white}}
        contentContainerStyle={{
          backgroundColor: Colors.white,
          flexGrow: 1,
          paddingBottom: 19,
        }}>
        <DynamicView style={styles.toggleSwitchContainer}>
          <DynamicText style={styles.textLabelStyle}>
            Item is sold out
          </DynamicText>
          <Switch
            trackColor={{
              false: 'rgba(171, 187, 194, 0.26)',
              true: 'rgba(224, 4, 4, 0.25)',
            }}
            thumbColor={menuDetails.soldOut ? Colors.ember : Colors.darkGrey}
            value={menuDetails.soldOut}
            onValueChange={toggleSoldOut}
            style={
              Platform.OS === 'ios' ? {transform: [{scaleX: 0.8}, {scaleY: 0.8}]} : {transform: [{scaleX: 1.2}, {scaleY: 1.2}]}
            }
          />
        </DynamicView>
        <DynamicView flex={1}>
          <AboutDetails
            control={control}
            largeImagePath={largeImagePath}
            onAddPhoto={onAddPhoto}
          />
          <CategoriesDetails
            onSelectCategories={onSelectCategories}
            itemCategories={menuItemCategories}
            onRemoveCategory={onRemoveCategory}
          />
          <PricingDetails control={control} />
          <ModifiersDetail
            onSelectModifiers={onSelectModifiers}
            menuItemModifiers={menuItemModifiers}
            onRemoveModifier={onRemoveModifier}
          />
          <NutritionDetails
            menuDetails={menuDetails}
            control={control}
            isVegan={isVegan}
            isVegetarian={isVegetarian}
            isGlutenFree={isGlutenFree}
            temperature={temperature}
            setIsVegetarian={setIsVegetarian}
            setIsVegan={setIsVegan}
            setIsGlutenFree={setIsGlutenFree}
            setTemperature={setTemperature}
          />
        </DynamicView>
        <DynamicView flex={1} />
        <DynamicView marginTop={26} marginBottom={20} paddingHorizontal={12}>
          <DishButton
            icon="arrowright"
            label={action !== 'add' ? 'Save Item' : 'Add Item'}
            variant="primary"
            onPress={onSubmit}
            showSpinner={showLoading}
          />
          {action !== 'add' && (
            <DishButton
              showIcon={false}
              label="Delete Item"
              onPress={onDeleteItem}
              showSpinner={showLoading}
            />
          )}
        </DynamicView>
        <ActionSheet
          ref={CustomActionSheet}
          options={['Take Photo', 'Photos Gallery', 'Cancel']}
          cancelButtonIndex={2}
          onPress={index => {
            if (index === 0) {
              openCamera();
            } else if (index === 1) {
              singleFilePicker();
            }
          }}
        />
        <ItemModal sheetId="ItemModal" />
      </ScrollView>
    </>
  );
};

export default MenuItemDetailsView;
