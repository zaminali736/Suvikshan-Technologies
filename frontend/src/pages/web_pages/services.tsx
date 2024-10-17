import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  PricingDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Suvikshan Technologies';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const features_points = [
    {
      name: 'Real-Time Bus Tracking',
      description:
        'Stay updated with the exact location of your bus in real-time. Never miss a bus with accurate arrival predictions.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Seamless Booking Experience',
      description:
        'Book your tickets effortlessly with our intuitive interface. Enjoy a hassle-free booking process with multiple payment options.',
      icon: 'mdiTicketConfirmation',
    },
    {
      name: 'Comprehensive Safety Features',
      description:
        'Travel with peace of mind using our SOS feature and emergency contacts. Your safety is our top priority.',
      icon: 'mdiShield',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Real-time bus tracking',
        'Basic booking options',
        'Standard customer support',
      ],
      limited_features: ['Limited trip history', 'Basic notifications'],
    },
    premium: {
      features: [
        'Real-time bus tracking',
        'Priority booking options',
        'Enhanced customer support',
      ],
      also_included: [
        'Extended trip history',
        'Advanced notifications',
        'Exclusive discounts',
      ],
    },
    business: {
      features: [
        'Real-time bus tracking',
        'Custom booking solutions',
        'Dedicated account management',
        'Comprehensive analytics',
        'Priority support',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals who need reliable and straightforward travel solutions with essential features.',
    premium:
      'Perfect for small businesses or startups seeking enhanced features and priority support for a superior travel experience.',
    business:
      'Designed for enterprises requiring advanced features, comprehensive analytics, and dedicated support for large-scale operations.',
  };

  const testimonials = [
    {
      text: 'Using ${projectName} has transformed my daily commute. The real-time tracking feature is incredibly accurate and reliable.',
      company: 'TravelEase Solutions',
      user_name: 'John Doe, Operations Manager',
    },
    {
      text: 'I love how easy it is to book tickets with ${projectName}. The interface is user-friendly and the support team is always helpful.',
      company: 'Journey Innovations',
      user_name: 'Jane Smith, Product Lead',
    },
    {
      text: 'The safety features in ${projectName} give me peace of mind during my travels. Highly recommend it to all frequent travelers!',
      company: 'Secure Travels Inc.',
      user_name: 'Emily Johnson, Safety Officer',
    },
    {
      text: 'Our team uses ${projectName} for all our business trips. The premium plan offers great value with its advanced features.',
      company: 'BizTravel Corp.',
      user_name: 'Michael Brown, Business Analyst',
    },
    {
      text: 'As a frequent traveler, ${projectName} has been a game-changer. The exclusive discounts and offers are a great bonus!',
      company: 'Wanderlust Ventures',
      user_name: 'Sarah Lee, Travel Enthusiast',
    },
    {
      text: 'The customer support team at ${projectName} is exceptional. They are always ready to assist with any queries or issues.',
      company: 'Supportive Travels',
      user_name: 'David Wilson, Customer Service Head',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the comprehensive services offered by ${projectName}, including real-time bus tracking, easy booking, and more. Learn how we can enhance your travel experience.`}
        />
      </Head>
      <WebSiteHeader projectName={'Suvikshan Technologies'} pages={pages} />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'Suvikshan Technologies'}
          image={['Bus journey through cityscape']}
          mainText={`Discover ${projectName} Services Today`}
          subTitle={`Explore the innovative services offered by ${projectName}, designed to make your travel experience seamless and enjoyable. From real-time tracking to easy booking, we've got you covered.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'Suvikshan Technologies'}
          image={['App features on display']}
          withBg={1}
          features={features_points}
          mainText={`Unleash the Power of ${projectName}`}
          subTitle={`Discover the key features of ${projectName} that transform your travel experience into a seamless journey.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Suvikshan Technologies'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'Suvikshan Technologies'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Suvikshan Technologies'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Reach out to us anytime with your questions or feedback. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Suvikshan Technologies'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
