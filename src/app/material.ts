import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { MatTabsModule} from '@angular/material/tabs';

import { MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableDataSource,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormGroup,
    FormsModule
    
  ],
  exports:[
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableDataSource,
    MatTableModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormGroup,
    FormsModule
  ]
})
export class MaterialModule { }
