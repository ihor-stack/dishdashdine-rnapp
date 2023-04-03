import AppPromoService from '@/api/appPromo';
import {IAppPromo} from '@/api/generic';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchAppPromo = createAsyncThunk<IAppPromo[]>(
  'restaurant/getAppPromo',
  async () => {
    const response: IAppPromo[] = await AppPromoService.getAppPromo();
    return response;
  },
);
