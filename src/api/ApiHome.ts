import { IArtist, IPlaylist, ISong, IThemeAndGenre } from "@types/index.ts";
import {
  dbTopPlaylist,
} from "src/services/db";
import { fetcher } from "./Fetcher";

function getSongsRecommended(): Promise<ISong[]> {
  return fetcher<ISong[]>({
    url: "/songs/recommended",
    params: {
      page: 0,
      pageSize: 10
    }
  })
}

function getTop100(): Promise<IPlaylist[]> {
  return fetcher<IPlaylist[]>({
    url: "/playlists/top100",
    params: {
      page: 0,
      pageSize: 10
    }
  })
}

function getMusicTrendingYtb(): Promise<ISong[]> {
  return fetcher<ISong[]>({
    url: "/songs/music-trending-ytb",
    params: {
      page: 0,
      pageSize: 10
    }
  })
}

async function getTopArtistFavourite(): Promise<Partial<IArtist>[]> {
  return fetcher<IArtist[]>({
    url: "/artists/top-favourite",
    params: {
      page: 0,
      pageSize: 10
    }
  })
}

async function getTopGenre(): Promise<IThemeAndGenre[]> {
  return fetcher<IThemeAndGenre[]>({
    url: "/genres/top-genres-playlists",
    params: {
      page: 0,
      pageSize: 3,
      playlistType: 0
    }
  });
}

const ApiHome = {
  getSongsRecommended,
  getTop100,
  getMusicTrendingYtb,
  getTopArtistFavourite,
  getTopGenre,
};

export default ApiHome;
