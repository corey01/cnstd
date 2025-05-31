import BrushRevealImage from "../ImageBrushStrokes/BrushRevealImage";

const OurWedding = () => {
  return (
    <div className="content">
      <h2>Our Wedding</h2>
      <div className="body">
        <div className="copy">
          <p>
            We're planning a relaxed and joyful summer wedding, full of colour,
            laughter, and beautiful Yorkshire scenery.
          </p>

          <p>
            The day will take place at the stunning{" "}
            <strong>
              <span>Falcon Manor</span> in Settle
            </strong>
            , nestled in the heart of the Dales.
          </p>

          <p>
            <strong>Date:</strong> Sunday 21st June 2026
            <br />
            <strong>Location:</strong>{" "}
            <a target="_blank" href="https://maps.app.goo.gl/ZgugnoPBNFYWKdg26">
              Falcon Manor, Settle, North Yorkshire, BD24 9BD
            </a>
          </p>

          <p>
            A full schedule and RSVP details will be included with your formal
            invitation.
          </p>
        </div>
        <BrushRevealImage image="venue.png" strokes={4} duration={4} />
      </div>
    </div>
  );
};

export default OurWedding;
