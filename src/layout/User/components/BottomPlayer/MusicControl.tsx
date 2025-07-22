import CustomTooltip from "@components/CustomTooltip";
import ICPrevious from "@components/Icon/ICPrevious";
import ICShuffle from "@components/Icon/ICShuffle";
import { IRootState } from "@redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PlayMode } from "@types/index";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ICNext from "@components/Icon/ICNext";
import ICRepeat from "@components/Icon/ICRepeat";
import { Badge } from "@mui/material";
import {
  handleChangePlayMode,
  handleNextSong,
  handlePrevSong,
  handleShuffle,
  handleUnShuffle,
} from "@redux/PlayerSlice";
import MusicPlayer from "src/core/MusicPlayer";
import { useMemo } from "react";
function MusicControl() {
  const { isShuffle, isPlaying, playMode } = useSelector(
    (state: IRootState) => state.player,
  );
  const dispatch = useDispatch();
  const onToggleShuffle = () => {
    if (isShuffle) {
      dispatch(handleUnShuffle());
    } else {
      dispatch(handleShuffle());
    }
  };
  const onClickPlayMode = () => {
    dispatch(handleChangePlayMode());
  };
  const onTogglePlay = () => {
    if (isPlaying) {
      MusicPlayer.getInstance().pause();
    } else {
      MusicPlayer.getInstance().play();
    }
  };
  const onClickPrevious = () => {
    dispatch(handlePrevSong());
  };
  const onClickNext = () => {
    dispatch(handleNextSong());
  };
  const titleBtnRepeat = useMemo(() => {
    switch (playMode) {
      case PlayMode.NORMAL:
        return "Enable repeat all";
      case PlayMode.REPEAT:
        return "Enable repeat one";
      case PlayMode.REPEAT_ONE:
        return "Disable repeat";
      default:
        return "";
    }
  }, [playMode]);
  return (
    <div className="flex sm:gap-x-8 gap-x-4 items-center justify-center">
      <div className="max-[568px]:hidden" onClick={onToggleShuffle}>
        <CustomTooltip title={isShuffle ? "Disable shuffle" : "Enable shuffle"}>
          <div className="cursor-pointer">
            <ICShuffle color={isShuffle ? "white" : "gray"} />
          </div>
        </CustomTooltip>
      </div>
      <CustomTooltip title={"Play previous"}>
        <div onClick={onClickPrevious} className="cursor-pointer">
          <ICPrevious />
        </div>
      </CustomTooltip>
      <CustomTooltip title={isPlaying ? "Pause" : "Play"}>
        <div
          onClick={onTogglePlay}
          className="w-[40px] h-[40px] rounded-full bg-orange-500 shadow-[4px_4px_20px_0px_#B112005C,_-4px_-4px_20px_0px_#A708004A] flex items-center justify-center cursor-pointer hover:shadow-[4px_4px_20px_0px_#B112005C,_-4px_-4px_20px_0px_#A708004A] transition-shadow"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </div>
      </CustomTooltip>
      <CustomTooltip title={"Play next"}>
        <div onClick={onClickNext} className="cursor-pointer">
          <ICNext />
        </div>
      </CustomTooltip>
      <div className="max-[568px]:hidden" onClick={onClickPlayMode}>
        <CustomTooltip title={titleBtnRepeat}>
          <div className="cursor-pointer">
            {playMode === PlayMode.NORMAL ? (
              <ICRepeat color="gray" />
            ) : playMode === PlayMode.REPEAT ? (
              <ICRepeat color="white" />
            ) : (
              <Badge badgeContent={1} color="error">
                <ICRepeat color="white" />
              </Badge>
            )}
          </div>
        </CustomTooltip>
      </div>
    </div>
  );
}

export default MusicControl;
