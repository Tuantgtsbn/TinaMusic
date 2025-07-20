import { SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@api/QueryKey";
import Slider from "@components/Slider";
import SubTitleSkeleton from "@components/SubTitleSkeleton";
import Subtitle from "@components/Subtitle";
import CommonAlbumCard from "@components/CommonAlbumCard";
import AlbumCardSkeleton from "@components/AlbumCardSkeleton";
import { useNavigate } from "react-router-dom";
import ApiHome from "@api/ApiHome";

export default function Top100() {
  const navigate = useNavigate();

  const {
    data: dataGetTop100,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.ALBUM.GET_TOP_100],
    queryFn: () => ApiHome.getTop100(),
    staleTime: 1000 * 60 * 5,
  });

  const goToSeeMoreTop100 = () => {
    navigate(`/top-100`);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <SubTitleSkeleton />
        <Slider slidesPerView={6.5}>
          {[...Array(7)].map((_, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <AlbumCardSkeleton isMultipleInfo={false} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  if (!isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <Subtitle
          handleClick={goToSeeMoreTop100}
          subtitle="Top 100 Music"
          seeMore={true}
        />
        {isError ? (
          <div className="text-red-500">{error.message}</div>
        ) : (
          dataGetTop100 &&
          dataGetTop100?.length > 0 && (
            <Slider slidesPerView={6.5} spaceBetween={16}>
              {dataGetTop100.map((item, index) => (
                <SwiperSlide key={`top_100_${item.id}`} virtualIndex={index}>
                  <CommonAlbumCard data={item} haveLayer={false} />
                </SwiperSlide>
              ))}
            </Slider>
          )
        )}
      </div>
    );
}
