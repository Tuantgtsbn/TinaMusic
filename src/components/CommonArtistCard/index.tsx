import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { IArtist } from "src/types";

interface IArtistProps {
  className?: string;
  data: Partial<IArtist>;
}

export default function CommonArtistCard({
  className,
  data,
}: IArtistProps): JSX.Element {
  const navigate = useNavigate();
  const goToDetailArtist = (item: Partial<IArtist>) => {
    if (!item.urlSlug) return;
    navigate(`/artist/${item.urlSlug}`);
  };

  return (
    <div
      className={`relative flex-shrink-0 w-full group rounded-lg p-3 hover:bg-[#FFFFFF0F] cursor-pointer ${className}`}
      onClick={() => goToDetailArtist(data)}
    >
      <div
        className={
          "relative border p-1 overflow-hidden rounded-full border-transparent"
        }
      >
        <div className="relative overflow-hidden rounded-full">
          <img
            src={
              data?.images?.DEFAULT ||
              data?.images?.SMALL ||
              "/image/default-avatar.png"
            }
            alt={data?.name}
            className="w-full aspect-square rounded-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>
      <div className="relative flex flex-col w-full justify-center items-center data-center mt-2 gap-2">
        <span className="text-base flex items-center justify-center font-normal text-[#FFFFFFED] whitespace-nowrap w-full overflow-hidden text-ellipsis">
          {data?.stageName || data?.name}
        </span>
        <div className="flex flex-col ">
          <span className="text-xs font-normal text-[#FFFFFFED] opacity-50">
            {data.totalSongs} Songs
          </span>
          <span className="text-xs font-normal text-[#FFFFFFED] opacity-50">
            {data.totalLikes} Favorites
          </span>
        </div>
        <Button
          variant="contained"
          sx={{
            padding: "8px 14px",
            borderRadius: "16px",
            backgroundColor: "#FF4319",
            textTransform: "capitalize",
          }}
        >
          <div className="h-[20px] flex items-center gap-1">
            <AddIcon />
            <span>Favorite</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
