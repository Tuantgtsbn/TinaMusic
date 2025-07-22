import { ISong } from "@types/index";
export enum EPlayerType {
  CORE,
  YOUTUBE,
}
export interface IBasePlayer {
  readonly type: EPlayerType;
  ready: boolean;
  paused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  timeIntervalId: ReturnType<typeof setInterval> | null;

  isSongPlaying(data?: ISong): boolean;
  loadSong: (
    songData: ISong,
    {
      startTime,
      volume,
      muted,
      autoplay,
    }: {
      startTime: number;
      volume?: number;
      muted?: boolean;
      autoplay?: boolean;
    },
  ) => void;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  clear: () => void;
}
