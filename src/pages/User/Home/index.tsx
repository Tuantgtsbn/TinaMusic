import MusicRecommend from "./components/MusicRecommend";
import Top100 from "./components/Top100";
import TopGenres from "./components/TopGenres";
import YoutubeTrending from "./components/YoutubeTrending";
import FavoriteArtist from "./components/YoutubeTrending/FavoriteArtist";

const UserHomePage = () => {
  return (
    <div className="pt-[20px] px-8 pb-[96px] mb-[56px]">
      <MusicRecommend />
      <Top100 />
      <TopGenres />
      <YoutubeTrending />
      <FavoriteArtist />
    </div>
  );
};

export default UserHomePage;
