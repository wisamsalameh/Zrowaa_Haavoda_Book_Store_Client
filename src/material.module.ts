import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
 
@NgModule({
  exports: [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class MaterialModule {}
