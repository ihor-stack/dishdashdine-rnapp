import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import HelpSupportRefundView from './View';
import * as yup from 'yup';
import {ICard, IOrder} from '@/api/generic';
import {useSelector} from 'react-redux';
import {orderSelectors} from '@/store/order';
import {cardSelectors} from '@/store/my-wallet';
import {useToast} from 'native-base';
import DishToast from '@/components/DishToast';
import {useNavigation, useRoute} from '@react-navigation/native';
import SupportTicketService from '@/api/support-ticket';
import {SUPPORT_TICKET_TYPE} from '@/constants';
import {captureErrorException} from '@/utils/error-handler';
import {each} from 'lodash';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

interface HelpSuportRefundForm {
  issue: any;
  ticketType: number;
}

const HelpSupportRefund = () => {
  const [showLoading, setShowLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<any>();
  const params = useRoute().params as any;
  const order: IOrder = params?.order as IOrder;
  const restaurant = order?.restaurant;
  const mywallets: ICard[] = useSelector(cardSelectors.selectMyWallet);
  const [activeCard, setActiveCard] = useState<ICard>();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<HelpSuportRefundForm>({
    resolver: yupResolver(
      yup
        .object({
          issue: yup.string().required('Issue details is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();
    reset();
  }, []);

  useEffect(() => {
    if (mywallets) {
      const card = mywallets.find(
        item => item.paymentMethodId == order.paymentMethodId,
      );

      if (card) {
        setActiveCard(card);
      }
    }
  }, []);

  const handleErrorToast = (message: string) => {
    // toast.show({
    //   placement: 'top',
    //   duration: 2500,
    //   render: () => {
    //     return (
    //       // <DishToast title="Warning" message={message} variant="warning" />

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
          //   title="Refund request submitted"
          //   message="Thank you for submitting your reguest."
          //   variant="success"
          // />
          showSuccessMessage(
            'Refund request submitted',
            'Thank you for submitting your reguest.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onSubmitRefund = async (data: HelpSuportRefundForm) => {
    setShowLoading(true);
    try {
      const response = await SupportTicketService.createSupportTicket(
        order.id,
        {
          issue: data.issue,
          subject: `Order refund for ${order.reference}`,
          ticketType: SUPPORT_TICKET_TYPE[1].code,
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
      if (errors.issue) {
        return handleErrorToast(String(errors.issue?.message));
      }
    }

    handleSubmit(onSubmitRefund)();
  };

  const getProps = () => {
    return {
      control,
      restaurant,
      order,
      activeCard,
      onSubmit,
    };
  };
  return <HelpSupportRefundView {...getProps()} />;
};

export default HelpSupportRefund;
