import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentSongIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

export const useSong = () => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentSongIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `
                https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        );
        const trackInfoJson = await trackInfo.json();
        setSongInfo(trackInfoJson);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSong;
