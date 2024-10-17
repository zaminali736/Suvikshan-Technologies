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
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const features_points = [
    {
      name: 'Real-Time Tracking',
      description:
        "Stay informed with live updates on your bus's location. Plan your journey with precise arrival times and avoid unnecessary waiting.",
      icon: 'mdiMapMarkerPath',
    },
    {
      name: 'Seamless Booking',
      description:
        'Enjoy a smooth booking process with our user-friendly interface. Choose your preferred seats and pay securely with multiple options.',
      icon: 'mdiTicket',
    },
    {
      name: 'Priority Support',
      description:
        'Access dedicated customer support for quick resolutions. Our team is ready to assist you with any queries or issues you may encounter.',
      icon: 'mdiHeadset',
    },
    {
      name: 'Advanced Notifications',
      description:
        'Receive timely alerts about your trip, including delays and special offers. Stay updated and make informed travel decisions.',
      icon: 'mdiBell',
    },
    {
      name: 'Comprehensive Analytics',
      description:
        'Gain insights into your travel patterns with detailed analytics. Optimize your travel plans and make data-driven decisions.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Custom Solutions',
      description:
        'Tailor your travel experience with custom booking solutions. Perfect for businesses needing specialized travel arrangements.',
      icon: 'mdiCog',
    },
  ];

  const testimonials = [
    {
      text: 'The ${projectName} app has made my daily commute so much easier. The real-time tracking is incredibly accurate and reliable.',
      company: 'Transit Solutions Inc.',
      user_name: 'Alice Johnson, Commuter',
    },
    {
      text: 'Our business trips have become more efficient with ${projectName}. The custom solutions and priority support are invaluable.',
      company: 'Corporate Travel Co.',
      user_name: 'Mark Thompson, Travel Coordinator',
    },
    {
      text: "I love the seamless booking experience with ${projectName}. It's quick, easy, and the payment options are secure.",
      company: 'Easy Travel Ltd.',
      user_name: 'Samantha Lee, Frequent Traveler',
    },
    {
      text: 'The advanced notifications keep me updated on any changes to my trip. ${projectName} ensures I never miss a bus.',
      company: 'Alert Travels',
      user_name: 'David Brown, Daily Commuter',
    },
    {
      text: 'As a business owner, the comprehensive analytics provided by ${projectName} help me optimize our travel plans effectively.',
      company: 'Business Ventures Group',
      user_name: 'Emily Davis, CEO',
    },
    {
      text: 'The customer support team at ${projectName} is exceptional. They are always ready to assist with any queries or issues.',
      company: 'Supportive Journeys',
      user_name: 'Michael Green, Customer Service Head',
    },
  ];

  const faqs = [
    {
      question: 'What features are included in the Standard plan?',
      answer:
        "The Standard plan includes real-time bus tracking, basic booking options, and standard customer support. It's perfect for individuals who need essential travel features.",
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers all Standard features plus priority booking options, enhanced customer support, extended trip history, and exclusive discounts, ideal for small businesses.',
    },
    {
      question: 'What additional benefits does the Business plan offer?',
      answer:
        'The Business plan includes custom booking solutions, dedicated account management, comprehensive analytics, and priority support, tailored for enterprises with large-scale operations.',
    },
    {
      question: 'Can I upgrade my plan at any time?',
      answer:
        'Yes, you can upgrade your plan at any time through the app. Simply go to the account settings and choose the plan that best suits your needs.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'We offer a free trial for new users to explore the features of ${projectName}. Sign up today to experience the benefits before committing to a plan.',
    },
    {
      question: 'How secure is my payment information?',
      answer:
        'Your payment information is highly secure with ${projectName}. We use advanced encryption and security protocols to protect your data.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Affordable Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the flexible pricing plans offered by ${projectName}. Choose the plan that best suits your travel needs and enjoy exclusive features.`}
        />
      </Head>
      <WebSiteHeader projectName={'Suvikshan Technologies'} pages={pages} />
      <main
        className={`flex-grow   bg-skyBlueTheme-websiteBG   rounded-none  `}
      >
        <HeroSection
          projectName={'Suvikshan Technologies'}
          image={['Pricing plans on a screen']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Explore our flexible pricing options tailored to meet your travel needs. Whether you're an individual or a business, ${projectName} has the right plan for you.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'Suvikshan Technologies'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'Suvikshan Technologies'}
          image={['Features displayed on tablet']}
          withBg={1}
          features={features_points}
          mainText={`Unlock the Benefits of ${projectName}`}
          subTitle={`Explore the powerful features of ${projectName} that enhance your travel experience and provide exceptional value.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'Suvikshan Technologies'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied ${projectName} Users `}
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
          image={['Person writing an email']}
          mainText={`Reach Out to ${projectName} Team `}
          subTitle={`Have questions about our pricing plans? Contact us anytime, and our team will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Suvikshan Technologies'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
