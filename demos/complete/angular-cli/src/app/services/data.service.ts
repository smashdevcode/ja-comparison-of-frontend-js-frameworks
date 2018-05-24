import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Album from '../models/album';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<string>('http://localhost:3000/categories');
  }

  getAlbums() {
    return this.http.get<Album>('http://localhost:3000/albums');
  }
}
