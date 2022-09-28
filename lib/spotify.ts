import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-follow-read",
  "user-follow-modify",
  "user-library-read",
].join(",");

const params = {
  scope: scopes,
};

const query = new URLSearchParams(params).toString();

const LoginUrl = `https://accounts.spotify.com/authorize?${query}&response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export { LoginUrl, spotifyApi };
