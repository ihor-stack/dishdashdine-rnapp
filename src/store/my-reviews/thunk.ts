import AppExperienceService from '@/api/app-experience';
import {IAppExperience, IReviews} from '@/api/generic';
import ReviewService from '@/api/review';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchMyReviews = createAsyncThunk<IReviews[]>(
  'reviews/getAllReviews',
  async () => {
    const response: IReviews[] = await ReviewService.getAllReviews();
    return response;
  },
);
export const fetchMyAppExperience = createAsyncThunk<IAppExperience[]>(
  'reviews/getAllAppExperience',
  async () => {
    const response: IAppExperience[] =
      await AppExperienceService.getAllAppExperience();
    return response;
  },
);
