"use client";

import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { LaunchFilm } from "@/remotion/LaunchFilm";

export default function Home() {
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      player.seekTo((player.getCurrentFrame() + 1) % 300);
    }, 1000 / 30);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="launch-page">
      <Player
        ref={playerRef}
        component={LaunchFilm}
        durationInFrames={300}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        loop
        controls={false}
        acknowledgeRemotionLicense
        className="launch-player"
      />
    </main>
  );
}
