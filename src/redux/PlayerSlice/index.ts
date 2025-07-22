import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISong, PlayMode } from "@types/index";
import { dbRecommend } from "src/services/db";
import MusicPlayer from "src/core/MusicPlayer";
import { saveCurrentTime } from "@utils/SaveTime";
interface IPlayerState {
  currentSong?: Partial<ISong>;
  queueList: Partial<ISong>[];
  isPlaying: boolean;
  playMode: PlayMode;
  isShuffle: boolean;
  originalQueueList: Partial<ISong>[];
  suggestedSongs?: Partial<ISong>[];
  isMuted: boolean;
  volume: number;
  currentTime?: number;
}

const initialState: IPlayerState = {
  queueList: dbRecommend,
  isPlaying: false,
  playMode: PlayMode.NORMAL,
  isShuffle: false,
  suggestedSongs: [],
  originalQueueList: dbRecommend,
  isMuted: false,
  volume: 100,
  currentSong: dbRecommend[0] || undefined,
  currentTime: localStorage.getItem("currentTime")
    ? parseFloat(localStorage.getItem("currentTime") || "0")
    : 0,
};

const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addSongsToQueue(state, action: PayloadAction<Partial<ISong>[]>) {
      const newSongs = action?.payload;
      if (!newSongs) return;
      state.queueList.push(...newSongs);
      state.originalQueueList.push(...newSongs);
    },
    playNewSong(state, action: PayloadAction<Partial<ISong>>) {
      const newSong = action?.payload;
      if (!newSong) return;
      state.currentSong = newSong;
      state.isPlaying = true;
    },
    handleNextSong: (state) => {
      const currentIndex = state?.queueList.findIndex(
        (song) => song?.id === state?.currentSong?.id,
      );
      if (currentIndex === -1) {
        state.currentSong = state?.queueList[0];
        state.isPlaying = true;
        MusicPlayer.getInstance().loadSong(
          state?.queueList[0] as Partial<ISong>,
          {
            startTime: 0,
            autoplay: true,
          },
        );
      } else {
        if (currentIndex < state?.queueList.length - 1) {
          state.currentSong = state?.queueList[currentIndex + 1];
          state.isPlaying = true;
          MusicPlayer.getInstance().loadSong(
            state?.queueList[currentIndex + 1] as Partial<ISong>,
            {
              startTime: 0,
              autoplay: true,
            },
          );
        } else if (
          state.playMode === PlayMode.REPEAT ||
          state.playMode === PlayMode.REPEAT_ONE
        ) {
          state.currentSong = state?.queueList[0];
          state.isPlaying = true;
          MusicPlayer.getInstance().loadSong(
            state?.queueList[0] as Partial<ISong>,
            {
              startTime: 0,
              autoplay: true,
            },
          );
        }
      }
      state.currentTime = 0;
    },
    handlePrevSong: (state) => {
      if (!state?.queueList || state?.queueList.length === 0) return;
      let currentIndex = state?.queueList.findIndex(
        (song) => song?.id === state?.currentSong?.id,
      );
      if (currentIndex > 0) {
        currentIndex -= 1;
      } else if (currentIndex === 0) {
        currentIndex = state?.queueList.length - 1;
      }
      state.currentSong = state?.queueList[currentIndex];
      state.isPlaying = true;
      state.currentTime = 0;
      MusicPlayer.getInstance().loadSong(
        state?.queueList[currentIndex] as Partial<ISong>,
        {
          startTime: 0,
          autoplay: true,
        },
      );
    },
    handlePause: (state) => {
      state.isPlaying = false;
    },
    handlePlay: (state) => {
      if (!state.currentSong) return;
      state.isPlaying = true;
    },
    handleChangeVolume: (state, action: PayloadAction<number>) => {
      const newVolume = action?.payload;
      if (newVolume === undefined || newVolume < 0 || newVolume > 100) return;
      if (newVolume === 0) {
        state.volume = 0;
        state.isMuted = true;
      } else {
        state.isMuted = false;
        state.volume = newVolume;
      }
    },
    handleShuffle: (state) => {
      state.isShuffle = true;
      state.originalQueueList = [...state.queueList];
      const newQueueList = [...state.queueList];
      for (let i = newQueueList?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQueueList[i], newQueueList[j]] = [newQueueList[j], newQueueList[i]];
      }
      state.queueList = newQueueList;
    },
    handleUnShuffle: (state) => {
      if (!state.originalQueueList || state.originalQueueList.length === 0)
        return;
      state.isShuffle = false;
      state.queueList = [...state.originalQueueList];
    },
    handleToggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    handleChangePlayMode(state) {
      if (state.playMode === PlayMode.NORMAL) {
        state.playMode = PlayMode.REPEAT;
      } else if (state.playMode === PlayMode.REPEAT) {
        state.playMode = PlayMode.REPEAT_ONE;
      } else {
        state.playMode = PlayMode.NORMAL;
      }
    },
    handleUpdateCurrentTime(state, action: PayloadAction<number>) {
      const newTime = action?.payload;
      if (newTime === undefined || newTime < 0) return;
      state.currentTime = newTime;
    },
  },
});

export const {
  addSongsToQueue,
  playNewSong,
  handleNextSong,
  handlePrevSong,
  handlePause,
  handlePlay,
  handleChangeVolume,
  handleShuffle,
  handleUnShuffle,
  handleToggleMute,
  handleChangePlayMode,
  handleUpdateCurrentTime,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
