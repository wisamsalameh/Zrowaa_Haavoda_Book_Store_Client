import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
bool : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  GetBooksHandler (){
    debugger;
    this.bool= false;
  }

}
