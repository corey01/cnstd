import BrushRevealImage from "../ImageBrushStrokes/BrushRevealImage";

const DressCode = () => {
  return (
    <div className="content">
      <h2>
        Accommodation <br />
        &amp; Travel
      </h2>
      <div className="body">
        <div className="copy">
          <p>
            <strong>Settle</strong> is a charming market town with plenty of
            lovely places to stay nearby – from local B&amp;Bs and guesthouses
            to country pubs and inns.
          </p>

          <p>We recommend booking early, as it’s a popular spot in summer.</p>

          <p>
            <strong>Travel:</strong>
          </p>
          <p>
            <strong>By car:</strong> There’s on-site parking available at the
            venue.
          </p>
          <p>
            <strong>By train:</strong> Settle station is on the Leeds–Carlisle
            line and just a 10-minute walk to Falcon Manor.
          </p>
          <p>
            <strong>By air:</strong> The nearest airport is{" "}
            <span>Leeds Bradford (LBA)</span>, around 1 hour by car. <br />
            <span>Manchester (MAN)</span> and <span>Liverpool (LPL)</span>{" "}
            airports are also within 1.5–2 hours' drive.
          </p>
          <p>
            <strong>Taxis:</strong> We’ll list some local numbers closer to the
            time.
          </p>
        </div>
        <BrushRevealImage image="/settle.png" />
      </div>
    </div>
  );
};

export default DressCode;
