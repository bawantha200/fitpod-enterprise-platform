import React from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Target,
  Eye,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const GREEN = '#B6FF00';
const BACKGROUND = '#0A0A0A';
const CARD = '#171717';
const BORDER = '#303030';
const MUTED = '#A0A0A0';
const LIGHT = '#D8D8D8';
const OLIVE = '#263018';

const AboutUsPage = () => {
  const buttonPrimary =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]';

  const buttonOutline =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#B6FF00] bg-transparent px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#B6FF00] hover:text-black';

  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: BACKGROUND }}
    >
      {/* Shared Header */}
      <Header />

      <main className="pt-[88px]">

        {/* About Hero Section */}
        <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <p
              className="mb-6 text-xs font-bold tracking-[0.3em]"
              style={{ color: GREEN }}
            >
              ABOUT FITPOD
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              MORE SPACE
              <br />
              FOR <span style={{ color: GREEN }}>YOU.</span>
            </h1>

            <p
              className="mt-8 max-w-lg text-base leading-8 md:text-lg"
              style={{ color: MUTED }}
            >
              Fitness should feel personal. We are creating a more
              considered way to move in Sri Lanka: a private smart gym
              pod, reserved for you and the people you choose.
            </p>

            <a href="/our-pod" className={`${buttonPrimary} mt-10`}>
              Explore Our Pod
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85"
              alt="Modern private fitness space"
              className="relative z-10 h-[350px] w-full object-cover md:h-[430px]"
            />

            <div
              className="absolute -right-4 -top-4 h-full w-full border"
              style={{ borderColor: GREEN }}
            />
          </div>
        </section>

        {/* Our Concept Section */}
        <section style={{ backgroundColor: CARD }}>
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
              <div>
                <p
                  className="mb-6 text-xs font-bold tracking-[0.3em]"
                  style={{ color: GREEN }}
                >
                  NOT ANOTHER CROWDED GYM
                </p>

                <h2 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
                  Privacy isn't an upgrade.
                  <span style={{ color: GREEN }}>
                    {' '}It's the whole idea.
                  </span>
                </h2>
              </div>

              <div className="flex items-center">
                <p
                  className="text-base leading-8 md:text-lg"
                  style={{ color: MUTED }}
                >
                  FitPod is a fully equipped workout space you reserve
                  for a fixed session. Train alone or with selected
                  friends, without sharing your pod with strangers.
                  Your time, your people, your privacy.
                </p>
              </div>
            </div>

            <div
              className="mt-20 grid gap-10 border-t pt-12 md:grid-cols-2"
              style={{ borderColor: BORDER }}
            >
              <h3 className="text-3xl font-black leading-tight md:text-4xl">
                Less waiting.
                <br />
                Less noise.
                <br />
                <span style={{ color: GREEN }}>More you.</span>
              </h3>

              <div>
                <p
                  className="text-base leading-8"
                  style={{ color: MUTED }}
                >
                  Book your preferred session, arrive at your scheduled
                  time, and enjoy your own private workout environment.
                  With smart access and a dedicated space, you can focus
                  on what matters most — your fitness journey.
                </p>

                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={22} style={{ color: GREEN }} />
                    <span className="text-sm font-semibold">
                      Private Space
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock size={22} style={{ color: GREEN }} />
                    <span className="text-sm font-semibold">
                      Flexible Sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
          <div className="mb-14 text-center">
            <p
              className="mb-5 text-xs font-bold tracking-[0.3em]"
              style={{ color: GREEN }}
            >
              WHAT MOVES US
            </p>

            <h2 className="text-4xl font-black md:text-5xl">
              A better experience,
              <br className="hidden md:block" />
              from the inside out.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Mission Card */}
            <div
              className="border p-8 transition duration-300 hover:-translate-y-1 md:p-12"
              style={{
                backgroundColor: CARD,
                borderColor: BORDER,
              }}
            >
              <div
                className="mb-10 flex h-14 w-14 items-center justify-center"
                style={{
                  backgroundColor: OLIVE,
                  color: GREEN,
                }}
              >
                <Target size={28} />
              </div>

              <p
                className="mb-4 text-xs font-bold tracking-[0.25em]"
                style={{ color: GREEN }}
              >
                OUR MISSION
              </p>

              <h3 className="mb-5 text-3xl font-black">
                Make fitness personal.
              </h3>

              <p
                className="max-w-md text-sm leading-8 md:text-base"
                style={{ color: MUTED }}
              >
                To make fitness more comfortable, accessible, and
                personal by providing private, smart, and fully equipped
                workout spaces that fit different lifestyles.
              </p>
            </div>

            {/* Vision Card */}
            <div
              className="border p-8 transition duration-300 hover:-translate-y-1 md:p-12"
              style={{
                backgroundColor: CARD,
                borderColor: BORDER,
              }}
            >
              <div
                className="mb-10 flex h-14 w-14 items-center justify-center"
                style={{
                  backgroundColor: OLIVE,
                  color: GREEN,
                }}
              >
                <Eye size={28} />
              </div>

              <p
                className="mb-4 text-xs font-bold tracking-[0.25em]"
                style={{ color: GREEN }}
              >
                OUR VISION
              </p>

              <h3 className="mb-5 text-3xl font-black">
                Wellness that fits your life.
              </h3>

              <p
                className="max-w-md text-sm leading-8 md:text-base"
                style={{ color: MUTED }}
              >
                To redefine the fitness experience in Sri Lanka through
                convenient private workout spaces and a more thoughtful
                approach to everyday wellness.
              </p>
            </div>

          </div>
        </section>

        {/* Cafe Section */}
        <section style={{ backgroundColor: CARD }}>
          <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-28">

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=85"
                alt="Fresh healthy food and nutrition"
                className="h-[350px] w-full object-cover md:h-[430px]"
              />

              <div
                className="absolute -bottom-4 -right-4 hidden h-28 w-28 md:block"
                style={{ backgroundColor: GREEN }}
              />
            </div>

            <div>
              <p
                className="mb-6 text-xs font-bold tracking-[0.3em]"
                style={{ color: GREEN }}
              >
                TRAIN WELL. FEEL WELL.
              </p>

              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Your workout is just the beginning.
              </h2>

              <p
                className="mt-7 text-base leading-8"
                style={{ color: MUTED }}
              >
                A great fitness journey goes beyond the workout.
                Complement your training with fresh juices, smoothies,
                and nutritious options at our natural nutrition cafe.
                Because feeling good starts from within.
              </p>

              <a href="/cafe" className={`${buttonOutline} mt-9`}>
                Explore Our Cafe
                <ArrowUpRight size={18} />
              </a>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section
          className="px-6 py-20 text-center sm:px-10 lg:py-28"
          style={{ backgroundColor: OLIVE }}
        >
          <p
            className="mb-6 text-xs font-bold tracking-[0.3em]"
            style={{ color: GREEN }}
          >
            MAKE ROOM FOR YOUR NEXT CHAPTER
          </p>

          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            YOUR SPACE IS
            <span style={{ color: GREEN }}> WAITING.</span>
          </h2>

          <p
            className="mx-auto mt-6 max-w-xl text-sm leading-7 md:text-base"
            style={{ color: LIGHT }}
          >
            Your fitness journey deserves a space of its own.
            Make your next move with FitPod.
          </p>

          <a
            href="/customer/login"
            className={`${buttonPrimary} mt-10`}
          >
            Book Your Pod
            <ArrowUpRight size={18} />
          </a>
        </section>

      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
