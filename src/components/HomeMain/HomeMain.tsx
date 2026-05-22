import { FaPlay } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useTracks } from "../../hooks/mutations/useTracksMain";
import style from "./HomeMain.module.css";

export const HomeMain = () => {
  const [page, setPage] = useState(1);
  const { getTracks, tracks, addTracks, isAddingTracks } = useTracks();

  const handleNextPage = () => {
    setPage((page) => (page += 1));
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (page === 1) getTracks();
    else addTracks(page);
  }, [page]);

  if (!tracks.length) {
    return <div className={style.prevLoading}></div>;
  }

  return (
    <div className={style.HomeMain}>
      <div className={style.tracks}>
        {tracks.map((track, index) => (
          <div className={style.track} key={index}>
            <div className={style.track__info}>
              <span className={style.info__name}>{track.name}</span>

              <a href={track.artist.url} className={style.info__artist}>
                {track.artist.name}
              </a>
            </div>

            <div className={style.trackActions}>
              <span className={style.trackActions__duration}>
                {formatDuration(track.duration)}
              </span>

              <button className={`${style.trackActions__playBtn}  ${!track.streamable ? style.notStreamable : ''}`}>
                <FaPlay className={`${style.playBtn__btn}`} />
              </button>
            </div>
          </div>
        ))}
        <div className={style.nextPage}>
          {isAddingTracks ? (
            <div className={style.prevLoading__nextPage}></div>
          ) : (
            <button
              className={style.nextPage__btn}
              onClick={() => handleNextPage()}
              disabled={isAddingTracks}
            >
              see more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
