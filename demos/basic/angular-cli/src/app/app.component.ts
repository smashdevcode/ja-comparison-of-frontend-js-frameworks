import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Album from './models/album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  albums: Album[] = [];

  constructor(private http: HttpClient) { }

  handleViewDetails() {
    alert('View details!');
  }

  ngOnInit(): void {
    this.http.get<Album[]>('http://localhost:3000/albums')
      .subscribe(data => this.albums = data);
  }
}
