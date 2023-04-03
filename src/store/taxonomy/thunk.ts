import { ITaxonomies } from '@/api/generic';
import TaxonomyService from '@/api/taxonomy';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTaxonomy = createAsyncThunk<ITaxonomies>(
  'taxonomy/getTaxonomy',
  async () => {
    const response: ITaxonomies = await TaxonomyService.getTaxonomy();
    return response;
  },
);
