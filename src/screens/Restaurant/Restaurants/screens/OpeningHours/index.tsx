import {
  IAdminOpeningHours,
  IAdminRestaurant,
} from '@/api/admin_restaurant/model';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import DishToast from '@/components/DishToast';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {fetchOpeningHours} from '@/store/admin_restaurant/restaurant/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {useNavigation} from '@react-navigation/native';
import {find, isEmpty} from 'lodash';
import {useToast} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import OpeningHoursView from './view';
import {DEFAULT_OPENING_HOURS} from '@/constants';
import moment from 'moment';
import {showSuccessMessage} from '@/components/DishFlashMessage';

const OpeningHours = () => {
  const dispatch = useDispatch<any>();
  const [showLoading, setShowLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [openingHours, setOpeningHours] = useState<IAdminOpeningHours[]>([]);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const [hasSetData, setHasSetData] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchOpeningHours(restaurant.restaurantId));
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(restaurant.openingHours)) {
      const newData: any = DEFAULT_OPENING_HOURS.map(hours => {
        const result = find(
          restaurant.openingHours,
          (res: any) => res.dayOfWeek === hours.dayOfWeek,
        );
        if (!isEmpty(result)) {
          return {
            ...hours,
            open: result.open,
            openTime: result.openTime,
            closeTime: result.closeTime,
          };
        } else {
          return hours;
        }
      });
      if (!hasSetData) {
        setHasSetData(true);
        setOpeningHours(newData);
      }
    } else {
      setOpeningHours(DEFAULT_OPENING_HOURS as any);
    }
  }, [restaurant]);

  const onSubmit = () => {
    if (showLoading) {
      return;
    }
    onUpdateOpeningHours(openingHours);
  };

  const onToggleSwith = (item: IAdminOpeningHours, index: number) => {
    let newData: any = [...openingHours];
    newData = newData.map((hour: IAdminOpeningHours, idx: number) => {
      if (index === idx) {
        return {
          ...hour,
          open: !item.open,
        };
      } else {
        return hour;
      }
    });
    setOpeningHours(newData);
  };

  const onOpenChangeDate = (date: Date, index: number) => {
    let newData: any = [...openingHours];
    newData = newData.map((oph: IAdminOpeningHours, idx: number) => {
      if (index === idx) {
        return {
          ...oph,
          openTimeDate: date,
          openTime: date.toISOString(),
        };
      } else {
        return {
          ...oph,
        };
      }
    });
    setOpeningHours(newData);
  };

  const onCloseChangeDate = (date: Date, index: number) => {
    let newData: any = [...openingHours];
    newData = newData.map((clh: IAdminOpeningHours, idx: number) => {
      if (index === idx) {
        return {
          ...clh,
          closeTimeDate: date,
          closeTime: date.toISOString(),
        };
      } else {
        return {
          ...clh,
        };
      }
    });
    setOpeningHours(newData);
  };

  const onUpdateOpeningHours = async (data: IAdminOpeningHours[]) => {
    setShowLoading(true);
    try {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      const payload: any = data.map(pay => {
        return {
          dayOfWeek: pay.dayOfWeek,
          open: pay.open,
          openTime: pay.open ? pay.openTime : moment(d).toISOString(),
          closeTime: pay.open ? pay.closeTime : moment(d).toISOString(),
        };
      });
      const response = await RestaurantService.updateOpeningHours(
        restaurant.restaurantId,
        payload,
      );
      if (response) {
        setShowLoading(false);
        await dispatch(fetchOpeningHours(restaurant.restaurantId)).unwrap();
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return (
              // <DishToast
              //   title="Opening hours updated"
              //   message="You have successfully updated the opening hours."
              //   variant="success"
              // />
              showSuccessMessage(
                'Opening hours updated',
                'You have successfully updated the opening hours.',
              )
            );
          },
          onCloseComplete() {
            navigation.goBack();
          },
        });
      }
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
    }
  };

  const getProps = () => {
    return {
      onSubmit,
      showLoading,
      schedules: openingHours,
      onToggleSwith,
      onOpenChangeDate,
      onCloseChangeDate,
    };
  };

  return <OpeningHoursView {...getProps()} />;
};

export default OpeningHours;
