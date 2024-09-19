import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  public contacts$: Observable<Contact[]> | undefined;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContactsObservable();
  }

}
