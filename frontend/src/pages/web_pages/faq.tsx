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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'How do I track my bus in real-time?',
      answer:
        "Once you book a ticket, you can track your bus in real-time using the ${projectName} app. Simply go to the 'My Trips' section and select your journey to view the live location.",
    },
    {
      question: 'What payment methods are supported?',
      answer:
        'We support a variety of payment methods including credit/debit cards, net banking, and popular digital wallets to ensure a seamless booking experience.',
    },
    {
      question: 'Can I change or cancel my booking?',
      answer:
        "Yes, you can modify or cancel your booking through the app. Visit the 'My Trips' section, select your booking, and follow the instructions to make changes or cancel.",
    },
    {
      question: 'What is the SOS feature?',
      answer:
        "The SOS feature allows you to quickly contact emergency services or a designated contact in case of an emergency during your trip. It's designed to ensure your safety.",
    },
    {
      question: 'Are there any discounts available?',
      answer:
        "Yes, we offer various discounts and loyalty rewards for frequent travelers. Check the 'Offers' section in the app for the latest promotions and deals.",
    },
    {
      question: 'How secure is my personal information?',
      answer:
        'Your privacy is our priority. We use advanced encryption and security measures to protect your personal information and ensure a safe and secure experience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how we can enhance your travel experience.`}
        />
      </Head>
      <WebSiteHeader projectName={'Suvikshan Technologies'} pages={pages} />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'Suvikshan Technologies'}
          image={['Person reading a FAQ page']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Get the information you need to enhance your travel experience.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'Suvikshan Technologies'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Suvikshan Technologies'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person sending an email']}
          mainText={`Contact ${projectName} Support Team `}
          subTitle={`Have more questions? Reach out to us anytime, and our ${projectName} support team will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Suvikshan Technologies'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
