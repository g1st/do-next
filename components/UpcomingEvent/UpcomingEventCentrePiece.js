import { Image, EventWrapper } from '../../styles/UpcomingEvent';
import { AnchorLink } from '../../styles/Shared';

const UpcomingEvent = () => (
  <EventWrapper>
    <AnchorLink
      href="http://www.centrepiece-jewellery.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="../../static/images/CENTREPIECE_banner.jpg"
        alt="CENTREPIECE annual contemporary jewellery selling exhibition banner"
        sizes=""
        srcSet=""
      />
    </AnchorLink>
  </EventWrapper>
);

export default UpcomingEvent;
