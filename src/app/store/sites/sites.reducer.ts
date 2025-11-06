import { createReducer, on } from '@ngrx/store';
import { createSite } from './sites.action';
import { Site } from '../../model/site';

export const initialState: Site[] = [];

export const siteReducer = createReducer(
  initialState,
  on(createSite, (state, action) => {
    return [action.site, ...state];
  })
);
