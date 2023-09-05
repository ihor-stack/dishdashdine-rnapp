import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import {useToast} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import each from 'lodash/each';

import {captureErrorException} from '@/utils/error-handler';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {fetchRestaurantModifiers} from '@/store/admin_restaurant/restaurant/thunk';
import {IAdminRestaurantModifierGroupAvailableParams} from '@/api/admin_restaurant/model';
import ModifierGroupEntryView from '@/screens/Restaurant/ModifierGroups/ModifierGroupEntry/View';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type ModifierGroupEntryType = {
  name: string;
  description: string;
  minSelections: number;
  maxSelections: number;
  availableOptions: IAdminRestaurantModifierGroupAvailableParams[];
  includedInPrice?: number;
  modifierGroupId?: string;
};

const ModifierGroupEntry = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const restaurantId = params?.restaurantId;
  const modifierGroup = params?.group;
  const action = params?.action;

  const [groupItemName, setGroupItemName] = useState<string>('');
  const [groupItemPrice, setGroupItemPrice] = useState<string>('');
  const [groupItemMinSelections, setGroupItemMinSelections] =
    useState<string>('');
  const [groupItemMaxSelections, setGroupItemMaxSelections] =
    useState<string>('');
  const [showLoading, setShowLoading] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<
    IAdminRestaurantModifierGroupAvailableParams[]
  >([]);
  const [restaurantAvailableOptions, setRestaurantAvailableOptions] = useState<
    IAdminRestaurantModifierGroupAvailableParams[]
  >([]);

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: {errors},
  } = useForm<ModifierGroupEntryType>({
    resolver,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const response = await RestaurantService.getRestaurantModifierGroup(
          restaurantId,
          modifierGroup.modifierGroupId,
        );
        if (response) {
          reset(response);

          if (response.availableOptions) {
            setRestaurantAvailableOptions(response.availableOptions);
            setAvailableOptions(response.availableOptions);
          }
        }
      } catch (e) {
        if (__DEV__) {
          console.warn(e);
        }
      }
    };

    clearErrors();

    if (action === 'update') {
      init();
      // reset(modifierGroup);
    } else {
      reset();
    }
  }, [modifierGroup]);

  const onAddGroupItems = () => {
    let newData = [...availableOptions];
    if (
      groupItemName &&
      groupItemPrice &&
      groupItemMinSelections &&
      groupItemMaxSelections
    ) {
      newData.push({
        name: groupItemName,
        price: Number(groupItemPrice),
        minSelections: Number(groupItemMinSelections),
        maxSelections: Number(groupItemMaxSelections),
      });
      setGroupItemName('');
      setGroupItemPrice('');
      setGroupItemMinSelections('');
      setGroupItemMaxSelections('');
      setAvailableOptions(newData);
    }
  };

  const onRemoveGroupItems = (index: number) => {
    let newData = [...availableOptions];
    newData.splice(index, 1);
    setAvailableOptions(newData);
  };

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        showSuccessMessage(
          'Modifier group created',
          'New Modifier group has been created.',
        );
        return null;
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onCreateModifierGroup = async (data: ModifierGroupEntryType) => {
    setShowLoading(true);

    const body = {...data, availableOptions};

    try {
      const response =
        action === 'add'
          ? await RestaurantService.createRestaurantModifiers(
              restaurantId,
              body,
            )
          : await RestaurantService.updateRestaurantModifierGroup(
              restaurantId,
              body.modifierGroupId as string,
              body,
            );

      if (response) {
        await dispatch(fetchRestaurantModifiers(restaurantId));
        handleSuccessToast();
      }
    } catch (error: any) {
      captureErrorException(error);

      each(
        error?.errors,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
    } finally {
      setShowLoading(false);
    }
  };

  const updateRowItem = (
    index: number,
    key: keyof IAdminRestaurantModifierGroupAvailableParams,
    value: string,
  ) => {
    let newData = [...availableOptions];

    let rowItem = newData[index];

    const newRowItem = {...rowItem, [key]: value};

    newData[index] = newRowItem as IAdminRestaurantModifierGroupAvailableParams;

    setAvailableOptions(newData);
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
      } else if (errors.minSelections) {
        return handleErrorToast(String(errors.minSelections?.message));
      } else if (errors.maxSelections) {
        return handleErrorToast(String(errors.maxSelections?.message));
      }
    }

    handleSubmit(onCreateModifierGroup)();
  };

  return (
    <ModifierGroupEntryView
      {...{
        control,
        onSubmit,
        groupItemName,
        setGroupItemName,
        groupItemPrice,
        setGroupItemPrice,
        onAddGroupItems,
        showLoading,
        availableOptions,
        onRemoveGroupItems,
        setGroupItemMinSelections,
        setGroupItemMaxSelections,
        groupItemMinSelections,
        groupItemMaxSelections,
        updateRowItem,
      }}
    />
  );
};

export default ModifierGroupEntry;

const resolver = yupResolver(
  yup
    .object({
      name: yup.string().required('Modifier Group Name is required'),
      description: yup
        .string()
        .required('Modifier Group Description is required'),
      minSelections: yup
        .string()
        .required('Modifier Group Min. selection is required'),
      maxSelections: yup
        .string()
        .required('Modifier Group Max. selection is required'),
      includedInPrice: yup
        .string()
        .required('Modifier Group Max. selection is required'),
    })
    .required(),
);
