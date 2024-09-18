import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>;
  
  constructor(private db: AngularFirestore) { 
    this.companyRef = this.db.doc<Company>('companies/company');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompanyObservable(id: string | null): Observable<Company | undefined> {
    return this.db.doc<Company>(`companies/${id}`).valueChanges()
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            }
          })
        }),
        catchError(this.errorHandler)
      )
  }

  saveCompany(company: Company) {
    return this.companiesRef.add(company)
      .then(_ => console.log('Success on add'))
      .catch(error => console.log('add', error))
  }
  editCompany(id: string, company: Company) {
    return this.companiesRef.doc(id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }
  deleteCompany(id: string) {
    return this.companiesRef.doc(id).delete()
      .then(_ => console.log('Success on remove'))
      .catch(error => console.log('remove', error));
  }

  private errorHandler(error: any) {
    console.log(error);
    return throwError(error);
  }
}
