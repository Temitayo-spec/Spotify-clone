/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import { currentSongIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

type Props = {
  track: any;
  order: number;
};

const Song = ({ track, order }: Props) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentSongIdState);
  const [isplaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };
  return (
    <div onClick={playSong} className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p className="text-white">{order + 1}</p>
        <img
          src={track?.track?.album?.images[0]?.url}
          width={40}
          height={40}
          alt=""
        />
        <div className="">
          <h1 className="text-white w-36 lg:w-44 truncate">
            {track.track.name}
          </h1>
          <p className="text-gray-400">
            {track.track.artists.map((artist: any) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="text-white hidden md:inline">{track.track.album.name}</p>
        <p className="text-white">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default Song;
