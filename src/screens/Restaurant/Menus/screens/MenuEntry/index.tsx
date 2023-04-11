import {
  IAdminRestaurant,
  IAdminRestaurantMenuAvailability,
} from '@/api/admin_restaurant/model';
import {DEFAULT_OPENING_HOURS} from '@/constants';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {
  fetchRestaurantMenus,
} from '@/store/admin_restaurant/restaurant/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {each, filter, find, isArray, isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import EntryMenuView from './View';
import {useToast} from 'native-base';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import moment from 'moment';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type EntryMenuFormType = {
  name: string;
  description: string;
};

type deleteMenuFormType = {
  restaurantId: string;
  menuId: string;
};

const EntryMenu = () => {
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation();
  const [showLoading, setShowLoading] = useState(false);

  const params = useRoute().params as any;
  const restaurantId = params?.restaurantId;
  const menu = params?.menu;
  const menuId = params?.menuId;
  const action = params?.action;

  const [assignedCategories, setAssignedCategories] = useState<string[]>([]);
  const [menuAvailability, setMenuAvailability] = useState<
    IAdminRestaurantMenuAvailability[]
  >([...(DEFAULT_OPENING_HOURS as any)]);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: {errors},
  } = useForm<EntryMenuFormType>({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required('Menu Name is required'),
          description: yup.string().required('Menu Description is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();

    if (action === 'update') {
      reset(menu);

      if (menu.assignedCategories) {
        const mapAssignedCategories = menu.assignedCategories.map((c: any) => {
          return c.categoryId;
        });
        setAssignedCategories(mapAssignedCategories || []);
      }

      const newData: any = DEFAULT_OPENING_HOURS.map(hours => {
        const result = find(
          menu.menuAvailability,
          (res: any) => res.dayOfWeek === hours.dayOfWeek,
        );
        if (!isEmpty(result)) {
          const period = result.availabilityTimePeriods[0];
          return {
            ...hours,
            open: true,
            openTime: period.startTime,
            closeTime: period.endTime,
          };
        } else {
          return hours;
        }
      });
      setMenuAvailability(newData);
    }
  }, [restaurant, action, menu]);

  const onUpdateFormContent = (
    action: string,
    item: IAdminRestaurantMenuAvailability,
    index: number,
    date?: Date,
  ) => {
    let newData: any = [...menuAvailability];
    newData = newData.map(
      (hour: IAdminRestaurantMenuAvailability, idx: number) => {
        if (index === idx) {
          let data: any = {
            ...hour,
          };

          if (action === 'toggle') {
            data.open = !item.open;
          } else if (action === 'open') {
            data = {
              ...data,
              openTimeDate: date,
              openTime: date?.toISOString(),
            };
          } else if (action === 'close') {
            data = {
              ...data,
              closeTimeDate: date,
              closeTime: date?.toISOString(),
            };
          }

          return {
            ...data,
          };
        } else {
          return hour;
        }
      },
    );
    setMenuAvailability(newData);
  };

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          // <DishToast
          //   title="Menu created"
          //   message="New menu details has been created."
          //   variant="success"
          // />
          showSuccessMessage(
            'Menu created',
            'New menu details has been created.',
          )
        );
      },
      onCloseComplete() {
        // navigation.goBack();
        const popAction = StackActions.pop(2);
        navigation.dispatch(popAction);
      },
    });
  };

  const handleSuccessDeleteToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          showSuccessMessage(
            'Menu Deleted',
            'Menu Deleted Successfully.',
          )
        );
      },
      onCloseComplete() {
        const popAction = StackActions.pop(2);
        navigation.dispatch(popAction);
      },
    });
  };

  const onCreateMenu = async (data: EntryMenuFormType) => {
    setShowLoading(true);
    try {
      const mappedAvailability = filter(menuAvailability, {open: true})?.map(
        (avail: any) => {
          return {
            day: avail.dayOfWeek,
            open: moment(new Date(avail.openTime)).format('HH:mm'),
            close: moment(new Date(avail.closeTime)).format('HH:mm'),
          };
        },
      );

      let response = null;

      if (action === 'add') {
        response = await RestaurantService.createRestaurantMenu(restaurantId, {
          ...data,
          assignedCategories,
          menuAvailability: mappedAvailability,
        });
      } else {
        response = await RestaurantService.updateRestaurantMenu(
          restaurantId,
          menuId,
          {
            ...data,
            assignedCategories,
            menuAvailability: mappedAvailability,
          },
        );
      }

      if (response) {
        await dispatch(fetchRestaurantMenus(restaurantId));
        handleSuccessToast();
      } else {
        setShowLoading(false);
      }
    } catch (error: any) {
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      if (isArray(errs)) {
        each(
          errs,
          (
            {description}: {code: string; description: string},
            index: number,
          ) => {
            setTimeout(() => {
              handleErrorToast(description);
            }, 600 * index);
          },
        );
      } else {
        handleErrorToast(error.title);
      }
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
      }
    }
    handleSubmit(onCreateMenu)();
  };

  const onDelete = async() => {
    setShowLoading(true);
    try {
      await RestaurantService.deleteRestaurantMenu(restaurantId, menuId);
      await dispatch(fetchRestaurantMenus(restaurantId));
      handleSuccessDeleteToast();
      setShowLoading(false);
    }catch(error: any) {
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      if (isArray(errs)) {
        each(
          errs,
          (
            {description}: {code: string; description: string},
            index: number,
          ) => {
            setTimeout(() => {
              handleErrorToast(description);
            }, 600 * index);
          },
        );
      } else {
        handleErrorToast(error.title);
      }
    }
  }

  const getProps = () => {
    return {
      showLoading,
      categories: restaurant.categories,
      availability: menuAvailability,
      control,
      handleSubmit,
      onSubmit,
      assignedCategories,
      setAssignedCategories,
      onUpdateFormContent,
      onDelete,
      action
    };
  };

  return <EntryMenuView {...getProps()} />;
};

export default EntryMenu;
