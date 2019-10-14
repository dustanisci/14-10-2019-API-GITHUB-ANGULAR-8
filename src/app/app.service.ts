import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGithubUser, GithubUser } from './model/githubuser';
import { map } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public findAll(user: string): Observable<GithubUser[]> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json')
    return this.http.get<IGithubUser[]>(`${environment.github}/${user}/repos`, { headers })
      .pipe(
        map(resp => resp.map(res => {
          return new GithubUser(
            res.name,
            res.private,
            res.html_url,
            res.description,
            res.language
          );
        })
        ),
      );
  }
}
