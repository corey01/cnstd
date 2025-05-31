import BrushRevealImage from "../ImageBrushStrokes/BrushRevealImage";

const DressCode = () => {
  return (
    <div className="content">
      <h2>Dress Code</h2>
      <div className="body">
        <div className="copy">
          <p>
            Our theme is summer celebration – so we’re encouraging{" "}
            <strong>smart, colourful attire</strong> to match the season and
            setting.
          </p>

          <p>
            Think cheerful florals, bright ties, light suits, or anything that
            feels festive and fun.
          </p>

          <p>
            Dress up in a way that makes you feel great – hats and fascinators
            are welcome but not expected.
          </p>
        </div>
        <BrushRevealImage image="/flowers.png" strokes={5} duration={3} />
      </div>
    </div>
  );
};

export default DressCode;
