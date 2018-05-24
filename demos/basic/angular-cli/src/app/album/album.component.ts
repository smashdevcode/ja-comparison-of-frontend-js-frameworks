import { Component, Input, Output, EventEmitter } from '@angular/core';
import Album from '../models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  @Input() album: Album;
  @Output() onViewDetails = new EventEmitter();

  constructor() { }

  viewDetails() {
    this.onViewDetails.emit();
  }
}
