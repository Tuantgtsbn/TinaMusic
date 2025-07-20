import { useState } from "react";
import { IPlaylist, PlaylistType } from "src/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IAlbumCardProps {
  className?: string;
  data: IPlaylist;
  haveLayer?: boolean;
}

export default function CommonAlbumCard({
  className,
  data,
  haveLayer = true,
}: IAlbumCardProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`${className} relative w-full aspect-square group rounded-lg p-3 hover:bg-[#FFFFFF0F] cursor-pointer ${haveLayer ? "pt-[calc(10%+12px)]" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative rounded-lg flex">
        {haveLayer && (
          <>
            <div className="bg-[#D9D9D91A] absolute left-1/2 bottom-0 -translate-x-1/2 rounded-lg w-4/5 h-[110%]" />
            <div className="bg-[#D9D9D94D] absolute rounded-lg w-[90%] left-1/2 z-5 h-[105%] translate-x-[-50%] bottom-0" />
          </>
        )}
        <div className="w-full h-full aspect-square overflow-hidden rounded-lg">
          <img
            src={
              data?.images?.DEFAULT ||
              data?.images?.SMALL ||
              "/image/default-music.png"
            }
            alt={data?.name}
            className="w-full h-full object-cover rounded-lg transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>
        {hover && (
          <div className="z-10 absolute flex top-0 left-0 w-full h-full justify-center items-center space-x-3">
            <div>
              <span className="bg-orange-500 text-white flex rounded-full items-center justify-center h-10 w-10 shadow-[4px_4px_10px_0px_#B112004F,_-4px_-4px_10.9px_0px_#A708004A]">
                <PlayArrowIcon />
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-col justify-start mt-2">
        <span className="text-base font-medium text-white line-clamp-1">
          {data?.name}
        </span>
        <span className="text-sm font-normal text-[#FFFFFF80] line-clamp-1">
          {data?.type === PlaylistType.PLAYLIST
            ? data?.user?.username
            : data?.artists
                ?.map((artist) => artist?.stageName ?? artist?.name)
                .join(", ")}
        </span>
      </div>
    </div>
  );
}
