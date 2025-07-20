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

export default function TopGenres() {
  const navigate = useNavigate();

  const {
    data: dataTopGenres,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.GENRE.GET_TOP_GENRE],
    queryFn: () => ApiHome.getTopGenre(),
    staleTime: 1000 * 60 * 5,
  });

  const goToSeeMoreTop100 = (urlSlug: string | undefined) => {
    if (!urlSlug) return;
    navigate(`/topic/${urlSlug}`);
  };

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <SubTitleSkeleton />
        <Slider slidesPerView={5}>
          {[...Array(7)].map((_, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <AlbumCardSkeleton isMultipleInfo={false} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <Subtitle subtitle="Top Genres" seeMore={false} />
        <div className="text-red-500">{error?.message}</div>
      </div>
    );
  if (dataTopGenres && dataTopGenres?.length > 0)
    return dataTopGenres.map((item) => (
      <div
        key={item.id}
        className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5"
      >
        <Subtitle
          handleClick={() => goToSeeMoreTop100(item.urlSlug)}
          subtitle={item.name}
          seeMore={true}
        />
        <Slider slidesPerView={5}>
          {item.playlists?.map((item, index) => (
            <SwiperSlide key={item.id} virtualIndex={index}>
              <CommonAlbumCard data={item} haveLayer={false} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    ));
  return null;
}
