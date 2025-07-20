import CustomTooltip from "@components/CustomTooltip";
import { useState } from "react";
import { ISong } from "src/types";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
interface SongCardProps {
  data: ISong;
  index: number;
}

export default function SongCard({ data }: SongCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <CustomTooltip
      title={
        <div className="relative flex flex-col justify-start mt-2">
          <span className="text-base font-medium text-white line-clamp-1">
            {data?.name}
          </span>
          <span className="text-sm font-normal text-[#FFFFFF80] line-clamp-1">
            {data?.artists
              ?.map((artist) => artist?.stageName ?? artist?.name)
              .slice(0, 2)
              .join(", ")}
          </span>
        </div>
      }
      placement="bottom"
    >
      <div
        className="rounded-lg hover:bg-[#ffffff0f] p-3 w-full cursor-pointer select-none group"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={
              data?.images?.DEFAULT ||
              data?.images?.SMALL ||
              "./image/default-music.png"
            }
            alt={data?.name}
            className="object-cover w-full aspect-square transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          {hover && (
            <div className="absolute flex top-0 left-0 w-full h-full justify-center items-center">
              <PlayArrowIcon className="h-9 w-9" />
            </div>
          )}
        </div>
      </div>
    </CustomTooltip>
  );
}
