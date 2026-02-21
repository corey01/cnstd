import BrushRevealImage from '../ImageBrushStrokes/BrushRevealImage';

const OurWedding = () => {
  const googleCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' +
    encodeURIComponent("Norma & Corey's Wedding") +
    '&dates=20260621T110000Z/20260622T010000Z' +
    '&details=' +
    encodeURIComponent(
      'Ceremony at 12:00pm. Please arrive between 11:00am and 11:30am. Ceremony, food, and evening celebration all take place at Falcon Manor.',
    ) +
    '&location=' +
    encodeURIComponent('Falcon Manor, Settle, North Yorkshire, BD24 9BD') +
    '&ctz=Europe/London';

  return (
    <div className="content">
      <h2>Our Wedding</h2>
      <div className="body bodySplit">
        <div className="copy">
          <p>
            We're planning a relaxed and joyful summer wedding, full of colour, laughter, and
            beautiful Yorkshire scenery.
          </p>

          <p>
            The day will take place at the stunning{' '}
            <strong>
              <span>Falcon Manor</span> in Settle
            </strong>
            , nestled in the heart of the Dales.
          </p>

          <p>
            <strong>Date:</strong> Sunday 21st June 2026
            <br />
            <strong>Guest arrival:</strong> between 11:00am and 11:30am
            <br />
            <strong>Location:</strong>{' '}
            <a target="_blank" href="https://maps.app.goo.gl/ZgugnoPBNFYWKdg26">
              Falcon Manor, Settle, North Yorkshire, BD24 9BD
            </a>
          </p>

          <p>Ceremony, food, and evening celebration all take place at Falcon Manor.</p>

          <p className="calendarLinks">
            <p style={{ marginBottom: 0, fontWeight: 800 }}>Add to your calendar</p>
            <a href={googleCalendarUrl} target="_blank" rel="noreferrer">
              Google Calendar
            </a>
            <br />
            <a href="/norma-corey-wedding.ics" download>
              Download iCal (.ics)
            </a>
          </p>
        </div>
        <BrushRevealImage image="venue.png" strokes={4} duration={4} />
      </div>
    </div>
  );
};

export default OurWedding;
