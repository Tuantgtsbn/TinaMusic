type ImageVariants = {
  SMALL?: string;
  DEFAULT?: string;
};

export enum AudioQualityTypeEnum {
  KBPS_128 = 0,
  KBPS_320 = 1,
}

export enum EArtistType {
  SINGER = 0,
  MUSICIAN = 1,
  SINGER_MUSICIAN = 2,
}

export enum GenderEnum {
  MALE = 0,
  FEMALE = 1,
  UNKNOWN = 2,
}

export enum PlaylistType {
  PLAYLIST = 0,
  ALBUM = 1,
  TOP_100 = 2,
}

export interface IAudio {
  id?: string;
  type?: AudioQualityTypeEnum;
  url?: string;
}

export interface IArtist {
  id: string;
  images: ImageVariants;
  name: string;
  avatar?: string;
  biography?: string;
  debutDate?: string;
  urlSlug?: string;
  company?: string;
  deletedAt?: string;
  type: EArtistType;
  isLiked: boolean;
  totalLikes: number;
  totalSongs: number;
  totalPlaylists: number;
  totalAlbums: number;
  gender: GenderEnum;
  isVerify: boolean;
  createdAt: string;
  updatedAt?: string;
  stageName?: string;
  typeInSong?: number;
}

export enum ESongType {
  SONG,
  YOUTUBE,
}

export enum EThemeAndGenreType {
  THEME = 1,
  GENRE = 0,
}

export interface IPlaylist {
  artists?: Partial<IArtist>[];
  createdAt?: string;
  id: string;
  urlSlug?: string;
  isLiked?: boolean;
  name?: string;
  isPublic?: boolean;
  releaseDate?: string;
  totalDownloads?: number;
  totalListens?: number;
  totalSongs?: number;
  totalShares?: number;
  totalInteractions?: number;
  type?: PlaylistType;
  updatedAt?: string;
  description?: string;
  totalLikes?: number;
  totalDurations?: number;
  images?: ImageVariants;
  songs?: ISong[];
}

export interface ISong {
  artists?: Partial<IArtist>[];
  audios?: IAudio[];
  createdAt?: string;
  duration?: number;
  id: string;
  images?: ImageVariants;
  isLiked?: boolean;
  license?: string;
  lrcLyrics?: string;
  name?: string;
  playlists?: IPlaylist[];
  album?: IPlaylist[];
  releaseDate?: string;
  textLyrics?: string;
  totalAddedToPlaylists?: number;
  totalDownloads?: number;
  position?: number;
  prevPosition?: number;
  totalInteractions?: number;
  keyColor?: string;
  totalLikes?: number;
  totalListens?: number;
  totalShares?: number;
  updatedAt?: string;
  urlSlug?: string;
  ageLimit?: number;
  type: ESongType;
}

export interface IThemeAndGenre {
  id: string;
  name: string;
  images?: ImageVariants;
  urlSlug?: string;
  type: EThemeAndGenreType;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  totalListen?: number;
  totalPlaylist?: number;
  totalSong?: number;
  parentId?: string;
  parentGenre?: IThemeAndGenre;
  subGenresDto?: IThemeAndGenre[];
  parentGenreDto?: IThemeAndGenre;
  nameVi?: string;
  nameLo?: string;
  nameEn?: string;
  playlists?: IPlaylist[];
}
