import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Camera,
  User,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const buttonPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]';

const buttonOutline =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#303030] bg-transparent px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:-translate-y-1 hover:border-[#B6FF00] hover:text-[#B6FF00]';

const faqs = [
  {
    question: 'Can I book with friends?',
    answer:
      'Yes. Select a group session and reserve the pod with your chosen friends.',
  },
  {
    question: 'How long is a session?',
    answer:
      'A normal workout session is 60 minutes, with a 15-minute cleaning and ventilation buffer between sessions.',
  },
];
const BACKGROUND = '#0A0A0A';
const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Contact form backend integration will be added later.
  };

  return (
    <div className="min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: BACKGROUND }}>
      <Header />

      <main className="overflow-hidden bg-[#0A0A0A] pt-[88px]">

        {/* HERO SECTION */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                LET’S CONNECT
              </p>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                WE’RE HERE
                <br />
                FOR YOUR NEXT MOVE.
              </h1>

              <p className="max-w-[640px] text-base leading-6 text-[#A0A0A0]">
                A question about your booking, the pod or our cafe? Start a
                conversation with FitPod.
              </p>
            </div>

          </div>
        </section>

        {/* CONTACT FORM AND DETAILS */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 items-start gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">

            {/* CONTACT FORM */}
            <div className="flex w-full flex-col items-start gap-6">
              <h2 className="text-3xl font-semibold leading-8 text-white">
                Send us a message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-start gap-6"
              >
                <div className="flex w-full flex-col gap-1.5 rounded-[10px] border border-[#303030] bg-[#171717] px-5 py-3.5 transition-colors focus-within:border-[#B6FF00]">
                  <label
                    htmlFor="name"
                    className="text-sm leading-5 text-[#A0A0A0]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full bg-transparent text-base leading-6 text-white outline-none placeholder:text-[#777777]"
                  />
                </div>

                <div className="flex w-full flex-col gap-1.5 rounded-[10px] border border-[#303030] bg-[#171717] px-5 py-3.5 transition-colors focus-within:border-[#B6FF00]">
                  <label
                    htmlFor="email"
                    className="text-sm leading-5 text-[#A0A0A0]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-transparent text-base leading-6 text-white outline-none placeholder:text-[#777777]"
                  />
                </div>

                <div className="flex w-full flex-col gap-1.5 rounded-[10px] border border-[#303030] bg-[#171717] px-5 py-3.5 transition-colors focus-within:border-[#B6FF00]">
                  <label
                    htmlFor="subject"
                    className="text-sm leading-5 text-[#A0A0A0]"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What can we help with?"
                    required
                    className="w-full bg-transparent text-base leading-6 text-white outline-none placeholder:text-[#777777]"
                  />
                </div>

                <div className="flex min-h-[144px] w-full flex-col gap-1.5 rounded-[10px] border border-[#303030] bg-[#171717] px-5 py-3.5 transition-colors focus-within:border-[#B6FF00]">
                  <label
                    htmlFor="message"
                    className="text-sm leading-5 text-[#A0A0A0]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little more..."
                    required
                    rows={4}
                    className="w-full resize-y bg-transparent text-base leading-6 text-white outline-none placeholder:text-[#777777]"
                  />
                </div>

                <button type="submit" className={buttonPrimary}>
                  Send Message
                  <ArrowUpRight size={16} />
                </button>
              </form>

              <p className="text-sm leading-5 text-[#A0A0A0]">
                Your details are used to respond to your enquiry.
              </p>
            </div>

            {/* CONTACT INFORMATION */}
            <div className="flex w-full flex-col items-start gap-8">
              <h2 className="text-3xl font-semibold leading-9 text-white">
                A real conversation.
                <br />
                A little more clarity.
              </h2>

              <p className="text-base leading-6 text-[#A0A0A0]">
                Contact information will be added before launch.
              </p>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                  PHONE
                </p>

                <div className="flex items-center gap-3 text-base text-white">
                  <Phone size={17} className="text-[#A0A0A0]" />
                  [Phone number]
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                  EMAIL
                </p>

                <div className="flex items-center gap-3 text-base text-white">
                  <Mail size={17} className="text-[#A0A0A0]" />
                  [Email address]
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                  VISIT US
                </p>

                <div className="flex items-start gap-3 text-base leading-6 text-white">
                  <MapPin
                    size={17}
                    className="mt-1 shrink-0 text-[#A0A0A0]"
                  />

                  <span>
                    [Street address]
                    <br />
                    [City], Sri Lanka
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 pt-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-[#D8D8D8] transition-colors hover:text-[#B6FF00]"
                >
                  <Camera size={17} />
                  Camera
                  <ArrowUpRight size={13} />
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-[#D8D8D8] transition-colors hover:text-[#B6FF00]"
                >
                  <User size={17} />
                  User
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* LOCATION SECTION */}
        <section className="bg-[#171717] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                FIND YOUR SPACE
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                See you at FitPod.
              </h2>
            </div>

            <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 rounded-2xl border border-[#303030] bg-[#202020] px-6 py-16 text-center sm:min-h-[360px]">
              <MapPin
                size={48}
                strokeWidth={1.5}
                className="text-[#B6FF00]"
              />

              <p className="text-xs font-semibold tracking-[0.2em] text-white">
                GOOGLE MAPS
              </p>

              <p className="max-w-[500px] text-base leading-6 text-[#A0A0A0]">
                Location map will appear here once the address is confirmed.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                A QUICK ANSWER
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Before you reach out.
              </h2>
            </div>

            <div className="flex w-full flex-col gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="w-full border-b border-[#303030] pb-5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    aria-expanded={openFaq === index}
                    className="flex w-full items-center justify-between gap-6 py-2 text-left"
                  >
                    <span className="text-xl font-semibold leading-7 text-white sm:text-2xl">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={22}
                      className={`shrink-0 text-[#B6FF00] transition-transform duration-200 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openFaq === index && (
                    <p className="max-w-[900px] pt-3 text-base leading-6 text-[#A0A0A0]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Link to="/faq" className={buttonOutline}>
              Explore All FAQs
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
