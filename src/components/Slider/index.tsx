import {ReactNode, useMemo} from "react";
import {useWindowWidth} from "src/utils/hooks";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Navigation, Virtual} from "swiper/modules";
import {Swiper} from "swiper/react";

interface ISliderProps {
  children: ReactNode;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
}

export default function Slider({
  slidesPerView = 5,
  spaceBetween = 16,
  children,
  ...props
}: ISliderProps): JSX.Element {
  const windowWidth = useWindowWidth();

  const computedSlidesPerView = useMemo(() => {
    switch (true) {
      case windowWidth > 1280:
        return slidesPerView;
      case windowWidth > 1024:
        return 4.5;
      case windowWidth > 924:
        return 4;
      case windowWidth > 768:
        return 3;
      case windowWidth > 624:
        return 2.6;
      case windowWidth > 524:
        return 2.4;
      case windowWidth > 412:
        return 2.2;
      default:
        return 2.2;
    }
  }, [windowWidth, slidesPerView]);

  return (
    <Swiper
      modules={[Virtual, Navigation]}
      slidesPerView={computedSlidesPerView}
      breakpoints={{
        1284: {spaceBetween: 14},
        1024: {spaceBetween: 12},
        768: {spaceBetween: 8},
        624: {spaceBetween: 6},
        568: {spaceBetween: 4},
        0: {spaceBetween: 2},
      }}
      spaceBetween={spaceBetween}
      navigation={true}
      virtual
      {...props}
    >
      {children}
    </Swiper>
  );
}
