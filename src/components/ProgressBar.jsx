import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout }) {
  const [remainingTime, setremainingTime] = useState(timeout);
  useEffect(() => {
    console.log("Interval");
    const interval = setInterval(() => {
      setremainingTime((pre) => {
        return pre - 100;
      });
    }, 100);

    return ()=>{
        clearInterval(interval);
    }

  }, []);

  useEffect(() => {
    console.log("timeOut");
    const timer = setTimeout(onTimeout, timeout);

    return ()=>{
        clearTimeout(timer);
    }

  }, [onTimeout, timeout]);

  return <progress id="question-time" max={timeout} value={remainingTime}/>;
}
