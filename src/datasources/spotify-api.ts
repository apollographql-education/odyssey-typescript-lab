import { RESTDataSource } from "@apollo/datasource-rest";
import { PlaylistModel, TrackModel, SnapshotOrError, ArtistModel } from '../models'

export class SpotifyAPI extends RESTDataSource {
  baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";
  
  async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
    const { playlists: { items } } : { playlists: { items: [] }} = await this.get("browse/featured-playlists");
    return items;
  }

  async getArtist(artistId: string): Promise<ArtistModel>{
    return this.get<ArtistModel>(`artists/${artistId}`);
  }

  getPlaylist(playlistId: string): Promise<PlaylistModel> {
    return this.get<PlaylistModel>(`playlists/${playlistId}`);
  }

  async getTracks(playlistId: string): Promise<TrackModel[]> {
    const response = await this.get<{ items: { track: TrackModel }[] }>(`playlists/${playlistId}/tracks`)
    return response?.items?.map(({track}) => track) ?? [];
  }

  addItemsToPlaylist(input: { playlistId: string, uris: string[] }): Promise<SnapshotOrError> {
    const { playlistId, uris } = input;
    return this.post<SnapshotOrError>(`playlists/${playlistId}/tracks`, {
      params: {
        uris: uris.join(',')
      }
    });
  }

}
