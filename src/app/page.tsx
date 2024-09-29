'use client';

import Header from '../components/Home/Header';
import SculptorsSection from '../components/Home/SculptorSlider';
import Gallery from '../components/Home/galleryworks/Gallery';

export default function Home() {
  return (
    <>
      <Header />
      <SculptorsSection />
      <Gallery />
    </>
  );
}
