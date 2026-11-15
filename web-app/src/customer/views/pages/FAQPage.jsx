import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  'All questions',
  'Bookings & access',
  'Cafe & support',
];

const faqData = [
  {
    question: 'What is FitPod?',
    answer:
      'FitPod is a private smart gym pod rental service with a natural nutrition cafe in Sri Lanka. Reserve a fully equipped workout space for yourself or your selected friends, without sharing with strangers.',
    category: 'All questions',
  },
  {
    question: 'How does private pod booking work?',
    answer:
      'Simply log in to your FitPod account, select your preferred date and available one-hour session, and complete your booking. Once your booking is confirmed, you will receive the details needed to access your private workout space.',
    category: 'Bookings & access',
  },
  {
    question: 'Can I bring my friends?',
    answer:
      'Yes! You can invite your selected friends through the group booking feature. Each participant can confirm their invitation, and their individual share is deducted from their own FitPod wallet once everyone accepts.',
    category: 'Bookings & access',
  },
  {
    question: 'How does smart access work?',
    answer:
      'After your booking is successfully confirmed, FitPod provides the access passcode for your reserved session. You can use this passcode to unlock the smart door lock during your booking time.',
    category: 'Bookings & access',
  },
  {
    question: 'What should I bring?',
    answer:
      'Bring comfortable workout clothes, suitable footwear, a towel, and a water bottle. The pod is equipped with workout equipment, so you can focus on your session.',
    category: 'Bookings & access',
  },
  {
    question: 'How do I cancel a booking?',
    answer:
      'You can manage your bookings through your FitPod account. Cancellation eligibility and any applicable refund depend on the booking cancellation policy. Please check the booking details before confirming a cancellation.',
    category: 'Bookings & access',
  },
  {
    question: 'How can I contact support?',
    answer:
      'You can contact our team through the Contact Us page or use the FitPod Assistant for general questions about bookings, smart access, and the FitPod experience.',
    category: 'Cafe & support',
  },
  {
    question: 'What does the cafe offer?',
    answer:
      'The FitPod natural nutrition cafe complements your workout experience with refreshing drinks and nutrition-focused food options. You can enjoy a refreshing break before or after your workout.',
    category: 'Cafe & support',
  },
];

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All questions');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFAQs =
    activeCategory === 'All questions'
      ? faqData
      : faqData.filter(
          (faq) => faq.category === activeCategory
        );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(0);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0A0A0A] pt-[88px]">

        {/* HERO */}
        <section className="bg-[#0A0A0A] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1312px] flex-col items-start gap-8">

            <p className="text-xs font-semibold leading-4 tracking-[2px] text-[#B6FF00]">
              A LITTLE MORE CLARITY
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-[-1.5px] text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              GOOD QUESTIONS.
              <br />
              STRAIGHT ANSWERS.
            </h1>

            <p className="max-w-[650px] text-base leading-6 text-[#A0A0A0]">
              Everything you need to know about your space, your
              booking and the FitPod experience.
            </p>

          </div>
        </section>

        {/* FAQ QUESTIONS */}
        <section className="bg-[#0A0A0A] px-6 pb-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1312px] flex-col gap-8">

            {/* CATEGORY FILTERS */}
            <div className="flex flex-wrap items-center gap-6 border-b border-[#303030] pb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`text-xs font-semibold leading-5 tracking-tight transition-colors duration-200 ${
                    activeCategory === category
                      ? 'text-[#B6FF00]'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ LIST */}
            <div className="flex flex-col gap-4">
              {filteredFAQs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-xl border border-[#303030] transition-colors duration-200 ${
                      isOpen
                        ? 'bg-[#171717]'
                        : 'bg-[#0A0A0A] hover:bg-[#111111]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <span className="text-base font-semibold leading-7 text-white sm:text-xl">
                        {faq.question}
                      </span>

                      <span className="shrink-0 pt-0.5 text-[#B6FF00]">
                        {isOpen ? (
                          <Minus size={25} strokeWidth={1.8} />
                        ) : (
                          <Plus size={25} strokeWidth={1.8} />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 sm:px-6">
                        <p className="max-w-[1100px] text-sm leading-6 text-[#A0A0A0] sm:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="bg-[#171717] px-6 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-[1312px] flex-col items-start gap-8">

            <p className="text-xs font-semibold leading-4 tracking-[2px] text-[#B6FF00]">
              STILL CURIOUS?
            </p>

            <h2 className="text-5xl font-bold leading-tight tracking-[-1px] text-white sm:text-6xl">
              LET’S TALK.
            </h2>

            <p className="max-w-[650px] text-base leading-6 text-[#A0A0A0]">
              Ask the FitPod Assistant or send our team a message.
              We’re here to help with bookings, smart access, the
              cafe and general support.
            </p>

            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-xs font-semibold tracking-tight text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]"
            >
              Contact Us
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default FAQPage;
