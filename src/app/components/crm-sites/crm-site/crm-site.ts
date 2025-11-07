import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Resource } from '../../../core/services/resource';
import { SiteService } from '../../../core/services/site';

@Component({
  selector: 'crm-crm-site',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './crm-site.html',
  styleUrl: './crm-site.scss',
})
export class CrmSite implements OnInit {
  public siteForm!: FormGroup;
  public siteContent: any;
  public mode: string = '';
  public noOfSites!: number;
  public id!: number;

  private _resource = inject(Resource);
  private _siteService = inject(SiteService);
  private _activatedRoute = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.siteContent = this._resource.content().site;
    });
    this.checkMode();
  }

  private checkMode() {
    this.id = +this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.mode = this._activatedRoute.snapshot.queryParams['mode'];
    }
  }

  public ngOnInit(): void {
    this._siteService.noOfSites().subscribe((res) => {
      this.noOfSites = res ? res : 0;
    });
    this.initializeForm();
  }

  private initializeForm() {
    this.siteForm = new FormGroup({
      id: new FormControl(this.noOfSites + 1),
      organisation: new FormControl('', this.lengthValidator(3, 20)),
      siteName: new FormControl('', this.lengthValidator(3, 8)),
      ownerName: new FormControl('', this.lengthValidator(3, 20)),
      contact: new FormControl('', this.patternValidator('^[0-9]{10}$')),
      email: new FormControl(
        '',
        this.patternValidator('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')
      ),
      address: new FormControl('', this.lengthValidator(3, 20)),
      city: new FormControl('', this.lengthValidator(3, 20)),
      district: new FormControl('', this.lengthValidator(3, 20)),
      state: new FormControl('', this.lengthValidator(3, 20)),
      pin: new FormControl('', this.patternValidator('^[0-9]{6}$')),
    });
    if (this.id) {
      this._siteService.getSite(this.id).subscribe((res: any) => {
        this.siteForm.setValue(res);
        if (this.mode === 'view') {
          this.siteForm.disable();
        }
      });
    }
  }

  public onSubmit() {
    if (this.siteForm.value) this._siteService.addSite(this.siteForm.value);
  }

  private lengthValidator(minLength: number, maxLength: number) {
    return [Validators.required, Validators.minLength(minLength), Validators.maxLength(maxLength)];
  }

  private patternValidator(pattern: string) {
    return [Validators.required, Validators.pattern(pattern)];
  }
}
