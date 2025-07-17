import {Skeleton} from "@mui/material";

export default function SubTitleSkeleton(): JSX.Element {
  return (
    <Skeleton
      variant="rounded"
      className="flex flex-row justify-between text-[#FFFFFF80] items-center transition-all transition-300 ease-out w-full px-3"
      sx={{
        maxWidth: "100%",
        width: "100%",
        height: "50px",
        bgcolor: "#752121CC",
      }}
    />
  );
}
