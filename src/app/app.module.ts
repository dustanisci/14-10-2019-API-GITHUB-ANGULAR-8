import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { SphereComponent } from './component/sphere/sphere.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SphereComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ],
  providers: [
    AppService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
