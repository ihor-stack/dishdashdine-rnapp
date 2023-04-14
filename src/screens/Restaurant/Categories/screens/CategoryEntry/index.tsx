import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import CategoryEntryView from './View';
import {useToast} from 'native-base';
import DishToast from '@/components/DishToast';
import {useNavigation, useRoute} from '@react-navigation/native';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {captureErrorException} from '@/utils/error-handler';
import {each} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {fetchRestaurantCategories} from '@/store/admin_restaurant/restaurant/thunk';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type CategoryEntryFormType = {
  name: string;
  description: string;
};

const CategoryEntry = () => {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [showLoading, setShowLoading] = useState(false);
  const [assignedMenus, setAssignedMenus] = useState<string[]>([]);
  const restaurant = useSelector(adminRestaurantSelectors.selectRestaurant);

  const params = useRoute().params as any;
  const restaurantId = params?.restaurantId;
  const categoryId = params?.categoryId;
  const category = params?.category;
  const action = params?.action;

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: {errors},
  } = useForm<CategoryEntryFormType>({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required('Category Name is required'),
          description: yup
            .string()
            .required('Category Description is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();
    if (category) {
      reset(category);

      if (category.menus) {
        const mapMenus = category.menus.map(m => m.menuId);
        setAssignedMenus(mapMenus);
      }
    }
  }, [category]);

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
          //   title="Category created"
          //   message="New category details has been created."
          //   variant="success"
          // />
          showSuccessMessage(
            'Category created',
            'New category details has been created.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onCreateCategory = async (data: CategoryEntryFormType) => {
    setShowLoading(true);
    let response_body = {
      ...data,
      assignedMenus,
    };

    try {
      let respones: any = null;
      if (action === 'add') {
        respones = await RestaurantService.createRestaurantCategory(
          restaurantId,
          response_body,
        );
      } else {
        respones = await RestaurantService.updateRestaurantCategory(
          restaurantId,
          categoryId,
          response_body,
        );
      }
      if (respones) {
        await dispatch(fetchRestaurantCategories(restaurantId));
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
        return showWarningMessage('Warning', 'Name is required');
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       <DishToast
        //         title="Warning"
        //         message="Name is required"
        //         variant="warning"
        //       />
        //     );
        //   },
        // });
      } else if (errors.description) {
        return showWarningMessage('Warning', 'Description is required');
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       <DishToast
        //         title="Warning"
        //         message="Description is required"
        //         variant="warning"
        //       />
        //     );
        //   },
        // });
      }
    }

    handleSubmit(onCreateCategory)();
  };

  const getProps = () => {
    return {
      control,
      handleSubmit,
      onSubmit,
      showLoading,
      menus: restaurant.menus,
      assignedMenus,
      setAssignedMenus,
      category,
      action,
    };
  };

  return <CategoryEntryView {...getProps()} />;
};

export default CategoryEntry;
