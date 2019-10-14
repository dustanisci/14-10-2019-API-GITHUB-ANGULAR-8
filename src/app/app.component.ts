import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GithubUser } from './model/githubuser';
import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  public displayedColumns: string[] = ['project', 'isPrivate', 'url', 'description', 'language'];
  public dataSource = new MatTableDataSource<GithubUser>();

  constructor(
    private httpService: AppService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
  }

  public getGithubData(user: string): void {
    this.spinner.show();
    this.httpService.findAll(user).subscribe(
      (result: GithubUser[]) => {
        this.dataSource = new MatTableDataSource<GithubUser>(result);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
        this.spinner.hide();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(
          error.status === 404 ? 'User Not Found' :
            error.status === 403 ? 'Exceeded the limit. Try it in an hour.' : 'Unable To Load', null,
          {
            timeOut: 1500,
            positionClass: 'toast-top-right',
          });
        this.spinner.hide();
      });
  }

}
