import WeddingCountdown from "../Countdown/Countdown";
import AuthLayout from "../Layout/AuthLayout";
import style from "./Hero.module.scss";

const Hero = () => (
  <>
    <h1 className={style.header}>
      Save the Date
      <br />
      Norma & Corey
    </h1>
    <AuthLayout title="Norma and Corey's Wedding" wrapperClass={style.wrapper}>
      <div className={style.body}>
        <p>We’re getting married!</p>
        <br />
        <p>
          Join us in the beautiful Yorkshire Dales for a summer celebration full
          of colour, love, and laughter.
        </p>
      </div>
    </AuthLayout>
    <p>Formal invitation to follow.</p>
    <WeddingCountdown />
  </>
);

export default Hero;
