import React from "react";
import { useRecoilValue } from "recoil";
import { playlistAtom } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistAtom) as any;
  return (
    <div className="px-8 flex flex-col space-y-1 pb-20 text-white">
      {playlist?.tracks?.items?.map((item: any, i: number) => (
        <Song key={item.track.id} track={item} order={i} />
      ))}
    </div>
  );
};

export default Songs;
