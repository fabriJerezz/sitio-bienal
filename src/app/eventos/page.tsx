import React from 'react';
import EventsCard from '../../components/Events/EventsCard';
import { useEffect, useState } from 'react';
import { Event } from '@/types';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  return <></>;
}
