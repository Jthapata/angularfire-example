import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, CollectionReference, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>;
  
  constructor(private db: AngularFirestore) { 
    this.contactRef = this.db.doc<Contact>('contacts/contact');
    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  getContactObservable(id: string | null): Observable<Contact | undefined> {
    return this.db.doc<Contact>(`contacts/${id}`).valueChanges()
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getContactsObservable(companyId: string | null): Observable<Contact[]> {
    const filteredContacts = companyId != null ?
      this.db.collection<Contact>('contacts', (ref: CollectionReference) => ref.where('companyId', '==', companyId))
      : this.contactsRef;

    return filteredContacts.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              companyId: item.payload.doc.data().companyId,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }


  saveContact(contact: Contact) {
    return this.contactsRef.add(contact)
      .then(_ => console.log('Success on add'))
      .catch(error => console.log('add', error))
  }
  editContact(id: string, contact: Contact) {
    return this.contactsRef.doc(id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }
  deleteContact(id: string) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on remove'))
      .catch(error => console.log('remove', error));
  }

  private errorHandler(error: any) {
    console.log(error);
    return throwError(error);
  }
}
