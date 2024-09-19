import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  public contacts$: Observable<Contact[]> | undefined;
  companies$: Observable<Company[]> | undefined;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService
  ) {
    this.companies$ = companyService.getCompaniesObservable();
  }

  ngOnInit() {
    this.getContacts(null);
  }

  getContacts(companyId: string | null) {
    this.contacts$ = this.contactService.getContactsObservable(companyId);
  }

}
