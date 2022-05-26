import React from "react";
import ReactPlayer from "react-player";

export default function Multimedia() {
  return (
      <div className="min-h-screen w-3/5">
        <div className="border-2 border-space-cadet w-full rounded-md bg-space-cadet p-1">
          <ReactPlayer url={require('../../videos/openingBaki4.mp4')}
          width="100%"
          height="100%"
          controls
          playing
          muted
          />
        </div>
      </div>
  );
}

