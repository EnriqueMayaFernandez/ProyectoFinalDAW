import React from "react";

export default function LayoutComponent(children) {
  return (
    <>
      <div className="flex flex-col items-center m-6 justify-between">
        {children}
      </div>
    </>
  );
}