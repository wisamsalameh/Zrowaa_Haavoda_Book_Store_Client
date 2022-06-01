import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBookData } from './model/ZrowaaHaavodaa.model';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZrowaaHaavodaService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7111/api/ZrowaaHaavoda/api/ZrowaaHaavoda';

  subjectEdit$ = new Subject();
  subjectAdd$ = new Subject();

  loadBooksData() {
    return this.http
      .get<IBookData[]>(this.BaseURI)
      .pipe(map((arrayOfBooksData) => arrayOfBooksData));
  }

  DeleteBook(selectedIndx: number) {
    return this.http
      .delete<any>(`${this.BaseURI}/${selectedIndx}`)
  }

  AddBook(bookData: IBookData) {
    return this.http
      .post<IBookData>(this.BaseURI, bookData)
  }

  UpdateBook(bookData: IBookData) {
    return this.http
      .patch<IBookData>(this.BaseURI, bookData)
  }

}
