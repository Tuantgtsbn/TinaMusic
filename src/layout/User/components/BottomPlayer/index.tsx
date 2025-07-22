import { useSelector } from "react-redux";
import SongInfo from "./SongInfo";
import { IRootState } from "@redux/store";
import MusicControl from "./MusicControl";
import ProgressBar from "./ProgressBar";
import ActionBar from "./ActionBar";
import MusicPlayer from "src/core/MusicPlayer";
import { useEffect, useMemo } from "react";
import { ISong } from "@types/index";

function BottomPlayer() {
  const { currentSong, currentTime, volume, isMuted, isPlaying } = useSelector(
    (state: IRootState) => state.player,
  );
  useMemo(() => {
    MusicPlayer.updateInstance({
      volume: volume,
      muted: isMuted,
      paused: !isPlaying,
      currentTime: currentTime || 0,
    });
    if (currentSong) {
      MusicPlayer.getInstance().loadSong(currentSong as Partial<ISong>, {
        startTime: currentTime || 0,
        volume: volume,
        muted: isMuted,
        autoplay: false,
      });
    }
  }, []);
  if (!currentSong) return null;
  return (
    <div
      className="fixed bottom-0 right-0 left-0 bg-slate-500 px-8 py-4 h-[96px] z-10 flex justify-between items-center gap-5"
      style={{
        background: `linear-gradient(to top, rgb(36, 36, 36) 0%, rgb(48, 47, 48) 50%, rgb(62, 62, 62) 100%)`,
      }}
    >
      <SongInfo data={currentSong} />
      <div className="md:w-3/5 mx-20 max-[992px]:mx-0 max-[992px]:items-end">
        <MusicControl />
        <div className="max-sm:hidden">
          <ProgressBar
            currentTime={currentTime || 0}
            duration={currentSong.duration || 0}
            onSeek={(time) => {
              MusicPlayer.getInstance().setCurrentTime(time);
            }}
          />
        </div>
      </div>
      <div className="max-[992px]:hidden">
        <ActionBar />
      </div>
    </div>
  );
}

export default BottomPlayer;
