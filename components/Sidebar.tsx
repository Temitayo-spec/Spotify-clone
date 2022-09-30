import { BsSearch, BsSpotify } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { MdHomeFilled, MdSettings } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const spotifyApi = useSpotify() as any;

  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    const setPlaylist = async () => {
      if (spotifyApi.getAccessToken()) {
        await spotifyApi.getUserPlaylists().then((res: any) => {
          setPlaylists(res.body.items);
        });
      }
    };
    setPlaylist();
  }, [session, spotifyApi]);

  return (
    <div className="pb-36 text-gray-500 p-6 pr-12 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide font-bold lg:text-sm sm:max-w-[12rem] lg:max-w-[30rem] hidden md:inline-flex">
      <div className="space-y-4">
        <div className="flex items-center space-x-4 mb-7 mt-0">
          <BsSpotify className="text-4xl text-white" />
          <h1 className="text-3xl text-white font-bold">Spotify</h1>
        </div>
        {/* <button
          className="
            flex
            items-center
            space-x-2
            hover:text-white
      "
          onClick={() => {
            signOut();
            router.replace("/login");
          }}
        >
          <MdSettings className="h-8 w-8" />
          <p>Log out</p>
        </button> */}
        <button
          className="
            flex
            items-center
            space-x-2
            hover:text-white
      "
        >
          <MdHomeFilled className="h-8 w-8" />
          <p>Home</p>
        </button>
        <button
          className="
            flex
            items-center
            space-x-2
            hover:text-white
      "
        >
          <BsSearch className="h-8 w-8" />
          <p>Search</p>
        </button>
        <button
          className="
            flex
            items-center
            space-x-4
            hover:text-white
      "
        >
          <VscLibrary className="h-8 w-8" />
          <p>Your Library</p>
        </button>
        <hr className="border-gray-500 border-t-[0.2px]" />
        <button
          className="
            flex
            items-center
            space-x-4
            hover:text-white
      "
        >
          <BsFillPlusSquareFill className="h-8 w-8 text-gray-400 " />
          <p>Create Playlist</p>
        </button>
        <button
          className="
            flex
            items-center
            space-x-4
            hover:text-white
      "
        >
          <AiFillHeart className="h-8 w-8 text-gray-300 bg-gradient-to-br from-purple-700 to-white p-1 rounded-sm" />
          <p>Liked Songs</p>
        </button>
        <button
          className="
            flex
            items-center
            space-x-2
            hover:text-white
      "
        >
          <VscLibrary className="h-8 w-8" />
          <p>Your Library</p>
        </button>
        <hr className="border-gray-500 border-t-[0.2px]" />
        {/* Playlist */}
        {playlists.map((playlist: any) => (
          <p
            onClick={() => setPlaylistId(playlist.id)}
            key={playlist.id}
            className="cursor-pointer hover:text-white truncate w-44"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
