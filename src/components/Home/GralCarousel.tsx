import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/Carousel';
import { New, Auction, Artist } from '../../types';
import NewCard from './NewCard';
import ArtistCard from './ArtistCard';
import AuctionCard from './AuctionCard';

interface GralCarouselProps {
  array: Array<New | Auction | Artist>;
}

export function GralCarousel({ array }: GralCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-[90%] bg-transparent p-4 rounded-lg"
    >
      <CarouselContent className="  flex ">
        {array.map((item, index) => (
          <CarouselItem
            key={index}
            className=" lg:basis-1/3 md:basis-1/2 flex justify-center"
          >
            <div>
              {(() => {
                if (
                  'id' in item &&
                  'title' in item &&
                  'description' in item &&
                  'image' in item &&
                  'url' in item
                ) {
                  return <NewCard news={item as New} />;
                } else if (
                  'id' in item &&
                  'title' in item &&
                  'date' in item &&
                  'about' in item &&
                  'image' in item &&
                  'url' in item
                ) {
                  return <ArtistCard artist={item as Artist} />;
                } else if (
                  'id' in item &&
                  'title' in item &&
                  'author' in item &&
                  'price' in item &&
                  'image' in item &&
                  'url' in item
                ) {
                  return <AuctionCard auction={item as Auction} />;
                } else {
                  return null;
                }
              })()}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
