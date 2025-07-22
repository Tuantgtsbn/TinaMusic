import ICMuted from "@components/Icon/ICMuted";
import ICVolume from "@components/Icon/ICVolume";
import { handleChangeVolume, handleToggleMute } from "@redux/PlayerSlice";
import { IRootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import MusicPlayer from "src/core/MusicPlayer";

export default function VolumeControl() {
  const { volume, isMuted } = useSelector((state: IRootState) => state.player);
  const dispatch = useDispatch();
  const onToggleMute = () => {
    if (isMuted) {
      MusicPlayer.getInstance().setVolume(volume / 100);
    } else {
      MusicPlayer.getInstance().setVolume(0);
    }
    dispatch(handleToggleMute());
  };
  const onVolumeChange = (newVolume: number) => {
    MusicPlayer.getInstance().setVolume(newVolume / 100);
    dispatch(handleChangeVolume(newVolume));
  };
  return (
    <div className="relative flex items-center group">
      <button
        onClick={onToggleMute}
        className="p-1 text-gray-400 hover:text-white transition-colors"
      >
        {isMuted || volume === 0 ? <ICMuted /> : <ICVolume />}
      </button>

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume}%, #4B5563 ${volume}%, #4B5563 100%)`,
          }}
        />
      </div>
    </div>
  );
}
