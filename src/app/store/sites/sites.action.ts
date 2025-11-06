import { createAction, props } from '@ngrx/store';
import { Site } from '../../model/site';

export const createSite = createAction('[Site] Create', props<{ site: Site }>());
