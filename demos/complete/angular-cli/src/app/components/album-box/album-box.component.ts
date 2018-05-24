import { Component, Input } from '@angular/core';
import Album from '../../models/album';

@Component({
  selector: 'app-album-box',
  templateUrl: './album-box.component.html',
  styleUrls: ['./album-box.component.css']
})
export class AlbumBoxComponent {
  @Input() album: Album;

  constructor() { }

  get imageUrl() {
    return `assets/${this.album.id}.png`;
  }
}
