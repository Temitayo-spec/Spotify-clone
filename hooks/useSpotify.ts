import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session, status } = useSession() as any;

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
    }

    const userSession = session?.user as any;

    spotifyApi.setAccessToken(userSession?.accessToken);

    // return () => {
    //   spotifyApi.resetAccessToken();
    // };
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
