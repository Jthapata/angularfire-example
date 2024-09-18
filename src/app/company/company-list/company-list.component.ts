import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit{
  public companies$: Observable<Company[]> | undefined;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompaniesObservable();
  }

}
