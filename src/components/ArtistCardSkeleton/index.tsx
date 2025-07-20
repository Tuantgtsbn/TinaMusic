import { Skeleton } from "@mui/material";

interface IArtistSkeleton {
  className?: string;
}

export default function ArtistCardSkeleton({
  className,
}: IArtistSkeleton): JSX.Element {
  return (
    <div
      className={`relative flex-shrink-0 w-full group rounded-lg p-3 hover:bg-[#FFFFFF0F] ${className}`}
    >
      <div className="relative p-1 overflow-hidden rounded-full">
        <Skeleton
          variant="circular"
          sx={{
            aspectRatio: "1 / 1",
            maxWidth: "100%",
            width: "100%",
            bgcolor: "#752121CC",
          }}
        >
          <div className="w-full aspect-square rounded-full">.</div>
        </Skeleton>
      </div>
      <div className="relative flex flex-col w-full justify-center items-center data-center mt-2 gap-[5px]">
        <Skeleton
          sx={{ maxWidth: "100%", width: "100%", bgcolor: "#752121CC" }}
        >
          <span className="text-base flex items-center justify-center font-normal text-[#FFFFFFED] whitespace-nowrap w-full overflow-hidden text-ellipsis">
            .
          </span>
        </Skeleton>
        <Skeleton
          sx={{ maxWidth: "100%", width: "100%", bgcolor: "#752121CC" }}
        >
          <span className="text-xs font-normal text-[#FFFFFFED] opacity-50">
            .
          </span>
        </Skeleton>
        <Skeleton
          variant="rounded"
          sx={{
            maxWidth: "100%",
            width: "62.5%",
            bgcolor: "#752121CC",
            borderRadius: "16px",
            padding: "8px 14px",
            height: "30px",
          }}
        >
          <div className="text-base leading-3">.</div>
        </Skeleton>
      </div>
    </div>
  );
}
