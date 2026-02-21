import WeddingCountdown from '../Countdown/Countdown';
import AuthLayout from '../Layout/AuthLayout';
import style from './Hero.module.scss';

const Hero = () => {
  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
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
            Everything you need for the day is here, including travel notes, accommodation
            guidance, schedule details, and RSVP.
          </p>
          <button type="button" className={style.rsvpButton} onClick={scrollToRsvp}>
            RSVP Now
          </button>
          <div className={style.manorImage}>
            <img src="/falconManor.png" />
            {/* <BrushRevealImage image="/venue.png" strokes={5} duration={3.4} aspectRatio={1.72} /> */}
            <p className={style.manorCaption}>Falcon Manor, Settle</p>
          </div>
        </div>
      </AuthLayout>
      <WeddingCountdown />
    </>
  );
};

export default Hero;
