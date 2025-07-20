import { useState } from "react";
import { ISong } from "src/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface IAlbumCardProps {
  className?: string;
  data: ISong;
}

export default function CommonYoutubeCard({
  className,
  data,
}: IAlbumCardProps): JSX.Element {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        className={`${className} group w-full aspect-video rounded-lg p-3 hover:bg-[#FFFFFF0F] cursor-pointer flex flex-col gap-4`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative">
          <div className="relative flex w-full overflow-hidden rounded-[10px] border-[1.2px] border-[#FFFFFF12]">
            <img
              src={
                data?.images?.DEFAULT ||
                data?.images?.SMALL ||
                "/image/default-music.png"
              }
              alt={data?.name}
              className="w-full aspect-video object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </div>
          {hover && (
            <div className="z-10 absolute flex top-0 left-0 w-full h-full justify-center items-center space-x-3">
              <span className="bg-orange-500 text-white flex rounded-full items-center justify-center h-10 w-10 shadow-[4px_4px_20px_0px_#B112004A,_-4px_-4px_20px_0px_#A708004A]">
                <PlayArrowIcon />
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center justify-center w-full">
          <img
            src={
              data?.artists?.[0]?.images?.SMALL ||
              data?.artists?.[0]?.images?.DEFAULT ||
              "/image/default-avatar.png"
            }
            className="aspect-square rounded-full object-cover w-[13%]"
          />
          <div className="flex flex-col gap-0.5 justify-start w-[87%]">
            <span className="text-base font-medium text-white line-clamp-1">
              {data?.name}
            </span>
            <span className="text-sm font-normal text-[#FFFFFF80] line-clamp-1">
              {data?.artists?.[0]?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
