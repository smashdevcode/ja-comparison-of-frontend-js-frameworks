import React from 'react';

function AlbumCover(props) {
  const albumId = props.albumId;
  const albumTitle = props.albumTitle;

  const imageUrl = require(`../img/${albumId}.png`);

  return (
    <figure className="image is-square">
      <img src={imageUrl} alt={albumTitle} />
    </figure>
  );
}

export default function AlbumBox(props) {
  const album = props.album;

  return (
    <div className="column is-half">
      <div className="box">
        <div className="columns">
          <div className="column">
            <AlbumCover albumId={album.id} albumTitle={album.title} />
          </div>
          <div className="column">
            <h2 className="title">{album.title}</h2>
            <h3 className="subtitle">{album.artist}</h3>
            <div>
              Category: {album.category}
            </div>
          </div>      
        </div>      
      </div>
    </div>
  );
}
