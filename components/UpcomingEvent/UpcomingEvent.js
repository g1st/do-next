import Link from 'next/link';

import Banner from '../../static/images/Banner-1.JPG';
import { Image, EventWrapper } from '../../styles/UpcomingEvent';

const UpcomingEvent = () => (
  <EventWrapper>
    <Link href="/gallery?collection=silver-flow" as="/gallery/silver-flow">
      <Image
        src={Banner}
        alt="Silver Flow collection banner"
        sizes=""
        srcSet=""
      />
    </Link>
  </EventWrapper>
);

export default UpcomingEvent;
