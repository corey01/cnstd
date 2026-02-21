import WeddingCountdown from '../Countdown/Countdown';
import AuthLayout from '../Layout/AuthLayout';
import style from './Hero.module.scss';

const Hero = () => (
  <>
    <p className={style.inviteLine}>You&apos;re invited to</p>
    <h1 className={style.header}>
      Norma &amp; Corey's
      <br />
      Wedding
    </h1>
    <AuthLayout title="Norma and Corey's Wedding" wrapperClass={style.wrapper}>
      <div className={style.body}>
        <p>Our invitations are out and we can’t wait to celebrate with you.</p>
        <br />
        <p>
          Everything you need for the day is here, including travel notes, accommodation guidance,
          schedule details, and RSVP.
        </p>
        <div className={style.manorImage}>
          <img src="/falconManor.png" />
          <p className={style.manorCaption}>Falcon Manor, Settle</p>
        </div>
      </div>
    </AuthLayout>
    <WeddingCountdown />
  </>
);

export default Hero;
