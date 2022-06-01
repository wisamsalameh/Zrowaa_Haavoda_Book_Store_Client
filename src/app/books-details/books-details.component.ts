import { Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { ZrowaaHaavodaService } from '../zrowaa-haavoda.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IBookData } from '../model/ZrowaaHaavodaa.model';
import { ToastrService } from 'ngx-toastr';

type Nullable<T> = T | null;
@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.css']
})
export class BooksDetailsComponent implements OnInit {

  booksData_Arr: MatTableDataSource<IBookData> | [] = [];
  displayedColumns: string[] = [
    'price',
    'description',
    'name',
    'id',
  ];
  clickedRows = new Set<IBookData>();
  selectedIndx = 0;
  AddOrEditClicked: boolean = false;
  bookDataObj: Nullable<IBookData> = null;
  style: string = "display:none";
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) empTbSort: MatSort

  constructor(private zrowaaHaavodaService: ZrowaaHaavodaService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadPersonsData();
  }

  loadPersonsData() {

    this.zrowaaHaavodaService
      .loadBooksData()
      .pipe(
        tap((arrayOfBooksData: IBookData[]) => {
          this.booksData_Arr = new MatTableDataSource<IBookData>(
            arrayOfBooksData
          );

          this.booksData_Arr.sort = this.empTbSort;
          this.booksData_Arr.paginator = this.paginator;

        }))
      .subscribe({
        next: (resData) => { },
        error: (error) => {
          console.log(error);
          this.toastr.error("Failed to retrieve the book list", "");
        },
      });
  }

  ClickHandler(element: IBookData) {

    this.selectedIndx = element.id;
    this.bookDataObj = element;
    this.zrowaaHaavodaService.subjectEdit$.next(this.bookDataObj);

  }

  ClickHandlerDelete() {
    this.zrowaaHaavodaService
      .DeleteBook(this.selectedIndx)
      .pipe(
        tap((object: any) => {
          if (object["success"]) {
            this.toastr.success("Book was deleted successfully", "");
            this.loadPersonsData();
            this.selectedIndx = 0;
            this.bookDataObj = null;
            this.zrowaaHaavodaService.subjectAdd$.next(this.bookDataObj);
            this.style = "display:none";
          } else {
            this.toastr.error("Failed to delete a book", "");
          }
        }))
      .subscribe({
        next: (resData) => { },
        error: (error) => {
          console.log(error);
          this.toastr.error("Failed to delete a book", "");
        },
      });

  }

  ClickHandlerEdit() {
    this.AddOrEditClicked = true;
    this.style = "display:inline";
    this.zrowaaHaavodaService.subjectEdit$.next(this.bookDataObj);
  }


  ClickHandlerAdd() {
    this.AddOrEditClicked = true;
    this.selectedIndx = 0;
    this.bookDataObj = null;
    this.style = "display:inline";
    this.zrowaaHaavodaService.subjectAdd$.next(this.bookDataObj);
  }

  closeBookDetails() {
    this.style = "display:none";
  }

  refreshDataGridAdd() {
    this.loadPersonsData();
  }

  refreshDataGridEdit(event: IBookData) {
    this.bookDataObj = event;
    this.loadPersonsData();
  }

}
