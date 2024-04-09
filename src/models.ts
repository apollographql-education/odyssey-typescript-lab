// Represents a playlist object returned by the REST API
export type PlaylistModel = {
  id: string;
  name: string;
  description: string;
  tracks: {
    items: {
      track: TrackModel
    }[]
  }
};


// Represents a track object returned by the REST API
export type TrackModel = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  uri: string;
  artists: { id: string; }[]
};

// Represents an artist object returned by the REST API's /artists endpoint
export type ArtistModel = {
  id: string;
  name: string;
  genres: string[];
  uri: string;
  followers: { total: number },
}


// Represents either the error or the snapshot ID sent by the REST API when items are added to a playlist
export type SnapshotOrError = {
  snapshot_id?: string;
  error?: string;
};


export type AddItemsToPlaylistPayloadModel = {
  code: number;
  success: boolean;
  message: string;
  playlistId: string;
}
