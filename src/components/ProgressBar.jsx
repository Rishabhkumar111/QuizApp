import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout, stopProgressBar }) {
  const [remainingTime, setremainingTime] = useState(timeout);
  useEffect(() => {
    let interval;

    if (!stopProgressBar) {
      interval = setInterval(() => {
        setremainingTime((prev) => {
          return prev - 100;
        });
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [stopProgressBar]);

  useEffect(() => {
    let timer;
    if (!stopProgressBar) {
      timer = setTimeout(onTimeout, timeout);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout, stopProgressBar]);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={stopProgressBar ? "answered" : undefined}
    />
  );
}
