import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ShieldCheck,
  CalendarDays,
  Smartphone,
  Clock,
  Users,
  Dumbbell,
  CheckCircle2,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const buttonPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]';

const COLORS = {
  lime: '#B6FF00',
  background: '#0A0A0A',
  card: '#171717',
  border: '#303030',
  white: '#FFFFFF',
  muted: '#A0A0A0',
  olive: '#263018',
  
};
const BACKGROUND = '#0A0A0A';
const podFeatures = [
  {
    label: 'SECURE ENTRY',
    title: 'Smart Access Experience',
    description:
      'Use secure digital access for your reserved session. Your booking and entry information stay connected.',
    icon: ShieldCheck,
  },
  {
    label: 'YOUR SCHEDULE',
    title: 'Flexible Online Booking',
    description:
      'View available fixed sessions, choose your preferred date and time slot, and review your reservation online.',
    icon: CalendarDays,
  },
  {
    label: 'STAY CONNECTED',
    title: 'Digital Customer Experience',
    description:
      'The FitPod mobile app and online customer platform bring your bookings, session information and support together.',
    icon: Smartphone,
  },
];

const bookingSteps = [
  {
    number: '01',
    title: 'Choose & reserve',
    description:
      'Select individual or group, then choose an available fixed time slot.',
  },
  {
    number: '02',
    title: 'Review your session',
    description:
      'Check your date, session duration and booking summary.',
  },
  {
    number: '03',
    title: 'Arrive & access',
    description:
      'Follow your smart-entry instructions and enjoy your private pod.',
  },
];

const ServicesPage = () => {
  return (
    
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: BACKGROUND }}
    >
<Header />

      <main className="pt-[88px] overflow-hidden bg-[#0A0A0A]">

        {/* HERO SECTION */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                FITNESS, WITHOUT THE FRICTION
              </p>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                YOUR SESSION.
                <br />
                YOUR WAY.
              </h1>

              <p className="max-w-[660px] text-base leading-6 text-[#A0A0A0]">
                Private space, thoughtful technology and flexible online
                booking. Everything works together so you can focus on your
                workout.
              </p>
            </div>

            <div className="h-[260px] w-full overflow-hidden rounded-2xl bg-[#171717] sm:h-[360px] lg:h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85"
                alt="Modern gym workout space"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* PRIVATE GYM POD RENTAL */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                01 / PRIVATE GYM POD RENTAL
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                The whole pod.
                <br />
                Not just a place in it.
              </h2>

              <p className="max-w-[660px] text-base leading-6 text-[#A0A0A0]">
                Reserve a fully equipped, air-conditioned gym pod for a
                private 60-minute workout. No shared floor with strangers.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">

              <div className="flex flex-col items-start gap-6 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                  INDIVIDUAL
                </p>

                <h3 className="text-2xl font-semibold leading-7 text-white">
                  Time to focus on you.
                </h3>

                <p className="text-base leading-6 text-[#A0A0A0]">
                  Reserve the pod for a personal workout. Strength, cardio or
                  resistance: follow your own routine in your own space.
                </p>
              </div>

              <div className="flex flex-col items-start gap-6 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                  GROUP
                </p>

                <h3 className="text-2xl font-semibold leading-7 text-white">
                  Your people. Your energy.
                </h3>

                <p className="text-base leading-6 text-[#A0A0A0]">
                  Choose a group booking and train with selected friends.
                  Share the session without sharing your space with strangers.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CONNECTED EXPERIENCE */}
        <section className="bg-[#171717] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                02 / A CONNECTED EXPERIENCE
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                Smart where it matters.
                <br />
                Simple where it should be.
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              {podFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex flex-col items-start gap-6 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-7"
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.6}
                      className="text-[#B6FF00]"
                    />

                    <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                      {feature.label}
                    </p>

                    <h3 className="text-2xl font-semibold leading-7 text-white">
                      {feature.title}
                    </h3>

                    <p className="text-base leading-6 text-[#A0A0A0]">
                      {feature.description}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* BOOKING PROCESS */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                FROM BOOKING TO YOUR FIRST REP
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                A little planning.
                <br />
                A lot more possibility.
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">

              {bookingSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-start gap-6 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-7"
                >
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                    {step.number}
                  </p>

                  <h3 className="text-2xl font-semibold leading-7 text-white">
                    {step.title}
                  </h3>

                  <p className="text-base leading-6 text-[#A0A0A0]">
                    {step.description}
                  </p>
                </div>
              ))}

            </div>

            <p className="text-sm leading-5 text-[#A0A0A0]">
              Every workout is 60 minutes. A 15-minute cleaning and
              ventilation buffer separates sessions.
            </p>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-[#263018] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-10">

            <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
              MAKE ROOM FOR YOUR NEXT CHAPTER
            </p>

            <h2 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
              YOUR SPACE IS
              <br />
              WAITING.
            </h2>

            <Link to="/customer/login" className={buttonPrimary}>
              Book Your Pod
              <ArrowUpRight size={16} />
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </div>
      

  );
};

export default ServicesPage;
