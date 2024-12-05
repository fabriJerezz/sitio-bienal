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
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { New } from '../../types';

interface NewsCardProps {
  news: New;
}

export default function NewCard({ news }: NewsCardProps) {
  return (
    <Card className="w-[350px] flex flex-col h-full overflow-hidden">
      <Image
        src={news.image}
        alt="Imagen de la noticia"
        width={350}
        height={200}
        className="object-cover"
      />
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            {news.title}
          </CardTitle>
          <CardDescription className="flex items-center space-x-2 text-sm text-white"></CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-white">{news.description}</p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        <Link
          href={news.url}
          className="flex items-center text-blue-600 hover:underline"
        >
          Leer más
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
