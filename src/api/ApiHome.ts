import { IArtist, IPlaylist, ISong, IThemeAndGenre } from "@types/index.ts";
import {
  dbArtists,
  dbMusicTrendingYtb,
  dbRecommend,
  dbTop100,
  dbTopPlaylist,
} from "src/services/db";

async function getSongsRecommended(): Promise<ISong[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return dbRecommend;
}

async function getTop100(): Promise<IPlaylist[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return dbTop100;
}

async function getMusicTrendingYtb(): Promise<ISong[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return dbMusicTrendingYtb;
}

async function getTopArtistFavourite(): Promise<Partial<IArtist>[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return dbArtists;
}

async function getTopGenre(): Promise<IThemeAndGenre[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  return dbTopPlaylist;
}

const ApiHome = {
  getSongsRecommended,
  getTop100,
  getMusicTrendingYtb,
  getTopArtistFavourite,
  getTopGenre,
};

export default ApiHome;
