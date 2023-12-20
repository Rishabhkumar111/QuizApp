import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeout ,stopProgressBar}) {
  const [remainingTime, setremainingTime] = useState(timeout);
  useEffect(() => {
    console.log("Interval");
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
    console.log("timeOut");
    let timer;
    if (!stopProgressBar) {
        timer = setTimeout(onTimeout, timeout);
    }
    return ()=>{
        clearTimeout(timer);
    }
  }, [onTimeout, timeout, stopProgressBar]);

  useEffect(()=>{
    let timer;
    if(stopProgressBar){
        timer = setTimeout(onTimeout, 2000);
    }
    return ()=>{
        clearTimeout(timer);
    }
  },[stopProgressBar])

  return <progress id="question-time" max={timeout} value={remainingTime} className={stopProgressBar?'answered':undefined}/>;
}
