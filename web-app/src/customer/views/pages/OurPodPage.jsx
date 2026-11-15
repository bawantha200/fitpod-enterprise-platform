import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Dumbbell,
  Wind,
  Activity,
  Users,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const buttonPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#B6FF00] px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-black transition-all duration-200 hover:-translate-y-1 hover:bg-[#A5E600]';

const buttonOutline =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-[#303030] bg-transparent px-5 py-3.5 text-[13px] font-semibold tracking-[0.3px] text-white transition-all duration-200 hover:-translate-y-1 hover:border-[#B6FF00] hover:text-[#B6FF00]';
const BACKGROUND = '#0A0A0A';
const equipmentFeatures = [
  {
    number: '01 / BUILD',
    title: 'Strength training',
    description:
      'A dedicated strength setup lets you move through your workout with intention.',
    icon: Dumbbell,
  },
  {
    number: '02 / MOVE',
    title: 'Cardio equipment',
    description:
      'Bring energy to your warm-up or make cardio the focus of your session.',
    icon: Activity,
  },
  {
    number: '03 / ADAPT',
    title: 'Dumbbells & resistance',
    description:
      'Versatile free weights and resistance equipment for the way you like to train.',
    icon: Zap,
  },
];

const OurPodPage = () => {
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
                THE FITPOD EXPERIENCE
              </p>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                ONE POD.
                <br />
                ALL YOURS.
              </h1>

              <p className="max-w-[660px] text-base leading-6 text-[#A0A0A0]">
                A complete workout environment with the privacy of your own
                space. Thoughtfully equipped. Smartly connected.
              </p>
            </div>

            <div className="h-[300px] w-full overflow-hidden rounded-2xl bg-[#171717] sm:h-[420px] lg:h-[580px]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85"
                alt="FitPod private gym environment"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* STEP INSIDE */}
        <section className="bg-[#171717] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                STEP INSIDE
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                Designed for focus.
                <br />
                Equipped for movement.
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

              <div className="flex flex-col items-start gap-4">
                <div className="h-[280px] w-full overflow-hidden rounded-2xl bg-[#0A0A0A] sm:h-[370px]">
                  <img
                    src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85"
                    alt="Strength training equipment"
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="text-sm leading-5 text-[#A0A0A0]">
                  01 / Strength, within reach.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="h-[280px] w-full overflow-hidden rounded-2xl bg-[#0A0A0A] sm:h-[370px]">
                  <img
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=85"
                    alt="Modern indoor gym environment"
                    className="h-full w-full object-cover"
                  />
                </div>

                <p className="text-sm leading-5 text-[#A0A0A0]">
                  02 / Your own air-conditioned environment.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* EQUIPMENT FEATURES */}
        <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-12">

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                THE ESSENTIALS, ELEVATED
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                A complete gym.
                <br />
                Without the crowd.
              </h2>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              {equipmentFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.number}
                    className="flex flex-col items-start gap-6 rounded-2xl border border-[#303030] bg-[#171717] p-6 sm:p-7"
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.6}
                      className="text-[#B6FF00]"
                    />

                    <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                      {feature.number}
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

        {/* BUILT AROUND YOU */}
        <section className="bg-[#171717] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

            <div className="h-[300px] w-full overflow-hidden rounded-2xl bg-[#0A0A0A] sm:h-[430px]">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85"
                alt="Personal fitness training"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
                BUILT AROUND YOU
              </p>

              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                Solo focus.
                <br />
                Shared motivation.
              </h2>

              <p className="text-base leading-6 text-[#A0A0A0]">
                Book the pod for yourself or select a group session with
                friends. Your private, air-conditioned environment is
                supported by smart digital access, with a cleaning and
                ventilation buffer between every session.
              </p>

              <Link to="/customer/login" className={buttonOutline}>
                Book Your Pod
                <ArrowUpRight size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-[#263018] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto flex w-full max-w-[1312px] flex-col items-start gap-10">

            <p className="text-xs font-semibold tracking-[0.2em] text-[#B6FF00]">
              MAKE ROOM FOR YOUR NEXT CHAPTER
            </p>

            <h2 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
              MAKE THIS
              <br />
              SPACE YOURS.
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

export default OurPodPage;
