import {IRestaurant} from '@/api/generic';

export type SearchResultStateType = {
  searchResult: IRestaurant[];
  loadingSearchResult: boolean;
  recentSearch: string[];
};
