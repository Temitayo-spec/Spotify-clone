/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistAtom } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { useRouter } from "next/router";

const colors = [
  "from-indigo-500",
  "from-pink-500",
  "from-yellow-500",
  "from-green-500",
  "from-purple-500",
  "from-blue-500",
  "from-red-500",
];

const Center = () => {
  const { data: session, status } = useSession() as any;
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null) as any;
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom) as any;

  useEffect(() => {
    return setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    const getPlaylist = async () => {
      await spotifyApi
        .getPlaylist(playlistId)
        .then((data: any) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log(err));
    };

    getPlaylist();
  }, [spotifyApi, playlistId, setPlaylist]);
  const router = useRouter();

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => {
            signOut();
            router.replace("/login");
          }}
          className="flex items-center bg-black space-x-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
        >
          {session?.user?.image ? (
            <Image
              className="rounded-full h-5 w-5 border-white border-2"
              src={session?.user?.image}
              width={40}
              height={40}
              layout="fixed"
              alt=""
            />
          ) : (
            <div className="rounded-full bg-gray-400 flex items-center justify-center h-8 w-8">
              <AiOutlineUser className="h-5 w-5" />
            </div>
          )}
          <h2>{session?.user?.name}</h2>
          <HiChevronDown className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-60 w-60 shadow-5xl"
        />
        <div>
          <p className="text-sm font-bold">PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Center;
