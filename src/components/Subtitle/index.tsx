import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ISubtitleProps {
  subtitle: string;
  seeMore?: boolean;
  handleClick?: () => void;
}

export default function Subtitle({
  subtitle,
  seeMore = true,
  handleClick,
}: ISubtitleProps) {
  return (
    <div className="flex justify-between items-center gap-2">
      <p className="font-semibold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white w-3/4 line-clamp-2">
        {subtitle}
      </p>
      {seeMore && (
        <button
          className="flex justify-end md:gap-2 gap-1 sm:gap-1.5 text-[#FF4319] text-xs md:text-sm lg:text-base font-normal items-center w-1/4"
          onClick={handleClick}
        >
          See more <ChevronRightIcon />
        </button>
      )}
    </div>
  );
}
