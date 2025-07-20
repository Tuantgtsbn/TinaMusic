import { Skeleton } from "@mui/material";

interface ISkeletonSong {
  className?: string;
}

export default function SongCardHomeSkeleton({
  className,
}: ISkeletonSong): JSX.Element {
  return (
    <div
      className={`${className} relative w-full aspect-square group rounded-lg p-3 hover:bg-[#FFFFFF0F]`}
    >
      <Skeleton
        variant="rounded"
        sx={{
          aspectRatio: "1 / 1",
          maxWidth: "100%",
          width: "100%",
          bgcolor: "#752121CC",
          borderRadius: "8px",
        }}
        className="relative rounded-lg flex w-full"
      >
        <div className="w-full bg-white aspect-square rounded-lg" />
      </Skeleton>
    </div>
  );
}
