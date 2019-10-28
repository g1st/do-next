import Link from 'next/link';

import { Image, EventWrapper } from '../../styles/UpcomingEvent';

const UpcomingEvent = () => (
  <EventWrapper>
    <Link href="/gallery?collection=silver flow" as="/gallery/silver flow">
      <Image
        src="../../static/images/Silver-FLOW-banner.jpeg"
        alt="Silver Flow collection banner"
        sizes=""
        srcSet=""
      />
    </Link>
  </EventWrapper>
);

export default UpcomingEvent;
