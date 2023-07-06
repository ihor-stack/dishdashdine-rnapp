import React, {useEffect, useState, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MenuItemDetailsView from './View';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchMenuItemDetail,
  fetchRestaurantMenuItems,
  removeRestaurantMenuItem,
} from '@/store/admin_restaurant/restaurant/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {
  IAdminCategories,
  IAdminMenuItem,
  IAdminModifierGroups,
  IAdminRestaurant,
  IMenuItemsDetailsImage,
} from '@/api/admin_restaurant/model';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useToast} from 'native-base';
//import DishToast from '@/components/DishToast';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import moment from 'moment';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {each, isEmpty} from 'lodash';
import {SheetManager} from 'react-native-actions-sheet';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type MenuItemDetailsFormType = {
  itemId: string;
  soldOut: boolean;
  name: string;
  description: string;
  categories: string;
  energyValueCal: number;
  energyValueKCal: number;
  temperature: number;
  price: number;
  vat: number;
  largeImage: IMenuItemsDetailsImage;
};

const MenuItemDetails = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const CustomActionSheet = useRef<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;

  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );

  const restaurantId = params?.id;
  const itemId = params?.itemId;
  const menuItem = params?.menuItem;
  const menu = params?.menu;
  const action: any = params?.action;

  const [isChecked, setIsChecked] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [largeImagePath, setLargeImagePath] = useState<string>();
  const [service, setService] = useState<string>('');
  const [menuItemCategories, setMenuItemCategories] = useState<
    IAdminCategories[]
  >([]);
  const [menuItemModifiers, setMenuItemModifiers] = useState<
    IAdminModifierGroups[]
  >([]);
  const [largeImage, setLargeImage] = useState<IMenuItemsDetailsImage | any>(
    null,
  );
  const [menuDetails, setMenuDetails] = useState<IAdminMenuItem | any>({});
  const [temperature, setTemperature] = useState<number>(0);

  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);

  const [isCold, setIsCold] = useState<boolean>(false);
  const [isUnheated, setIsUnheated] = useState<boolean>(false);
  const [isHot, setIsHot] = useState<boolean>(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<MenuItemDetailsFormType>({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required('Name is required'),
          description: yup.string().required('Description is required'),
          price: yup.number().required('Price is required'),
          vat: yup.number().required('Vat is required'),
          energyValueCal: yup.number().required('Energy Cal is required'),
          energyValueKCal: yup.number().required('Energy Kcal is required'),
        })
        .required(),
    ),
    defaultValues: {
      price: 0,
      vat: 0,
      energyValueCal: 0,
      energyValueKCal: 0,
    },
  });

  useEffect(() => {
    clearErrors();
    const init = async () => {
      try {
        setShowLoading(true);
        const response = await dispatch(
          fetchMenuItemDetail({
            id: restaurantId,
            itemId,
          }),
        ).unwrap();
        if (response) {
          setMenuDetails(response);
          setLargeImagePath(response.largeImagePath);
          reset(response);

          setIsVegetarian(response.vegetarian);
          setIsVegan(response.vegan);
          setIsGlutenFree(response.glutenFree);
          setTemperature(response.temperature);
          if (!isEmpty(response.assignedCategories)) {
            setMenuItemCategories(response.assignedCategories);
          }

          if (!isEmpty(response.assignedModifierGroups)) {
            setMenuItemModifiers(response.assignedModifierGroups);
          }
        }

        if (action !== 'add') {
          reset();
        } else {
          setLargeImagePath(response.largeImagePath);
          reset(response);
        }
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
        captureErrorException(error);
      }
    };

    init();
  }, [restaurantId, itemId, dispatch]);

  const singleFilePicker = async () => {
    const fileData: ImageOrVideo | any = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      writeTempFile: false,
    });
    const fileExtension = String(fileData.mime).substr(
      String(fileData.mime).indexOf('/') + 1,
    );
    setLargeImage({
      base64Payload: fileData?.data,
      fileName: `Mobile_Upload_${moment().unix()}.${fileExtension}`,
      contentType: fileData?.mime,
    });
    setLargeImagePath(fileData?.path);
  };

  const openCamera = async () => {
    const image: ImageOrVideo | any = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      writeTempFile: false,
    });
    const fileExtension = String(image.mime).substr(
      String(image.mime).indexOf('/') + 1,
    );
    setLargeImage({
      base64Payload: image?.data,
      fileName: `Mobile_Upload_${moment().unix()}.${fileExtension}`,
      contentType: image?.mime,
    });
    setLargeImagePath(image?.path);
  };

  const onAddMenuItem = async (data: MenuItemDetailsFormType) => {
    setShowLoading(true);
    try {
      const menuItemParams = {
        ...data,
        temperature: Number(temperature),
        largeImage,
        glutenFree: isGlutenFree,
        vegan: isVegan,
        vegetarian: isVegetarian,
        soldOut: isChecked,
        assignedCategories: menuItemCategories.map(item => item.categoryId),
        assignedModifierGroups: menuItemModifiers.map(
          item => item.modifierGroupId,
        ),
        otherDietaryRequirement: '',
        // largeImagePath: largeImage,
      };
      const response = await RestaurantService.createRestaurantMenuItem(
        restaurantId || restaurant.restaurantId,
        menuItemParams,
      );

      console.log(`request restaurant_id:${restaurantId || restaurant.restaurantId} params:${JSON.stringify(menuItemParams)}`);
      console.log('response:', response);

      if (response) {
        await dispatch(
          fetchRestaurantMenuItems(restaurantId || restaurant.restaurantId),
        ).unwrap();
        handleSuccessToast();
      } else {
        setShowLoading(false);
      }
    } catch (error: any) {
      console.log('error:', error);
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      each(
        errs,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
    }
  };

  const onUpdateMenuITem = async (data: MenuItemDetailsFormType) => {
    setShowLoading(true);
    try {
      const menuItemParams = {
        ...data,
        temperature: Number(temperature),
        largeImage,
        glutenFree: isGlutenFree,
        vegan: isVegan,
        vegetarian: isVegetarian,
        soldOut: isChecked,
        assignedCategories: menuItemCategories.map(item => item.categoryId),
        assignedModifierGroups: menuItemModifiers.map(
          item => item.modifierGroupId,
        ),
        otherDietaryRequirement: '',
        // largeImagePath: largeImage,
      };
      const response = await RestaurantService.updateRestaurantMenuItem(
        restaurantId || restaurant.restaurantId,
        itemId,
        menuItemParams,
      );

      if (response) {
        const result = await dispatch(
          fetchRestaurantMenuItems(restaurantId || restaurant.restaurantId),
        ).unwrap();
        handleSuccessToast();
      } else {
        setShowLoading(false);
      }
    } catch (error: any) {
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      each(
        errs,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
    }
  };

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.name) {
        return handleErrorToast(String(errors.name?.message));
      } else if (errors.description) {
        return handleErrorToast(String(errors.description?.message));
      } else if (errors.price) {
        return handleErrorToast(String(errors.price?.message));
      } else if (errors.vat) {
        return handleErrorToast(String(errors.vat?.message));
      } else if (errors.energyValueCal) {
        return handleErrorToast(String(errors.energyValueCal?.message));
      } else if (errors.energyValueKCal) {
        return handleErrorToast(String(errors.energyValueKCal?.message));
      }
    }

    if (action === 'add') {
      handleSubmit(onAddMenuItem)();
    } else {
      handleSubmit(onUpdateMenuITem)();
    }
  };

  const handleErrorToast = (message: string) => {
    // toast.show({
    //   placement: 'top',
    //   duration: 2500,
    //   render: () => {
    //     return (
    //       <DishToast title="Warning" message={message} variant="warning" />
    //     );
    //   },
    // });
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          // <DishToast
          //   title={action === 'add' ? 'Menu Item added' : 'Information updated'}
          //   message={
          //     action === 'add'
          //       ? 'Your Menu Item has been added.'
          //       : 'Your information has been updated.'
          //   }
          //   variant="success"
          // />
          showSuccessMessage(
            action === 'add' ? 'Menu Item added' : 'Information updated',
            action === 'add'
              ? 'Your Menu Item has been added.'
              : 'Your information has been updated.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onAddPhoto = () => {
    CustomActionSheet.current?.show();
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const onRemoveCategory = (index: number) => {
    const newData = [...menuItemCategories];
    newData.splice(index, 1);
    setMenuItemCategories(newData);
  };

  const onRemoveModifier = (index: number) => {
    const newData = [...menuItemModifiers];
    newData.splice(index, 1);
    setMenuItemModifiers(newData);
  };

  const onSelectCategories = async () => {
    const newData = [...menuItemCategories];
    const selectedCategory: any = await SheetManager.show('ItemModal', {
      payload: {
        restaurantId: restaurantId,
        itemType: 'categories',
      },
    });
    if (selectedCategory) {
      newData.push({
        ...selectedCategory,
        name: selectedCategory.name,
        categoryName: selectedCategory.name,
      });
      setMenuItemCategories(newData);
    }
  };

  const onSelectModifiers = async () => {
    const newData = [...menuItemModifiers];
    const modifier: any = await SheetManager.show('ItemModal', {
      payload: {
        restaurantId: restaurantId,
        itemType: 'modifiers',
      },
    });
    if (modifier) {
      newData.push({
        ...modifier,
        name: modifier.name,
        modifierGroupName: modifier.name,
      });
      setMenuItemModifiers(newData);
    }
  };

  const onDeleteItem = async () => {
    setShowLoading(true);
    try {
      await dispatch(
        removeRestaurantMenuItem({
          id: restaurantId || restaurant.restaurantId,
          itemId,
        }),
      ).unwrap();
      await dispatch(
        fetchRestaurantMenuItems(restaurantId || restaurant.restaurantId),
      ).unwrap();
      setShowLoading(false);
      toast.show({
        placement: 'top',
        duration: 2000,
        render: () => {
          return (
            // <DishToast
            //   title="Success"
            //   message="Menu item has been successfully remove"
            //   variant="success"
            // />
            showSuccessMessage(
              'Success',
              'Menu item has been successfully remove',
            )
          );
        },
        onCloseComplete() {
          navigation.goBack();
        },
      });
    } catch (error) {
      setShowLoading(false);
      captureErrorException(error);
    }
  };

  const getProps = () => {
    return {
      restaurantId,
      itemId,
      menuItem,
      menu,
      menuDetails,
      action,
      isChecked,
      showLoading,
      setShowLoading,
      onSubmit,
      onAddMenuItem,
      control,
      singleFilePicker,
      openCamera,
      largeImagePath,
      onAddPhoto,
      CustomActionSheet,
      service,
      setService,
      setLargeImagePath,
      menuItemCategories,
      setMenuItemCategories,
      menuItemModifiers,
      setMenuItemModifiers,
      toggleSwitch,
      onSelectCategories,
      onSelectModifiers,
      onRemoveCategory,
      onRemoveModifier,
      isVegan,
      isVegetarian,
      isGlutenFree,
      isHot,
      isCold,
      isUnheated,
      setIsVegetarian,
      setIsVegan,
      setIsGlutenFree,
      setIsCold,
      setIsHot,
      setIsUnheated,
      temperature,
      setTemperature,
      onDeleteItem,
    };
  };

  // @ts-ignore
  return <MenuItemDetailsView {...getProps()} />;
};

export default MenuItemDetails;
