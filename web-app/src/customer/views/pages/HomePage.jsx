import React from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Dumbbell,
  Users,
  CalendarDays,
  Target,
  Clock,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const COLORS = {
  lime: '#B6FF00',
  background: '#0A0A0A',
  card: '#171717',
  border: '#303030',
  white: '#FFFFFF',
  muted: '#A0A0A0',
  lightGrey: '#D8D8D8',
  olive: '#263018',
};

const features = [
  {
    number: '01',
    title: 'Complete Privacy',
    description:
      'No strangers. No waiting. Just a private workout space reserved entirely for you.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Smart & Secure Access',
    description:
      'Secure digital entry makes accessing your workout session simple and convenient.',
    icon: Smartphone,
  },
  {
    number: '03',
    title: 'Fully Equipped',
    description:
      'Strength, cardio and resistance essentials, ready whenever you are.',
    icon: Dumbbell,
  },
  {
    number: '04',
    title: 'Train Your Way',
    description:
      'Enjoy your workout alone or share your session with friends you choose.',
    icon: Users,
  },
  {
    number: '05',
    title: 'Flexible Booking',
    description:
      'Choose an available session that fits perfectly into your day.',
    icon: CalendarDays,
  },
  {
    number: '06',
    title: 'Stay Focused',
    description:
      'Less noise. More intention. Make every minute of your workout count.',
    icon: Target,
  },
];

const bookingSteps = [
  {
    number: '01',
    title: 'Choose Your Session',
    description: 'Book a session for yourself or invite your friends.',
  },
  {
    number: '02',
    title: 'Select Your Time',
    description: 'Choose an available time slot for your workout.',
  },
  {
    number: '03',
    title: 'Confirm Your Booking',
    description: 'Review your booking details and complete payment.',
  },
  {
    number: '04',
    title: 'Access Your Pod',
    description: 'Use your smart access details and enjoy your session.',
  },
];

const HomePage = () => {
  const {
    isChatOpen,
    message,
    setMessage,
    toggleChat,
    sendMessage,
  } = useHomeViewModel();

  const buttonPrimary =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]';

  const buttonOutline =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#555555] bg-[#171717] px-5 py-3.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-[#B6FF00]';

  const eyebrow =
    'block text-xs font-semibold leading-[18px] tracking-[1.8px] text-[#B6FF00]';

  const sectionPadding = 'px-6 py-20 sm:px-10 lg:px-16 lg:py-24';

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#0A0A0A] font-['Inter',sans-serif] text-white">

      {/* SHARED HEADER */}

      <Header />

      {/* HERO */}

      <section
        id="home"
        className="relative flex min-h-[700px] w-full items-center bg-cover bg-center pt-[88px] md:min-h-[780px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />

        <div className="relative z-10 w-full px-6 pb-28 pt-16 sm:px-10 lg:px-16">
          <div className="max-w-[760px]">
            <span className={eyebrow}>
              PRIVATE SMART GYM / SRI LANKA
            </span>

            <h1 className="my-7 text-[clamp(48px,7.5vw,108px)] font-black leading-[1.04] tracking-[-5px]">
              YOUR SPACE.
              <span className="block text-[#B6FF00]">
                YOUR PACE.
              </span>
            </h1>

            <p className="mb-8 max-w-[470px] text-sm leading-8 text-[#D8D8D8] sm:text-base">
              Experience fitness on your terms. Your private workout
              space, your equipment, your time.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/customer/login" className={buttonPrimary}>
                Book Your Pod <ArrowUpRight size={18} />
              </a>

              <a href="#about" className={buttonOutline}>
                Explore FitPod <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-10 flex flex-col gap-3 text-[10px] font-bold tracking-[1.5px] text-white sm:left-10 sm:right-10 sm:flex-row sm:gap-9 lg:left-16 lg:right-16">
          <span>01 / YOUR POD. NO STRANGERS.</span>
          <span>60 MINUTES / ENTIRELY YOURS</span>
        </div>

        <div className="absolute bottom-8 right-16 z-10 hidden items-center gap-3 text-[10px] tracking-[1.4px] text-[#B6FF00] lg:flex">
          SCROLL TO EXPLORE
          <span className="h-px w-9 bg-[#B6FF00]" />
        </div>
      </section>

      {/* ABOUT / FEATURES */}

      <section id="about" className={`${sectionPadding} bg-[#0A0A0A]`}>
        <div className="mb-12">
          <span className={eyebrow}>
            A DIFFERENT WAY TO TRAIN
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-2px] sm:text-5xl">
            Everything you need.
            <br />
            Nothing in your way.
          </h2>

          <p className="mt-5 max-w-[620px] text-sm leading-8 text-[#A0A0A0] sm:text-base">
            A private workout experience built around what matters:
            your comfort, your focus and your time.
          </p>
        </div>

        <div
          id="services"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="flex min-h-[245px] flex-col items-start gap-4 rounded-2xl border border-[#303030] bg-[#171717] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B6FF00]"
              >
                <span className="text-[11px] font-bold tracking-[1.5px] text-[#B6FF00]">
                  {feature.number} / FEATURE
                </span>

                <Icon
                  className="text-[#B6FF00]"
                  size={30}
                  strokeWidth={1.6}
                />

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-[#A0A0A0]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className={`${sectionPadding} bg-[#171717]`}>
        <div className="mb-12">
          <span className={eyebrow}>SIMPLE BY DESIGN</span>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-2px] sm:text-5xl">
            Your next workout,
            <br />
            in four easy steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <article
              key={step.number}
              className="border-t border-[#404040] pt-6"
            >
              <div className="mb-8 flex min-h-11 items-center justify-between text-[28px] font-bold text-[#B6FF00]">
                <span>{step.number}</span>

                {index !== bookingSteps.length - 1 && (
                  <ArrowRight
                    size={22}
                    className="hidden text-[#B6FF00] xl:block"
                  />
                )}
              </div>

              <h3 className="mb-3 text-xl font-bold">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-[#A0A0A0]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* OUR POD */}

      <section id="pod" className={`${sectionPadding} bg-[#0A0A0A]`}>
        <div className="mb-12">
          <span className={eyebrow}>MEET YOUR PRIVATE POD</span>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-2px] sm:text-5xl">
            Small footprint.
            <br />
            Limitless potential.
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div
            role="img"
            aria-label="Private gym pod interior"
            className="min-h-[300px] rounded-2xl bg-cover bg-center sm:min-h-[430px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=85')",
            }}
          />

          <div>
            <h3 className="mb-8 text-3xl font-bold leading-tight">
              A complete gym.
              <br />
              All to yourself.
            </h3>

            <ul className="mb-8 flex flex-col gap-5">
              {[
                [Dumbbell, 'Strength training equipment'],
                [Target, 'Cardio equipment'],
                [Users, 'Dumbbells & resistance equipment'],
                [Clock, 'Air-conditioned private environment'],
                [ShieldCheck, 'Smart access system'],
              ].map(([Icon, label]) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm text-[#D8D8D8]"
                >
                  <Icon
                    size={18}
                    className="shrink-0 text-[#B6FF00]"
                  />
                  {label}
                </li>
              ))}
            </ul>

            <a href="/customer/login" className={buttonOutline}>
              Explore Our Pod <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* CAFE */}

      <section
        id="cafe"
        className="grid w-full grid-cols-1 items-center gap-10 bg-[#171717] px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[570px]">
          <span className={eyebrow}>
            FITNESS MEETS NUTRITION
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-[-2px] sm:text-5xl">
            Fuel Your
            <br />
            Fitness Journey.
          </h2>

          <p className="my-7 text-sm leading-8 text-[#A0A0A0] sm:text-base">
            Move with intention. Refuel naturally. Discover fresh
            juices, smoothies and feel-good nutrition at the FitPod Cafe.
          </p>

          <a href="/cafe" className={buttonPrimary}>
            Explore Our Cafe <ArrowUpRight size={17} />
          </a>
        </div>

        <div
          role="img"
          aria-label="Fresh healthy smoothie and natural nutrition"
          className="min-h-[300px] rounded-2xl bg-cover bg-center sm:min-h-[420px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=85')",
          }}
        />
      </section>

      {/* CTA */}

      <section className="w-full bg-[#263018] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
        <span className={eyebrow}>
          THE NEXT MOVE IS YOURS
        </span>

        <h2 className="my-7 text-4xl font-bold leading-tight tracking-[-2px] sm:text-6xl lg:text-7xl">
          READY TO MAKE
          <br />
          FITNESS PERSONAL?
        </h2>

        <a href="/customer/login" className={buttonPrimary}>
          Book Your First Session <ArrowUpRight size={18} />
        </a>
      </section>

      {/* SHARED FOOTER */}

      <Footer />

      {/* CHATBOT */}

      <div className="fixed bottom-6 right-6 z-50 sm:bottom-7 sm:right-7">

        {isChatOpen && (
          <div className="mb-4 flex h-[420px] w-[min(340px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-[#303030] bg-[#171717] shadow-2xl">

            <div className="flex items-center justify-between bg-[#171717] p-5">
              <div>
                <strong className="block text-sm">
                  FitPod Assistant
                </strong>

                <span className="mt-1 flex items-center gap-2 text-[11px] text-[#A0A0A0]">
                  <span className="h-2 w-2 rounded-full bg-[#B6FF00]" />
                  Online
                </span>
              </div>

              <button
                onClick={toggleChat}
                aria-label="Close chat"
                className="text-white hover:text-[#B6FF00]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-5">
              <div className="max-w-[85%] rounded-br-xl rounded-tl-xl rounded-tr-xl bg-[#252525] p-3 text-[13px] leading-7 text-[#F2F2F2]">
                Hey there! 👋 Welcome to FitPod.
                <br />
                How can I help you today?
              </div>

              <span className="mt-3 block text-[10px] text-[#A0A0A0]">
                AI assistant integration coming soon.
              </span>
            </div>

            <form
              className="flex gap-2 border-t border-[#303030] p-3"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-[#303030] bg-[#242424] px-3 py-3 text-xs text-white outline-none placeholder:text-[#777777] focus:border-[#B6FF00]"
              />

              <button
                type="submit"
                aria-label="Send message"
                className="grid w-10 shrink-0 place-items-center rounded-lg bg-[#B6FF00] text-black transition-colors hover:bg-[#A5E600]"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={toggleChat}
          aria-label="Open FitPod assistant"
          className="ml-auto grid h-[60px] w-[60px] place-items-center rounded-full bg-[#B6FF00] text-black shadow-[0_0_24px_1px_rgba(182,255,0,0.2)] transition-transform duration-200 hover:scale-105"
        >
          {isChatOpen ? (
            <X size={25} />
          ) : (
            <MessageCircle size={25} />
          )}
        </button>
      </div>

    </main>
  );
};

export default HomePage;
