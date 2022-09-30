import { atom } from "recoil";

export const currentSongIdState = atom({
  key: "currentSongState" as string,
  default: null as any,
});

export const isPlayingState = atom({
  key: "isPlayingState" as string,
  default: false as boolean,
});

export const volumeState = atom({
  key: "volumeState" as string,
  default: 50 as number,
});
