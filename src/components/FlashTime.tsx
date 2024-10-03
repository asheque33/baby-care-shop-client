"use client";
import { getFormattedTime } from "@/utils/getFormattedTime";
import React, { useEffect, useState } from "react";

const FlashTime = () => {
  const [time, setTime] = useState(3 * 24 * 60 * 60 * 1000);
  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000);
    }, 1000);
  }, [time]);

  return <div>{getFormattedTime(time)}</div>;
};

export default FlashTime;
