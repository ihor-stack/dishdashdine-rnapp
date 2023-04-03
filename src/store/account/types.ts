import {IUser} from '@/api/user';

export type AccountStateType = {
  showAddCardSuccess: boolean;
  currentUser: IUser | null;
  loadingCurrentUser: boolean;
  isUpdatingUser: boolean;
  currentUserCoordinate: {
    latitude: number;
    longitude: number;
  } | null;
  currentUserAddress: string | null;
  isLoadingCurrentUserAddress: boolean;
  currentUserDistance: number;
  deviceToken: string | null;
  willUpdate: boolean | null;
};
