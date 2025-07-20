import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@api/QueryKey";
import ApiHome from "@api/ApiHome";
import SubTitleSkeleton from "@components/SubTitleSkeleton";
import Slider from "@components/Slider";
import { SwiperSlide } from "swiper/react";
import SongCardHomeSkeleton from "@components/SongCardHomeSkeleton";
import SongCard from "./components/CardSong";
import Subtitle from "@components/Subtitle";

function MusicRecommend() {
  const {
    data: dataSongs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.SONG.GET_SONGS_RECOMMENDED],
    queryFn: ApiHome.getSongsRecommended,
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <SubTitleSkeleton />
        <Slider slidesPerView={6.5}>
          {[...Array(7)].map((_, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <SongCardHomeSkeleton />
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
          dataSongs &&
          dataSongs?.length > 0 && (
            <Slider slidesPerView={6.5} spaceBetween={16}>
              {dataSongs.map((item, index) => (
                <SwiperSlide
                  key={`songs_recommended_${item.id}`}
                  virtualIndex={index}
                >
                  <SongCard data={item} index={index} />
                </SwiperSlide>
              ))}
            </Slider>
          )
        )}
      </div>
    );
}

export default MusicRecommend;
