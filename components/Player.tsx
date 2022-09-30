/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  currentSongIdState,
  isPlayingState,
  volumeState,
} from "../atoms/songAtom";
import useSong from "../hooks/useSong";
import useSpotify from "../hooks/useSpotify";
import { useEffect, useCallback } from "react";
import {
  HiFastForward,
  HiPause,
  HiPlay,
  HiRefresh,
  HiRewind,
  HiSwitchHorizontal,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession() as any;
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentSongIdState);
  const [isplaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useRecoilState(volumeState);

  const songInfo = useSong() as any;

  const getCurrSong = (): void => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
        console.log("Now playing", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect((): void => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      getCurrSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session, setVolume]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data: any) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debounceAdjustVolume = useCallback(
    (): void => {
      debounce((volume) => {
        spotifyApi.setVolume(volume).catch((err) => {
          console.log(err);
        });
      }, 500);
    },
    [],
  );
  

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>
            {songInfo?.artists.map((artist: any) => artist.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <HiSwitchHorizontal className="button" />
        <HiRewind className="button" />

        {isplaying ? (
          <HiPause className="button" onClick={handlePlayPause} />
        ) : (
          <HiPlay className="button" onClick={handlePlayPause} />
        )}

        <HiFastForward className="button" />
        <HiRefresh className="button" />

        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <HiVolumeOff
            onClick={() => {
              volume > 0 && setVolume(volume - 10);
            }}
            className="button"
          />
          <input
            className="w-14 md:w-28"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value));
            }}
          />

          <HiVolumeUp
            onClick={() => {
              volume < 100 && setVolume(volume + 10);
            }}
            className="button"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
