"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "../favicon.png";

export default function Login() {
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);
  const { data: session } = useSession();
  const handleGoogleSignIn = async () => {
    setGoogleIsLoading(true);
    try {
      const res = await signIn("google");
      setGoogleIsLoading(false);
    } catch (err: unknown) {
      console.log(`error: ${err}`);
      setGoogleIsLoading(false);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl glass border border-white/60'>
        <div className='grid lg:grid-cols-2'>
          <div className='hidden lg:flex gradient p-16 relative overflow-hidden'>
            <div className='absolute w-72 h-72 bg-white/10 rounded-full -top-24 -left-20'></div>
            <div className='absolute w-96 h-96 bg-white/10 rounded-full -bottom-36 -right-24'></div>

            <div className='relative z-10 flex flex-col justify-between w-full'>
              <div>
                <div className='flex items-center gap-4'>
                  <div className=' w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg'>
                    <Image
                      src={Logo}
                      alt='logo'
                      className='w-16 h-16 rounded-2xl'
                    />
                  </div>

                  <div>
                    <h1 className='text-4xl font-bold text-white'>MailMind</h1>

                    <p className='text-white/80 mt-1'>
                      AI-Powered Email Organizer
                    </p>
                  </div>
                </div>
              </div>

              <div className='space-y-8'>
                <h2 className='text-5xl font-bold text-white leading-tight'>
                  Organize your college emails intelligently.
                </h2>

                <p className='text-xl text-white/80 leading-relaxed'>
                  Connect Gmail or Outlook and let AI automatically classify
                  assignments, events, reminders, placements and important
                  announcements.
                </p>

                <div className='grid grid-cols-2 gap-5 mt-10'>
                  <div className='bg-white/15 rounded-2xl p-5'>
                    <p className='text-3xl'>📝</p>
                    <h3 className='text-white font-semibold mt-3'>
                      Assignments
                    </h3>
                  </div>

                  <div className='bg-white/15 rounded-2xl p-5'>
                    <p className='text-3xl'>📅</p>
                    <h3 className='text-white font-semibold mt-3'>Events</h3>
                  </div>

                  <div className='bg-white/15 rounded-2xl p-5'>
                    <p className='text-3xl'>⏰</p>
                    <h3 className='text-white font-semibold mt-3'>Reminders</h3>
                  </div>

                  <div className='bg-white/15 rounded-2xl p-5'>
                    <p className='text-3xl'>🤖</p>
                    <h3 className='text-white font-semibold mt-3'>
                      AI Summary
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-[var(--text-primary)] px-10 py-14 lg:px-16'>
            <div className='max-w-md mx-auto'>
              <div className='text-center'>
                <div className='lg:hidden w-16 h-16 mx-auto rounded-2xl gradient flex items-center justify-center text-[var(--bg-primary)] text-3xl shadow-lg'>
                  📩
                </div>

                <h2 className='text-4xl font-bold mt-6 text-[var(--bg-primary)] '>
                  Welcome Back
                </h2>

                <p className='text-[var(--bg-secondary)] mt-3'>
                  Sign in to continue to{" "}
                  <span className='font-semibold text-indigo-600'>
                    MailMind
                  </span>
                </p>
              </div>

              <div className='mt-10 space-y-5'>
                <button
                  onClick={handleGoogleSignIn}
                  className='google w-full flex items-center justify-center gap-4 border rounded-xl py-4 font-semibold transition bg-amber-600'
                >
                  <Image
                    alt='google'
                    width='6'
                    height='6'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    className='w-6'
                  ></Image>
                  Continue with Google
                </button>

                <button className='microsoft w-full flex items-center justify-center gap-4 border rounded-xl py-4 font-semibold transition bg-sky-600'>
                  <Image
                    alt='microsoft'
                    width='6'
                    height='6'
                    src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
                    className='w-6'
                  ></Image>
                  Continue with Microsoft
                </button>
              </div>

              <div className='mt-10'>
                <div className='bg-indigo-50 rounded-2xl p-5'>
                  <h4 className='font-semibold text-indigo-700'>
                    ✨ {`What you'll get`}
                  </h4>

                  <ul className='mt-4 space-y-3 text-gray-600'>
                    <li>📩 Smart AI email categorization</li>

                    <li>📝 Assignment tracking</li>

                    <li>📅 Automatic event detection</li>

                    <li>⏰ Reminder notifications</li>

                    <li>🤖 AI email summaries</li>
                  </ul>
                </div>
              </div>

              <div className='mt-10 text-center'>
                <p className='text-gray-500 text-sm'>
                  By continuing, you agree to our
                  <a href='#' className='text-indigo-600 font-medium'>
                    Terms
                  </a>
                  &
                  <a href='#' className='text-indigo-600 font-medium'>
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
