import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubUser } from './model/githubuser';
import { map } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apiService: ApiService) {}

  public findAll(user: string): Observable<GithubUser[]> {
    return this.apiService.get(`${environment.github}/${user}/repos`).pipe(
      map((resp) =>
        resp.map((res) => {
          return new GithubUser(
            res.name,
            res.private,
            res.html_url,
            res.description,
            res.language
          );
        })
      )
    );
  }
}
