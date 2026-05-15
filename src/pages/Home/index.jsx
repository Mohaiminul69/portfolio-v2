import { useRef, useState } from "react";
import bgVideo from "@assets/videos/background.webm";
import PageLoader from "../../components/PageLoader";
import AudioController from "./../../components/AudioController/index";
import SidepanelSlider from "../../components/sidepanel-slider";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import Sidenav from "../../components/Sidenav";

export default function Home() {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.1);

  function handleSoundChoice(enableSound) {
    const video = videoRef.current;
    if (enableSound && video) {
      video.currentTime = 0;
      video.muted = false;
      video.volume = volume;
      setMuted(false);
    }
    setFadingOut(true);
    setTimeout(() => setLoading(false), 500);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const wasM = video.muted;
    video.muted = !video.muted;
    if (wasM) {
      video.currentTime = 0;
      video.volume = volume;
    }
    setMuted(video.muted);
  }

  function handleVolume(val) {
    setVolume(val);
    const video = videoRef.current;
    if (!video) return;
    video.volume = val;
    if (val === 0) {
      video.muted = true;
      setMuted(true);
    } else if (video.muted) {
      video.muted = false;
      setMuted(false);
    }
  }

  return (
    <div className="bg-wrap">
      <video
        ref={videoRef}
        className="bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.playbackRate = 0.99;
          }
        }}
      />

      {loading ? (
        <PageLoader
          fadingOut={fadingOut}
          handleSoundChoice={handleSoundChoice}
        />
      ) : (
        <>
          <Header />
          <SidepanelSlider />
          <AudioController
            muted={muted}
            volume={volume}
            handleVolume={handleVolume}
            toggleMute={toggleMute}
          />
          <Sidenav />
          <Footer />
        </>
      )}
    </div>
  );
}
