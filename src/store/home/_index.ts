import {useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import * as HomeActions from './actions';
import {RootState} from '@/store';

export {HomeActions};

export const useHomeReducer = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.home);

  const actions = useMemo(
    () => bindActionCreators(HomeActions, dispatch),
    [dispatch],
  );

  return {
    state,
    actions,
  };
};
