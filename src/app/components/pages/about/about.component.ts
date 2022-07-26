import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserFromApi } from 'src/app/interfaces/user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  private readonly apiUrlGitHub: string = 'https://api.github.com/users/otaviusedano'
  private getApi!: Observable<any>
  dataFromGit!: UserFromApi
  dataFromGit$!: Observable<UserFromApi>

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getApi = this.http.get(this.apiUrlGitHub)
    this.dataFromGit$ = this.getApi.pipe()
  }
}
