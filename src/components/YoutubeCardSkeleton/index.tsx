import { Skeleton } from "@mui/material";

interface ISkeletonYoutube {
  className?: string;
}

export default function YoutubeCardSkeleton({
  className,
}: ISkeletonYoutube): JSX.Element {
  return (
    <div
      className={`${className} relative w-full aspect-video p-3 rounded-lg hover:bg-[#FFFFFF0F] cursor-pointer flex flex-col gap-4`}
    >
      <div className="relative rounded-[10px] flex w-full">
        <Skeleton
          variant="rounded"
          sx={{
            aspectRatio: "16 / 9",
            maxWidth: "100%",
            width: "100%",
            bgcolor: "#752121CC",
            borderRadius: "9px",
          }}
        >
          <div className="w-full bg-white aspect-video rounded-lg" />
        </Skeleton>
      </div>
      <div className="flex items-center justify-center w-full gap-2">
        <div className="relative w-[13%]">
          <Skeleton
            variant="circular"
            sx={{
              maxWidth: "100%",
              width: "100%",
              height: "100%",
              bgcolor: "#752121CC",
              aspectRatio: "1 / 1",
            }}
          />
        </div>
        <div className="relative flex flex-col gap-0.5 justify-start w-[87%]">
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
          <Skeleton
            sx={{ maxWidth: "100%", width: "70%", bgcolor: "#752121CC" }}
          >
            <span className="text-sm font-normal text-[#FFFFFF80]">.</span>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
