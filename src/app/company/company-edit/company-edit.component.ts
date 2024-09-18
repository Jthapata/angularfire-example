import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.css'
})
export class CompanyEditComponent implements OnInit {
  company$: Observable<Company | any>;

  constructor(private companyService: CompanyService) {
    this.company$ = this.companyService.getCompanyObservable();
  }

  ngOnInit() {
  }

  saveCompany(company: Company) {
    this.companyService.saveCompany(company);
  }

  editCompany() {
    this.companyService.editCompany({phone: '123-456-7890'});
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }
}
