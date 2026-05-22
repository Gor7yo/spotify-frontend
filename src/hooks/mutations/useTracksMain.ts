import { useTrackStore } from "../../store/tracksStore";
import { tracksService } from "../../services/tracksService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useTracks = () => {
  const queryClient = useQueryClient();
  const tracks = useTrackStore((state) => state.tracks);
  const setTracks = useTrackStore((state) => state.setTracks);
  const addTracks = useTrackStore((state) => state.addTracks);
  const clearTracks = useTrackStore((state) => state.clearTracks);

  const getTracksQuery = useQuery({
    queryKey: ["tracks", "initial"],
    queryFn: async () => {
      const tracksData = await tracksService.getChartTopTracks("1", "10");
      setTracks(tracksData);
      return tracksData;
    },
    enabled: true,
  });

  const addTracksMutation = useMutation({
    mutationFn: async (page: number) => {
      const tracksAdd = await tracksService.getChartTopTracks(
        page.toString(),
        "10",
      );
      return tracksAdd;
    },
    onSuccess: (tracksAdd) => {
      addTracks(tracksAdd);
      queryClient.setQueryData(
        ["tracks", "all"],
        (oldData: Track[] | undefined) => {
          return oldData ? [...oldData, ...tracksAdd] : tracksAdd;
        },
      );
    },
    onError: (error) => {
      console.error("Failed to fetch tracks:", error);
    },
  });

  const clearTracksMutation = useMutation({
    mutationFn: async () => {
      clearTracks();
    },
    onSuccess: () => {
      queryClient.setQueryData(["tracks", "all"], []);
    },
  });

  return {
    getTracks: getTracksQuery.refetch,
    tracks,
    isLoading: getTracksQuery.isLoading,
    isError: getTracksQuery.isError,
    error: getTracksQuery.error,

    addTracks: addTracksMutation.mutate,
    addTracksAsync: addTracksMutation.mutateAsync,
    isAddingTracks: addTracksMutation.isPending,

    clearTracks: clearTracksMutation.mutate,

    addError: addTracksMutation.error,
  };
};
