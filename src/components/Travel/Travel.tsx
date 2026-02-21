const Travel = () => {
  return (
    <div className="content">
      <h2>Travel</h2>
      <div className="body">
        <div className="copy">
          <p>
            <strong>By car:</strong> Falcon Manor can be accessed via the A65, which runs past
            Settle. From the A65, it is only a short drive to the venue, where there is on-site
            parking available.
          </p>
          <div className="mapBreakout">
            <img
              src="/map.png"
              alt="Map showing location of Falcon Manor in relation to nearby towns and transport links"
              className="mapImage"
            />
          </div>
          <p>
            <strong>By train:</strong> Settle station is on the Leeds–Carlisle line and just a
            10-minute walk to Falcon Manor.
          </p>
          <p>
            <strong>By air:</strong> The nearest airport is <span>Leeds Bradford (LBA)</span>,
            around 1 hour by car. <br />
            <span>Manchester (MAN)</span> and <span>Liverpool (LPL)</span> airports are also within
            1.5–2 hours&apos; drive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Travel;
