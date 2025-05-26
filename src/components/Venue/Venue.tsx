import BrushRevealImage from '../ImageBrushStrokes/BrushRevealImage';
import style from './Venue.module.scss';

const Venue = () => {
    return (
        <div className="content">
        <h2>Venue</h2>
        <div className={style.body}>
            <div className={style.copy}>
            <p>Our special day will be hosted at <span>Falcon Manor</span> in Settle, in the Yorkshire Dales.</p>

            <p>Settle is a small, friendly market town in the Yorkshire Dales, surrounded by beautiful countryside and dramatic limestone hills. With its stone buildings, independent shops, and weekly market, it has a warm, relaxed atmosphere – the perfect place to slow down, explore, and enjoy the landscape.</p>
            </div>
            <BrushRevealImage image='venue.png' strokes={4} duration={4} />
        </div>
        </div>
    );
}

export default Venue;