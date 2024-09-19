import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  contact$: Observable<Contact | undefined>;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    if (!this.isNew) {
      this.contact$ = contactService.getContactObservable(this.id);
    } else {
      this.contact$ = of({}) as Observable<Contact>;
    }
  }

  ngOnInit() {}

  get id(): string | null {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }
  get isNew(): boolean {
    return this.id === 'new';
  }

  saveContact(contact: Contact) {
    this.contactService.saveContact(contact)
      .then(_ => this.router.navigate(['/contact/all']));
  }
  editContact(contact: Contact) {
    this.contactService.editContact(this.id as string, contact)
      .then(_ => this.router.navigate(['/contact/all']));
  }
  deleteContact() {
    this.contactService.deleteContact(this.id as string)
      .then(_ => this.router.navigate(['/contact/all']));
  }
}
