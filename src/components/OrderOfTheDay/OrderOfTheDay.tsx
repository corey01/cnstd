import style from './OrderOfTheDay.module.scss';

const timeline = [
  { time: '12:00pm', event: 'Ceremony' },
  { time: '12:30pm', event: 'Drinks reception' },
  { time: '3:00pm', event: 'Wedding breakfast' },
  { time: '5:00pm', event: 'Speeches' },
  { time: '7:00pm', event: 'Cutting the cake' },
  { time: '7:15pm', event: 'First dance' },
  { time: '9:30pm', event: 'Pizza' },
  { time: '1:00am', event: 'Carriages' },
];

const OrderOfTheDay = () => {
  return (
    <div className="content">
      <h2>Order of the Day</h2>
      <div className={style.timelineWrap}>
        <div className={style.timelineCopy}>
          <p>
            Please arrive between 11:00am and 11:30am to give yourself time to go to the bar and
            then be seated in good time.
          </p>
          <ul className={style.timeline} aria-label="Order of the day timeline">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 1;

              return (
                <li key={item.time + item.event} className={style.timelineItem}>
                  <span className={`${style.entry} ${isLeft ? style.left : style.right}`}>
                    <span className={style.time}>{item.time}</span>
                    <span className={style.event}>{item.event}</span>
                  </span>
                  <span className={style.dot} aria-hidden="true" />
                </li>
              );
            })}
          </ul>
          <p>Timings are a guide and may shift slightly on the day.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderOfTheDay;
