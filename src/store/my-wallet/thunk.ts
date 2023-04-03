import CardService from '@/api/card';
import {ICard, ICardStartCapture} from '@/api/generic';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const initiateCardCapture = createAsyncThunk<ICardStartCapture>(
  'card/orderAddress',
  async () => {
    const response: ICardStartCapture = await CardService.cardCapture();
    return response;
  },
);

export const getAllCards = createAsyncThunk<ICard[]>(
  'card/getAllCards',
  async () => {
    const response = await CardService.getAllCards();
    return response;
  },
);

export const removePaymentMethod = createAsyncThunk<any, string>(
  'card/removePaymentMethod',
  async paymentMethodId => {
    const response = await CardService.removeCard(paymentMethodId);
    return response;
  },
);
