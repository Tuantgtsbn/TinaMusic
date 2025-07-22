import { Icon, IconButton } from "@mui/material";
import { ISong } from "@types/index";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CustomTooltip from "@components/CustomTooltip";

interface SongInfoProps {
  data: Partial<ISong>;
}

function SongInfo({ data }: SongInfoProps) {
  return (
    <div className="flex gap-x-4 sm:min-w-[300px]">
      <div className="cursor-pointer">
        <img
          className="h-[60px] w-[60px] object-cover rounded-lg"
          src={data?.images?.SMALL || data?.images?.DEFAULT}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-around items-start">
        <div className="flex gap-x-2 items-center flex-wrap">
          <p className="max-w-[200px] line-clamp-1 leading-6">{data?.name}</p>
          <div className="flex gap-2 max-[568px]:hidden">
            <CustomTooltip title="Like">
              <IconButton sx={{ padding: "4px" }}>
                <FavoriteIcon
                  sx={{
                    fontSize: "18px",
                    fill: data?.isLiked ? "red" : "none",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                />
              </IconButton>
            </CustomTooltip>
            <CustomTooltip title="Add to playlist">
              <IconButton sx={{ padding: "4px" }}>
                <AddIcon
                  sx={{
                    fontSize: "24px",
                    fill: "white",
                  }}
                />
              </IconButton>
            </CustomTooltip>
          </div>
        </div>
        <div className="text-sm text-[#e8dbdf] max-w-[300px] line-clamp-1">
          {data?.artists?.map((artist, index) => (
            <span
              key={artist.id}
              className="hover:underline hover:cursor-pointer hover:text-sky-500"
            >
              {artist?.stageName}
              {index < (data.artists?.length || 0) - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SongInfo;
