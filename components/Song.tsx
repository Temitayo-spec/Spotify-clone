/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { millisToMinutesAndSeconds } from "../lib/time";

type Props = {
  track: any;
  order: number;
};

const Song = ({ track, order }: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <p className="text-white">{order + 1}</p>
        <img
          src={track?.track?.album?.images[0]?.url}
          width={40}
          height={40}
          alt=""
        />
      </div>
      <div className="flex-grow">
        <h1 className="text-white">{track.track.name}</h1>
        <p className="text-gray-400">
          {track.track.artists.map((artist: any) => artist.name).join(", ")}
        </p>
      </div>
      <div className="flex flex-grow items-center space-x-2 justify-between">
        <p className="text-white text-left">{track.track.album.name}</p>
        <p className="text-white">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
};

export default Song;
