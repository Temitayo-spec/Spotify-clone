import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi, LoginUrl } from "../../../lib/spotify";

const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setRefreshToken(token.refreshToken);
    spotifyApi.setAccessToken(token.accessToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
      authorization: LoginUrl,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  // A database is optional, but required to persist accounts in a database
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : null,
        };
      }
      // setting the type to any to avoid type error
      const accessTokenExpires = token?.accessTokenExpires as any;
      if (accessTokenExpires && accessTokenExpires < Date.now()) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // setting the type to any to avoid type error
      const userSession = session as any;
      userSession.user.accessToken = token.accessToken;
      userSession.user.refreshToken = token.refreshToken;
      userSession.user.username = token.username;

      return session;
    },
  },
});
