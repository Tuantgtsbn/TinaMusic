import CustomTooltip from "@components/CustomTooltip";
import ICLyric from "@components/Icon/ICLyric";
import ICShare from "@components/Icon/ICShare";
import VolumeControl from "./VolumeControl";
import { Divider } from "@mui/material";
import ICQueue from "@components/Icon/ICQueue";

export default function ActionBar() {
  return (
    <div className="flex items-center gap-6 ">
      <div className="cursor-pointer">
        <CustomTooltip title="Song lyrics">
          <ICLyric />
        </CustomTooltip>
      </div>
      <div className="cursor-pointer">
        <CustomTooltip title="Share">
          <ICShare />
        </CustomTooltip>
      </div>
      <div>
        <CustomTooltip title="Volume">
          <VolumeControl />
        </CustomTooltip>
      </div>
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        className="mx-2"
        sx={{ backgroundColor: "white", height: "16px" }}
      />
      <div className="cursor-pointer">
        <CustomTooltip title="Open queue">
          <ICQueue />
        </CustomTooltip>
      </div>
    </div>
  );
}
