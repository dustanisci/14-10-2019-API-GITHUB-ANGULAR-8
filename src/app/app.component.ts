import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GithubUser } from './model/githubuser';
import { AppService } from './app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    'project',
    'isPrivate',
    'url',
    'description',
    'language',
  ];
  public dataSource = new MatTableDataSource<GithubUser>();

  constructor(
    private httpService: AppService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getGithubData('dustanisci');
  }

  public getGithubData(user: string): void {
    this.spinner.show();
    this.httpService
      .findAll(user)
      .pipe(take(1))
      .subscribe({
        next: (result: GithubUser[]) => {
          this.dataSource = new MatTableDataSource<GithubUser>(result);
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
          this.spinner.hide();
        },
        error: (error: HttpErrorResponse) => {
          this.dataSource = new MatTableDataSource<GithubUser>([]);
          this.toastr.error(
            error.status === 404
              ? 'User Not Found'
              : error.status === 403
              ? 'Exceeded the limit. Try it in an hour.'
              : 'Unable To Load',
            null,
            {
              timeOut: 1500,
              positionClass: 'toast-top-right',
            }
          );
          this.spinner.hide();
        },
      });
  }
}
