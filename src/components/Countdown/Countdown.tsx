import { useEffect, useState } from "react";
import style from "./Countdown.module.scss";

const WeddingCountdown = () => {
  const calculateTimeLeft = () => {
    // Local time: 00:00 on 21st June 2026 (BST if DST is active)
    const weddingDate = new Date(2026, 5, 21, 0, 0, 0);

    const now = new Date(); // Also local time

    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <h2>🎉 It's your wedding day!</h2>;
  }

  return (
    <div className={style.countdown}>
      <p className={style.date}>
        <strong>
          <span>Sunday, 21st June 2026</span>
        </strong>
      </p>
      <div className={style.timeCards}>
        <div className={style.timeCard}>
          <span className={style.timeDisplay}>{timeLeft.days}</span>
          <span>days</span>
        </div>
        <div className={style.timeCard}>
          <span className={style.timeDisplay}>{timeLeft.hours}</span>
          <span>hours</span>
        </div>
        <div className={style.timeCard}>
          <span className={style.timeDisplay}>{timeLeft.minutes}</span>
          <span>mins</span>
        </div>
        <div className={style.timeCard}>
          <span className={style.timeDisplay}>{timeLeft.seconds}</span>
          <span>secs</span>
        </div>
      </div>
    </div>
  );
};

export default WeddingCountdown;
