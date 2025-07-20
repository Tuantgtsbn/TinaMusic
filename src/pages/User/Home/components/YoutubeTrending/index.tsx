import { SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@api/QueryKey";
import Slider from "@components/Slider";
import Subtitle from "@components/Subtitle";
import SubTitleSkeleton from "@components/SubTitleSkeleton";
import CommonYoutubeCard from "@components/CommonYoutubeCard";
import YoutubeCardSkeleton from "@components/YoutubeCardSkeleton";
import ApiHome from "@api/ApiHome";

export default function YoutubeTrending() {
  const {
    data: dataTrendingYoutube,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.SONG.GET_TRENDING_YOUTUBE],
    queryFn: ApiHome.getMusicTrendingYtb,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <SubTitleSkeleton />
        <Slider slidesPerView={5}>
          {[...Array(7)].map((_, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <YoutubeCardSkeleton />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    );
  if (!isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <Subtitle subtitle="What to listen today" seeMore={false} />
        {isError ? (
          <div className="text-red-500">{error.message}</div>
        ) : (
          dataTrendingYoutube &&
          dataTrendingYoutube?.length > 0 && (
            <Slider slidesPerView={5} spaceBetween={16}>
              {dataTrendingYoutube.map((item, index) => (
                <SwiperSlide
                  key={`songs_recommended_${item.id}`}
                  virtualIndex={index}
                >
                  <CommonYoutubeCard data={item} />
                </SwiperSlide>
              ))}
            </Slider>
          )
        )}
      </div>
    );
}
