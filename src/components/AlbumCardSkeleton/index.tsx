import { Skeleton } from "@mui/material";

interface ISkeletonAlbum {
  className?: string;
  isMultipleInfo?: boolean;
}

export default function AlbumCardSkeleton({
  className,
  isMultipleInfo = true,
}: ISkeletonAlbum): JSX.Element {
  return (
    <div
      className={`${className} relative w-full aspect-square group rounded-lg p-3 hover:bg-[#FFFFFF0F] ${isMultipleInfo && "pt-[calc(10%+12px)]"}`}
    >
      <div className="relative rounded-lg flex w-full">
        <Skeleton
          variant="rounded"
          sx={{
            aspectRatio: "1 / 1",
            maxWidth: "100%",
            width: "100%",
            bgcolor: "#752121CC",
            borderRadius: "9px",
          }}
        >
          <div className="w-full bg-white aspect-square rounded-lg" />
        </Skeleton>
      </div>
      <div className="relative flex flex-col justify-start mt-2">
        <Skeleton
          sx={{
            maxWidth: "100%",
            width: "100%",
            height: "25px",
            bgcolor: "#752121CC",
          }}
        >
          <span className="text-base font-medium text-white">.</span>
        </Skeleton>
        <Skeleton sx={{ maxWidth: "100%", width: "70%", bgcolor: "#752121CC" }}>
          <span className="text-sm font-normal text-[#FFFFFF80]">.</span>
        </Skeleton>
      </div>
    </div>
  );
}
