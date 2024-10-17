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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'How can I track my bus in real-time?',
      answer:
        "After booking your ticket, you can track your bus in real-time through the ${projectName} app. Navigate to 'My Trips' and select your journey to view the live location.",
    },
    {
      question: 'What payment methods are available?',
      answer:
        'We accept various payment methods including credit/debit cards, net banking, and popular digital wallets to ensure a smooth booking experience.',
    },
    {
      question: 'Can I modify or cancel my booking?',
      answer:
        "Yes, you can modify or cancel your booking via the app. Go to 'My Trips', select your booking, and follow the instructions to make changes or cancel.",
    },
    {
      question: 'What is the SOS feature?',
      answer:
        'The SOS feature allows you to quickly contact emergency services or a designated contact during your trip, ensuring your safety at all times.',
    },
    {
      question: 'Are there any discounts for frequent travelers?',
      answer:
        "Yes, we offer various discounts and loyalty rewards for frequent travelers. Check the 'Offers' section in the app for the latest promotions.",
    },
    {
      question: 'How secure is my personal information?',
      answer:
        'Your privacy is our priority. We use advanced encryption and security measures to protect your personal information and ensure a safe experience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with the ${projectName} team for any inquiries or support. We're here to help you with your travel needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'Suvikshan Technologies'} pages={pages} />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'Suvikshan Technologies'}
          image={['Customer service representative']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to assist you with any questions or support you need. Reach out to the ${projectName} team and let us help enhance your travel experience.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Suvikshan Technologies'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Suvikshan Technologies'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our ${projectName} support team will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Suvikshan Technologies'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
