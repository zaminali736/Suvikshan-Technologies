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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'Real-Time Tracking',
      description:
        'Track your bus in real-time to know exactly when it will arrive. Stay informed and plan your journey with confidence.',
      icon: 'mdiMapMarkerPath',
    },
    {
      name: 'Easy Booking',
      description:
        'Book your bus tickets effortlessly with our user-friendly interface. Enjoy a seamless booking experience with multiple payment options.',
      icon: 'mdiTicket',
    },
    {
      name: 'Safety First',
      description:
        'Access emergency services with our SOS feature for a safe and secure travel experience. Your safety is our priority.',
      icon: 'mdiShieldCheck',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Real-time tracking',
        'Easy booking',
        'Basic customer support',
      ],
      limited_features: ['Limited trip history', 'Basic notifications'],
    },
    premium: {
      features: [
        'Real-time tracking',
        'Easy booking',
        'Priority customer support',
      ],
      also_included: [
        'Extended trip history',
        'Advanced notifications',
        'Exclusive offers',
      ],
    },
    business: {
      features: [
        'Real-time tracking',
        'Easy booking',
        'Dedicated account manager',
        'Comprehensive analytics',
        'Custom integrations',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals seeking a reliable and straightforward travel booking experience.',
    premium:
      'Perfect for small businesses or startups looking for enhanced features and priority support.',
    business:
      'Designed for enterprises requiring advanced features, analytics, and dedicated support.',
  };

  const faqs = [
    {
      question: 'How does real-time bus tracking work?',
      answer:
        "Our app uses GPS technology to provide real-time updates on the location of your bus. You can see the bus's current position on a map and get estimated arrival times.",
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept a variety of payment methods including credit/debit cards, net banking, and popular digital wallets for your convenience.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer:
        'Yes, you can cancel or modify your booking through the app. Please refer to our cancellation policy for details on refunds and charges.',
    },
    {
      question: 'What is the SOS feature?',
      answer:
        'The SOS feature allows you to quickly contact emergency services or a designated contact in case of an emergency during your trip.',
    },
    {
      question: 'Are there any discounts available?',
      answer:
        'We offer various discounts and loyalty rewards for frequent travelers. Check the app regularly for the latest offers and promotions.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        "You can reach our customer support team through the app's contact section, where you can send a message or find our helpline number.",
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Yes, we prioritize your privacy and use advanced security measures to protect your personal information and payment details.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Comprehensive Bus Booking and Tracking App`}</title>
        <meta
          name='description'
          content={`Discover a seamless bus booking experience with real-time tracking, pricing, and more across India. Book your next journey with ease and confidence.`}
        />
      </Head>
      <WebSiteHeader projectName={'Suvikshan Technologies'} pages={pages} />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'Suvikshan Technologies'}
          image={['Bus on a scenic route']}
          mainText={`Experience Seamless Travel with ${projectName}`}
          subTitle={`Discover real-time bus tracking, easy booking, and exclusive offers across India with ${projectName}. Your journey starts here.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Book Now`}
        />

        <FeaturesSection
          projectName={'Suvikshan Technologies'}
          image={['App interface on smartphone']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Discover how ${projectName} enhances your travel experience with innovative features designed for convenience and safety.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Suvikshan Technologies'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FaqSection
          projectName={'Suvikshan Technologies'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Suvikshan Technologies'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a smartphone']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're here to help! Contact us anytime with your questions or feedback, and we'll respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Suvikshan Technologies'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
