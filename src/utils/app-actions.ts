import {setIsAuthenticated} from '@/store/authentication';
import {clearAccountStore} from '@/store/account';
import {clearAddresses} from '@/store/address';
import {clearWallets} from '@/store/my-wallet';
import {clearMyReviews} from '@/store/my-reviews';
import {clearMyOrders} from '@/store/order';
import {clearRestaurants} from '@/store/restaurants';
import {clearRecentSearch, clearSearchState} from '@/store/search';
import {clearTaxonomy} from '@/store/taxonomy';
import {resetHomeState} from '@/store/home';
import storage from '@/utils/storage';
import BackgroundTimer from 'react-native-background-timer';
import {CommonActions} from '@react-navigation/native';

export const forceSignOut = async (dispatch: any, navigation?: any) => {
  dispatch(setIsAuthenticated(false));
  dispatch(clearAccountStore());
  dispatch(clearAddresses());
  dispatch(clearWallets());
  dispatch(clearMyReviews());
  dispatch(clearMyOrders());
  dispatch(clearRestaurants());
  dispatch(clearRecentSearch());
  dispatch(clearSearchState());
  dispatch(clearTaxonomy());
  dispatch(resetHomeState());

  await storage.clearStorage();

  BackgroundTimer.stopBackgroundTimer();

  if (navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Onboarding', params: {screen: 'Welcome'}}],
      }),
    );
  }
};
