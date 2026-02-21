import BrushRevealImage from '../ImageBrushStrokes/BrushRevealImage';

type StayOption = {
  name: string;
  website?: string;
  location?: string;
  phone?: string;
  notes?: string;
  email?: string;
};

const stayOptions: StayOption[] = [
  {
    name: 'The Golden Lion',
    website: 'https://www.goldenlionsettle.co.uk',
    location: 'Duke Street, Settle',
    phone: '01729 822203',
  },
  {
    name: 'The Royal Oak',
    website: 'https://www.royaloak-settle.co.uk',
    location: 'Kirkgate, Settle',
    phone: '01729 822561',
  },
  {
    name: 'No 3 at Settle (Self Catering)',
    website: 'https://www.no3atsettle.co.uk',
    phone: '01729 825673',
    notes: 'Minimum 3-night stay.',
  },
  {
    name: 'Settle Lodge',
    website: 'https://www.settlelodge.co.uk',
    location: 'Duke St, Settle, North Yorkshire, BD24 9AS',
    phone: '01729 823258',
  },
  {
    name: 'Craven Arms',
    website: 'https://www.craven-arms.co.uk',
    location: 'Brackenber Lane, Giggleswick, Settle, Yorkshire, BD24 0EA',
    phone: '01729 825627',
  },
  {
    name: 'Harts Head',
    website: 'https://www.hartsheadhotel.co.uk',
    location: 'Belle Hill, Giggleswick, North Yorkshire, BD24 0BA',
    phone: '01729 822086',
  },
  {
    name: 'The Royal Hotel',
    website: 'https://www.royalhotelkirkbylonsdale.co.uk',
    location: 'Kirkby Lonsdale, Cumbria',
    phone: '01524 271966',
  },
  {
    name: 'Carols Places Holiday Cottages',
    website: 'https://www.carolsplaces.com/our-places',
    location: 'Giggleswick, Settle, Wigglesworth, Stainforth, Kirkby Lonsdale and Gisburn',
    email: 'info@carolsplaces.com',
    phone: '07729 827961',
  },
  {
    name: 'Premier Inn',
    location: 'Hellifield Rd, Gargrave, Skipton, BD23 4AJ',
    phone: '08715 278980',
  },
  {
    name: 'King William the Fourth',
    website: 'https://www.kingwilliamthefourthguesthouse.co.uk',
    location: 'High St, Settle, North Yorkshire, BD24 9EX',
    phone: '01729 268152',
  },
];

const Accommodation = () => {
  return (
    <div className="content">
      <h2>Accommodation</h2>
      <div className="body bodySplit">
        <div className="copy">
          <p>
            Some guests are staying at Falcon Manor on the night of the wedding and have already
            been contacted directly with room details.
          </p>

          <p>For everyone else, the venue has provided the nearby options below.</p>

          <details className="accommodationAccordion">
            <summary>View Local Accommodation</summary>
            <ul className="accommodationList">
              {stayOptions.map((stay) => (
                <li key={stay.name} className="accommodationItem">
                  <p>
                    <strong>{stay.name}</strong>
                  </p>
                  {stay.website && (
                    <p>
                      <a href={stay.website} target="_blank" rel="noreferrer">
                        {stay.website.replace('https://', '')}
                      </a>
                    </p>
                  )}
                  {stay.location && <p>{stay.location}</p>}
                  {stay.email && (
                    <p>
                      <a href={`mailto:${stay.email}`}>{stay.email}</a>
                    </p>
                  )}
                  {stay.phone && (
                    <p>
                      <a href={`tel:${stay.phone.replace(/\s+/g, '')}`}>{stay.phone}</a>
                    </p>
                  )}
                  {stay.notes && <p>{stay.notes}</p>}
                </li>
              ))}
            </ul>
          </details>

          <p>Settle town centre is usually easiest for walking access to Falcon Manor.</p>

          <p>We recommend booking early, as this area is popular in summer.</p>
        </div>
        <BrushRevealImage image="/settle.png" />
      </div>
    </div>
  );
};

export default Accommodation;
