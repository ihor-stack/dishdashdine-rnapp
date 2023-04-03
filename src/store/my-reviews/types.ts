import {IAppExperience, ISupportTicket} from '@/api/generic';

export type MyReviewsStateType = {
  myReviews: ISupportTicket[];
  loadingMyReviews: boolean;
  appExperiences: IAppExperience[];
  loadingMyAppExperience: boolean;
};
