import React, {useEffect, useState} from 'react';
import HelpSupportOrderEntryView from './View';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {IRegister} from '@/api/identity';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToast} from 'native-base';
import {captureErrorException} from '@/utils/error-handler';
import {each} from 'lodash';
import DishToast from '@/components/DishToast';
import SupportTicketService from '@/api/support-ticket';
import {SUPPORT_TICKET_TYPE} from '@/constants';
import {IOrder, IRestaurant} from '@/api/generic';
import {useSelector} from 'react-redux';
import {restaurantSelectors} from '@/store/restaurants';
import {orderSelectors} from '@/store/order';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

interface HelpSupportForm extends IRegister {
  ticketType: number;
  subject: string;
  issue: string;
}

const HelpSupportOrderEntry = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useNavigation<any>();
  const toast = useToast();
  const params = useRoute().params as any;
  const orderId = params?.orderId;
  const order: IOrder = params?.order as IOrder;
  const restaurant = order?.restaurant;

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<HelpSupportForm>({
    resolver: yupResolver(
      yup
        .object({
          subject: yup.string().required('Issue subject is required'),
          issue: yup.string().required('Issue details is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();
    reset();
  }, []);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          showSuccessMessage(
            'Issue Submitted!',
            'Thank you for submitting your issue.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onSubmitIssue = async (data: HelpSupportForm) => {
    setShowLoading(true);
    try {
      const response = await SupportTicketService.createSupportTicket(
        order.id,
        {
          issue: data.issue,
          subject: data.subject,
          ticketType: SUPPORT_TICKET_TYPE[0].code,
        },
      );

      handleSuccessToast();
    } catch (error: any) {
      const errs = error.errors;
      setShowLoading(false);
      captureErrorException(error);
      if (errs) {
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
        return handleErrorToast(error.title);
      }
    }
  };

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.subject) {
        return handleErrorToast(String(errors.subject?.message));
      } else if (errors.issue) {
        return handleErrorToast(String(errors.issue?.message));
      }
    }

    handleSubmit(onSubmitIssue)();
  };

  const getProps = () => {
    return {
      restaurant,
      control,
      onSubmit,
      showLoading,
    };
  };

  return <HelpSupportOrderEntryView {...getProps()} />;
};

export default HelpSupportOrderEntry;
