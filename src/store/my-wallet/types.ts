import {ICard, ICardStartCapture} from '@/api/generic';

export type CardState = {
  myWallet: ICard[] | any[];
  cardCapture: ICardStartCapture | null;
  loadingWallet: boolean;
};
