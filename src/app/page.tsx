'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Home/Header';
import SculptorShow from '../components/Home/SculptorShow';

export default function Home() {
  return (
    <>
      <Header />
      <SculptorShow />
    </>
  );
}
