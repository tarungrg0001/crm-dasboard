import { createSelector } from '@ngrx/store';
import { Site } from '../../model/site';

export const getSites = (state: { sites: Site[] }) => state.sites;

export const getSite = (site: number) =>
  createSelector(getSites, (sites) => sites.find((s) => site === s.id));

export const noOfSites = (state: { sites: Site[] }) => state.sites.length;
