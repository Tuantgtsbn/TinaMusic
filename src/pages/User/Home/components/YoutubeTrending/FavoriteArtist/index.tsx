import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@api/QueryKey";
import ApiHome from "@api/ApiHome";
import SubTitleSkeleton from "@components/SubTitleSkeleton";
import Slider from "@components/Slider";
import { SwiperSlide } from "swiper/react";
import Subtitle from "@components/Subtitle";
import ArtistCardSkeleton from "@components/ArtistCardSkeleton";
import CommonArtistCard from "@components/CommonArtistCard";

export default function FavoriteArtist() {
  const {
    data: dataArtist,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.ARTIST.GET_TOP_ARTIST_FAVOURITE],
    queryFn: ApiHome.getTopArtistFavourite,
    staleTime: 1000 * 60 * 5,
  });
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        <SubTitleSkeleton />
        <Slider slidesPerView={6}>
          {[...Array(7)].map((_, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <ArtistCardSkeleton />
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
          dataArtist &&
          dataArtist?.length > 0 && (
            <Slider slidesPerView={6} spaceBetween={16}>
              {dataArtist.map((item, index) => (
                <SwiperSlide
                  key={`songs_recommended_${item.id}`}
                  virtualIndex={index}
                >
                  <CommonArtistCard data={item} />
                </SwiperSlide>
              ))}
            </Slider>
          )
        )}
      </div>
    );
}
