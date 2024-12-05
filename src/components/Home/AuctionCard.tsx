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
import { User, DollarSign, ArrowRight } from 'lucide-react';
import { Auction } from '../../types';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  return (
    <Card className="w-[350px] flex flex-col h-full overflow-hidden text-white">
      <Image
        src={auction.image}
        alt={`Image of ${auction.title}`}
        width={350}
        height={200}
        className="object-cover"
      />
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            {auction.title}
          </CardTitle>
          <CardDescription className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{auction.author}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center space-x-2 text-lg font-semibold text-primary text-white">
            <DollarSign className="h-5 w-5" />
            <span>{auction.price}</span>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        <Link
          href={auction.url}
          className="flex items-center text-blue-600 hover:underline"
        >
          Saber mas
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
