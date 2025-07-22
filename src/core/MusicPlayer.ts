import { ISong } from "@types/index";
import { EPlayerType, IBasePlayer } from "./types";
import store from "@redux/store";
import {
  handleNextSong,
  handlePause,
  handlePlay,
  handleToggleMute,
  handleUpdateCurrentTime,
} from "@redux/PlayerSlice";
import { Howl } from "howler";
import { toast } from "react-toastify";
import { saveCurrentTime } from "@utils/SaveTime";
class MusicPlayer implements IBasePlayer {
  type = EPlayerType.CORE;
  private static instance: MusicPlayer | null = null;
  player: Howl | null = null;
  ready = false;
  paused = true;
  duration = 0;
  muted = false;
  volume = 100;
  currentTime = 0;
  rafId: number | null = null;
  timeIntervalId: ReturnType<typeof setInterval> | null = null;
  constructor({
    volume,
    muted,
    paused,
    currentTime,
    player,
  }: {
    volume?: number;
    muted?: boolean;
    paused?: boolean;
    currentTime?: number;
    player?: Howl | null;
  }) {
    this.player = player || null;
    this.ready = false;
    this.paused = paused || true;
    this.volume = volume || 100;
    this.muted = muted || false;
    this.rafId = null;
    this.currentTime = currentTime || 0;
  }
  static getInstance() {
    if (!MusicPlayer.instance) {
      throw new Error(
        "MusicPlayer instance is not initialized. Please create an instance first.",
      );
    }
    return MusicPlayer.instance;
  }
  static initialize({
    volume,
    muted,
    paused,
    currentTime,
    player,
  }: {
    volume?: number;
    muted?: boolean;
    paused?: boolean;
    currentTime?: number;
    player?: Howl | null;
  }) {
    if (!MusicPlayer.instance) {
      MusicPlayer.instance = new MusicPlayer({
        volume: volume || 100,
        muted: muted || false,
        paused: paused || true,
        currentTime: currentTime || 0,
        player: player || null,
      });
    }
    return MusicPlayer.instance;
  }
  static updateInstance({
    volume,
    muted,
    paused,
    currentTime,
    player,
  }: {
    volume?: number;
    muted?: boolean;
    paused?: boolean;
    currentTime?: number;
    player?: Howl | null;
  }) {
    if (!MusicPlayer.instance) {
      throw new Error(
        "MusicPlayer instance is not initialized. Please create an instance first.",
      );
    }
    MusicPlayer.instance.volume = volume || MusicPlayer.instance.volume;
    MusicPlayer.instance.muted = muted || MusicPlayer.instance.muted;
    MusicPlayer.instance.paused = paused || MusicPlayer.instance.paused;
    MusicPlayer.instance.currentTime =
      currentTime || MusicPlayer.instance.currentTime;
    MusicPlayer.instance.player = player || MusicPlayer.instance.player;
  }
  startProgressTracker() {
    if (!this.player) return;
    this.timeIntervalId = setInterval(() => {
      if (this.player && this.player.playing()) {
        const seek = this.player.seek() || 0;
        this.setCurrentTime(seek);
      }
    }, 5000);
    const update = () => {
      if (this.player && this.player.playing()) {
        const seek = this.player.seek() || 0;
        this.currentTime = seek;
        store.dispatch(handleUpdateCurrentTime(seek));
        this.rafId = requestAnimationFrame(update);
      }
    };
    update();
  }
  cancelProgressTracker() {
    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
      this.timeIntervalId = null;
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  isSongPlaying(): boolean {
    return this.player ? this.player.playing() : false;
  }
  setVolume(volume: number) {
    if (this.player) {
      this.player.volume(volume);
    }
  }
  setCurrentTime(time: number) {
    this.currentTime = time;
    if (this.player) {
      this.player.seek(time);
    }
  }
  loadSong(
    songData: Partial<ISong>,
    {
      startTime = 0,
      volume,
      muted,
      autoplay = false,
    }: {
      startTime: number;
      volume?: number;
      muted?: boolean;
      autoplay?: boolean;
    },
  ) {
    // Cleanup previous player completely
    if (this.player) {
      this.player.stop(); // Stop playback first
      this.player.unload(); // Then unload
      this.cancelProgressTracker();
      this.player = null; // Clear reference
    }
    // Force garbage collection hint
    if (typeof window !== "undefined" && (window as any).gc) {
      (window as any).gc();
    }

    this.player = new Howl({
      src: [songData.audios?.[0].url || ""],
      html5: false,
      volume: (volume || this.volume) / 100,
      autoplay: autoplay, // Always false to prevent pool exhaustion
      preload: true,
      pool: 1, // Limit to 1 instance per Howl
      onload: () => {
        if (startTime > 0) {
          this.player?.seek(startTime);
        }
        this.player?.volume((volume || this.volume) / 100);
        this.player?.mute(muted || this.muted);
        this.duration = songData.duration ?? this.player?.duration() ?? 0;
        saveCurrentTime(0);
      },
      onplay: () => {
        saveCurrentTime(this.player?.seek() || 0);
        this.ready = true;
        this.paused = false;
        this.startProgressTracker();
        store.dispatch(handlePlay());
      },
      onpause: () => {
        saveCurrentTime(this.player?.seek() || 0);
        this.paused = true;
        this.cancelProgressTracker();
        store.dispatch(handlePause());
      },
      onend: () => {
        saveCurrentTime(this.player?.seek() || 0);
        this.cancelProgressTracker();
        store.dispatch(handlePause());
        store.dispatch(handleNextSong());
      },
      onseek: () => {
        store.dispatch(handleUpdateCurrentTime(this.player?.seek() || 0));
        saveCurrentTime(this.player?.seek() || 0);
      },
      onloaderror: (_id: number, error: unknown) => {
        store.dispatch(handlePause());
        toast.error(`Error loading song: ${String(error)}`);
      },
      onplayerror: (_id: number, error: unknown) => {
        store.dispatch(handlePause());
        const errorMessage = String(error);
        if (errorMessage.includes("user interaction")) {
          toast.error(
            "Please click play to start the music. Browser requires user interaction for audio playback.",
          );
        } else {
          toast.error(`Error playing song: ${errorMessage}`);
        }
      },
    });
  }
  mute() {
    this.player?.volume(0);
    this.muted = true;
  }
  unMute() {
    this.player?.volume(this.volume / 100);
    this.muted = false;
  }
  play() {
    if (!this.player) return;
    this.player.play();
  }
  pause() {
    if (!this.player) return;
    this.player.pause();
  }
  seek(time: number) {
    if (this.player) {
      this.player.seek(time);
    }
  }
  clear() {
    if (this.player) {
      this.player.unload();
      this.player = null;
      this.ready = false;
      this.paused = true;
      this.duration = 0;
      this.currentTime = 0;
      this.cancelProgressTracker();
    }
  }
  // Add cleanup method
  destroy() {
    if (this.player) {
      this.player.stop();
      this.player.unload();
      this.player = null;
    }
    this.cancelProgressTracker();
  }
}

export default MusicPlayer;
