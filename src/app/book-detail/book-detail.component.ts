import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IBookData } from '../model/ZrowaaHaavodaa.model';
import { ZrowaaHaavodaService } from '../zrowaa-haavoda.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {

  @Output() closeEmitter = new EventEmitter<void>();
  @Output() refresEmitterAdd = new EventEmitter<void>();
  @Output() refresEmitterEdit = new EventEmitter<IBookData>();

  bookDetailGroup: FormGroup;
  booksData: IBookData

  constructor(private zrowaaHaavodaService: ZrowaaHaavodaService, private fb: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.initializeFormControls();

    this.zrowaaHaavodaService.subjectEdit$.subscribe((arrOfBooksData: any) => {

      this.booksData = arrOfBooksData;
      console.log(arrOfBooksData);
      this.bookDetailGroup.controls['name'].setValue(this.booksData.name);
      this.bookDetailGroup.controls['description'].setValue(this.booksData.description);
      this.bookDetailGroup.controls['price'].setValue(this.booksData.price);
    });

    this.zrowaaHaavodaService.subjectAdd$.subscribe((emptyObj: any) => {
      this.bookDetailGroup.markAsUntouched();
      this.booksData = emptyObj;
      this.bookDetailGroup.controls['name'].setValue(null);
      this.bookDetailGroup.controls['description'].setValue(null);
      this.bookDetailGroup.controls['price'].setValue(null);
    });

  }

  initializeFormControls() {
    this.bookDetailGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: ['', [Validators.required]],
    });
  }

  SaveHandler() {

    this.bookDetailGroup.markAllAsTouched();
    if (this.bookDetailGroup.valid) {
      let formGroupValues = this.bookDetailGroup.getRawValue();
      let bookDataObject: IBookData = {
        id: this.booksData != null ? this.booksData.id : 0,
        name: formGroupValues['name'],
        description: formGroupValues['description'],
        price: formGroupValues['price']
      };

      if (bookDataObject.id != 0) { //Update case
        this.zrowaaHaavodaService.UpdateBook(bookDataObject).pipe(
          tap((bookDataObj: IBookData) => {
            if (bookDataObj.id != 0) { // Was Added
              this.toastr.success("Book was updated successfully", "");
              debugger;
              this.refresEmitterEdit.emit(bookDataObj);
            } else {
              this.toastr.error("Failed to update a book", "");
            }
          }))
          .subscribe({
            next: (resData) => { },
            error: (error) => {
              console.log(error);
              this.toastr.error("Failed to update a book", "");
            },
          });

      } else {  //Add case
        this.zrowaaHaavodaService.AddBook(bookDataObject).pipe(
          tap((bookDataObj: IBookData) => {
            if (bookDataObj.id != 0) { // Was Added
              this.toastr.success("Book was added successfully", "");
              this.refresEmitterAdd.emit();
            } else {
              this.toastr.error("Failed to add a book", "");
            }
          }))
          .subscribe({
            next: (resData) => { },
            error: (error) => {
              console.log(error);
              this.toastr.error("Failed to add a book", "");
            },
          });
      }
    }
  }

  CloseHandler() {
    this.closeEmitter.emit();
  }

  preventMinusAnde(event: any) {
    if (event.keyCode == 109 || event.keyCode == 189 || event.keyCode == 107 || event.keyCode == 69) {
      return false;
    } else {
      return true;
    }
  }

}
