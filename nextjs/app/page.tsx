'use client';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './page.module.css';
import PlayListItem from '@/components/PlayList/PlayListItem';
import PlayListAction from '@/components/PlayList/PalyAction';
import PlayList from '@/components/PlayList/PlayList';
import { useEffect, useState } from 'react';
import PlayBar from '@/components/PlayBar';
import { Howl, Howler } from 'howler';
import { search } from '@/apis/musicApi';
import { isEmpty } from '@/utils/common';
import { IPaging } from '@/interfaces/page';
import { IMusicSearchResult } from '@/interfaces/search';

let howler: Howl;
export default function Home() {
  const [searchPaging, setSearchPaging] = useState<IPaging>({
    pages: 1,
    count: 20,
  });
  const [searchList, setSearchList] = useState<IMusicSearchResult[]>([]);
  const [playList, setPlayList] = useState<IMusicSearchResult[]>([]);
  const [currentMusic, setCurrentMusic] = useState<IMusicSearchResult | null>(
    null
  );
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  function setMetadata() {
    if ('mediaSession' in navigator && currentMusic) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentMusic.name,
        artist: currentMusic.artist,
        album: currentMusic.album,
        artwork: [
          {
            src: '/files/cover?id=' + currentMusic.coverId,
            sizes: '500x500',
            type: 'image/png',
          },
        ],
      });
    }
  }

  function nextMusic() {
    const index = playList.findIndex((x) => x.id === currentMusic!.id);
    const playListCount = playList.length;
    if (index >= 0 && index < playListCount - 1) {
      setCurrentMusic(playList[index + 1]);
    } else {
      handlePause();
    }
  }

  function prevMusic() {
    const index = playList.findIndex((x) => x.id === currentMusic!.id);
    if (index != 0) {
      setCurrentMusic(playList[index - 1]);
    } else {
      handlePause();
    }
  }

  useEffect(() => {
    if (currentMusic) {
      howler?.unload();
      howler = new Howl({
        src: 'files/music?id=' + currentMusic.id,
        format: ['mp3'],
        html5: true,
      });

      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', function () {
          howler.play();
        });
        navigator.mediaSession.setActionHandler('pause', function () {
          howler.pause();
        });
        navigator.mediaSession.setActionHandler('previoustrack', function () {
          prevMusic();
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
          nextMusic();
        });
      }

      howler.on('load', () => {
        setMetadata();
        handlePlay();
      });

      howler.on('end', () => {
        setPlaying(false);
        nextMusic();
      });
    }
  }, [currentMusic]);

  async function handleSearch(value: string) {
    setSearchLoading(true);
    const data = await search({ ...searchPaging, query: value });
    setSearchList(data);
    setSearchLoading(false);
  }

  function handlePlaySingle(musicId: number) {
    let music = playList.find((x) => x.id === musicId);
    if (music) {
      setCurrentMusic(music);
    } else {
      music = searchList.find((x) => x.id === musicId);
      if (music) {
        setPlayList([music]);
        setCurrentMusic(music);
      }
    }
  }

  function handlePlayAll() {
    setPlayList(searchList);
    setCurrentMusic(searchList[0]);
  }

  function handleNext() {
    nextMusic();
  }

  function handlePause() {
    setPlaying(false);
    howler.pause();
  }

  function handlePlay() {
    setPlaying(true);
    howler.play();
  }

  return (
    <main className={styles.container}>
      <PlayBar
        onNext={handleNext}
        onPause={handlePause}
        onPlay={handlePlay}
        playing={playing}
        music={currentMusic}
        // coverId={currentMusic.coverId}
        // title={currentMusic.name}
        // description={`${currentMusic.artist} - ${currentMusic.name}`}
      />
      <SearchBar searching={searchLoading} onSearch={handleSearch} />
      {searchList.length > 0 && <PlayListAction onPlayAll={handlePlayAll} />}
      <PlayList>
        {searchList.map((x) => (
          <PlayListItem
            key={x.id}
            title={x.name}
            description={`${x.artist} - ${x.name}`}
            onClickLeft={() => handlePlaySingle(x.id)}
          />
        ))}
      </PlayList>
    </main>
  );
}
