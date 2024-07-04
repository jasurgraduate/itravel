// src/pages/HomePage.js
import React from 'react';
import Map from '../components/Map';

const HomePage = () => {
  const visitedPlaces = [
    {
      name: 'Paris',
      coords: [48.8566, 2.3522],
      imageLink: 'https://blogger.googleusercontent.com/img/a/AVvXsEjc3T6d_JL5_7cvJhnYZt05sJUf6v5it15CGPhzQDgMLzpTYJJvNTb58IeiMS5S22SRwEBWASRh62YgsAh9Xu0COG3SV1OFHtodmRcBaPUrsyNVxbmllaLht5e2PYgSrXuXxt9FF3Rw3KfbxdkvBhF8_rvKcPReev43F-nyGcihKuoAWM16sbl9KbExuOZS=w392-h523'
    },

    {
      name: 'Milano',
      coords: [45.45913914397633, 9.187069449510059],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Samarkand Railway Station',
      coords: [39.685585339152084, 66.92896822883804],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Galata Korpusu',
      coords: [41.01981742565313, 28.97374089521015],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Topkapi Sarayi',
      coords: [41.01283162137, 28.984137376261444],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Nyhavn, Copenhagen ❤️',
      coords: [55.679203152492306, 12.592077834942733],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Santiago Bernabeu Stadium',
      coords: [40.476943066628905, -3.6151326686744683],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Wanda Metropolitano Stadium',
      coords: [40.43578817901148, -3.600562820267175],
      imageLink: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDsFcxaZ6TphewzLHXroTjHNJrp3ha3ks8Ky8kI5wg2c_yy1e9rpemwSfs1bcE2P5yvXtuhq1gB2ZNEPAkMQnBI_M8440xCs8wtAcZK0Es_Jkf7lfko1lI3g1TtjwUF_HFjtuwj4SYgAz7yFh4PBOoYR2rwFJ-GhzmOPUqnNyXIxJCGlhw1BgbsmwAZBvO/s320/photo_2023-08-24_17-47-13.jpg'
    },
    {
      name: 'University of Liverpool ❤️🎓',
      coords: [53.40611160109354, -2.966246349630762],
      imageLink: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZ-gSKxKu9nN59x3CDw61foCAWR227Q_MrNAS2RRJ5WyjmGd4hQUaT6w8fyiM608ksQZ32r0l9WZtwE2h03T2Ep7hGMXzi8KIC_Gefk69gpBSEIOrqxwmBMREhsgEmO6IK0LawPDSHG_TQDyAmwK5ROxKtDkvG1NdWmZIF_mjqpuplzz5YFGElx-fDrDM7/s320/121.webp'
    },
    {
      name: 'Tashkent State Transport University 🎓',
      coords: [41.27693714733493, 69.28171277402497],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Tashkent Railway Station',
      coords: [41.2913087415986, 69.28667534081151],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Uzbekistan Locomotive Depot',
      coords: [41.17574792500475, 69.11880335418036],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Uzbekistan Station',
      coords: [41.163629680198014, 69.10566899226976],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Bakhmal Mountains',
      coords: [40.06385884843086, 67.66027812330306],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'My Hometown Bulungur',
      coords: [39.76044032081304, 67.27410899466418],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'SKD Samarkand Airport',
      coords: [39.69699001918824, 66.99105567261223],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Manchester City Centre',
      coords: [53.481441143861986, -2.241878696210726],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Etihad Stadium 🩵',
      coords: [53.48008917865102, -2.188915220594217],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Edinburgh Castle',
      coords: [55.94874783939112, -3.1972694492410407],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'George Square',
      coords: [55.86128839286419, -4.25139556409707],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Stamford Bridge',
      coords: [51.481677827759704, -0.1910727052852046],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    
    
    // add more visited places
  ];
  const plannedPlaces = [
    {
      name: 'Tokyo',
      coords: [35.6895, 139.6917],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Daejeon, South Korea',
      coords: [36.46695000206827, 127.2868698610206],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Phuket',
      coords: [7.883604720685977, 98.38892563265334],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Tokyo',
      coords: [35.6895, 139.6917],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },
    {
      name: 'Tokyo',
      coords: [35.6895, 139.6917],
      imageLink: 'https://jasurgraduate.blogspot.com/'
    },

    

    // add more planned places
  ];

  return (
    <div>
      <h1>The places I have been to :)</h1>
      <Map visitedPlaces={visitedPlaces} plannedPlaces={plannedPlaces} />
    </div>
  );
};

export default HomePage;
