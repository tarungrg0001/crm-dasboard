import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createSite } from '../../store/sites/sites.action';
import { Site } from '../../model/site';
import { getSite, getSites, noOfSites } from '../../store/sites/site.selector';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private _store = inject(Store<{ sites: Site[] }>);

  public addSite(site: Site) {
    this._store.dispatch(createSite({ site: site }));
  }

  public deleteSite(id: number) {
    // this._store.dispatch({siteId: id})
  }

  public getSites() {
    return this._store.select(getSites);
  }

  public getSite(siteId: number) {
    return this._store.select(getSite(siteId));
  }

  public noOfSites() {
    return this._store.select(noOfSites);
  }
}
