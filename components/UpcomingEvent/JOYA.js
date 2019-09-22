import { Image, EventWrapper } from '../../styles/UpcomingEvent';

const JOYA = () => {
  return (
    <EventWrapper>
      <a
        href="https://joyabarcelona.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Official JOYA website"
      >
        <Image
          src="../../static/images/joya_banner.jpg"
          alt="JOYA banner"
          sizes=""
          srcSet=""
        />
      </a>
    </EventWrapper>
  );
};

export default JOYA;
