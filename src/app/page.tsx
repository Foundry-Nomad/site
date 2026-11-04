"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Player, type PlayerRef } from "@remotion/player";
import { LaunchFilm } from "@/remotion/LaunchFilm";
import { SiteHeader } from "./_components/site-header";

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
      <SiteHeader />
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
      <nav className="legal-links" aria-label="Legal">
        <Link href="/terms">Terms</Link>
        <span aria-hidden="true">·</span>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </main>
  );
}
