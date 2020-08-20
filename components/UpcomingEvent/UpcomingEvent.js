import Link from 'next/link';
import { useRouter } from 'next/router';

import Banner from '../../public/images/Banner-1.JPG';
import { Image, EventWrapper } from '../../styles/UpcomingEvent';

const UpcomingEvent = () => {
  const router = useRouter();

  const handleKeyDown = (href, as, key) => {
    if (key === 'Enter' || key === ' ') {
      router.push(href, as);
    }
  };

  return (
    <EventWrapper>
      <Link href="/gallery?collection=silver-flow" as="/gallery/silver-flow">
        <Image
          src={Banner}
          alt="Silver Flow collection banner"
          tabIndex="0"
          aria-label="View Silver Flow collection"
          onKeyDown={(e) =>
            handleKeyDown(
              '/gallery?collection=silver-flow',
              '/gallery/silver-flow',
              e.key
            )
          }
        />
      </Link>
    </EventWrapper>
  );
};

export default UpcomingEvent;
