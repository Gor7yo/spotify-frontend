import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Artist {
  name: string;
  url: string;
}

interface Track {
  name: string;
  duration: number;
  playcount: number;
  listeners: number;
  url: string;
  streamable: boolean;
  artist: Artist;
}

interface TracksStore {
  tracks: Track[];

  setTracks: (tracks: Track[]) => void;
  addTracks: (tracks: Track[]) => void;
  getTracks: () => Track[];
  clearTracks: () => void;
}

export const useTrackStore = create<TracksStore>()(
  persist(
    (set, get) => ({
      tracks: [],

      setTracks: (tracks) =>
        set({
          tracks,
        }),

      addTracks: (tracksAdd) => {
        set({
          tracks: [...get().tracks, ...tracksAdd],
        });
      },

      getTracks: () => get().tracks,

      clearTracks: () =>
        set({
          tracks: [],
        }),
    }),
    {
      name: "tracks-storage",
      partialize: (state) => ({
        tracks: state.tracks,
      }),
    },
  ),
);
