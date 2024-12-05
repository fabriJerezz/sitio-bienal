import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { Artist } from '../../types';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="w-full max-w-[350px] flex flex-col h-full overflow-hidden">
      <div className="relative h-48">
        <Image
          src={artist.image}
          alt={`Image of ${artist.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            {artist.title}
          </CardTitle>
          <CardDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{artist.date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3 text-white">
            {artist.about}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        <Link href={artist.url}>
          <Button variant="outline" className="flex items-center">
            Ver mas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
