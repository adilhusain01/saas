'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: string, price: number) => {
    if (!session) {
      signIn('google');
      return;
    }

    // Validate plan
    const validPlans = ['basic', 'pro', 'max'];
    if (!validPlans.includes(plan)) {
      alert('Invalid plan selected');
      return;
    }

    setLoading(plan);
    try {
      const productIds = {
        basic: 'pdt_aCU0mubTSuDWGXLcIE9fw',
        pro: 'pdt_YQiSHzKDpVGlDUuYaSCR2',
        max: 'pdt_NKyYYMcKtZ8Hpdfmt4fB4'
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productIds[plan as keyof typeof productIds],
          successUrl: `${window.location.origin}/success?plan=${plan}`,
          cancelUrl: window.location.origin,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();
      if (data.url && data.url.startsWith('https://')) {
        window.location.href = data.url;
      } else {
        throw new Error('Invalid checkout URL received');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create checkout session');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Home</a></li>
              <li><a>Features</a></li>
              <li><a>Pricing</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold">SaaS Template</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>Features</a></li>
            <li><a>Pricing</a></li>
            <li><a>About</a></li>
            {session && <li><a onClick={() => router.push('/profile')}>Profile</a></li>}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User" src={session.user?.image || ''} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><a onClick={() => signOut()}>Sign Out</a></li>
              </ul>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => signIn('google')}>
              Sign In with Google
            </button>
          )}
        </div>
      </div>

      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Your SaaS
            </h1>
            <p className="py-6 text-lg md:text-xl text-base-content/80">
              A full-stack template with payments, auth, and more. Built with modern technologies for rapid development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {session ? (
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Welcome back, {session.user?.name}!</p>
                    <p className="text-sm text-base-content/60">Ready to explore your dashboard?</p>
                  </div>
                </div>
              ) : (
                <>
                  <button className="btn btn-primary btn-lg" onClick={() => signIn('google')}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Get Started with Google
                  </button>
                  <button className="btn btn-outline btn-lg">
                    View Demo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Everything you need to build modern SaaS applications with enterprise-grade security and performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">
                      Authentication
                      <div className="badge badge-secondary">Secure</div>
                    </h3>
                  </div>
                </div>
                <p className="text-base-content/80">Secure authentication with NextAuth.js and Supabase for enterprise-grade security.</p>
                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline">NextAuth</div>
                  <div className="badge badge-outline">Supabase</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">
                      Payments
                      <div className="badge badge-primary">Popular</div>
                    </h3>
                  </div>
                </div>
                <p className="text-base-content/80">Integrated payments with Dodo Payments for seamless subscription management.</p>
                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline">Dodo Payments</div>
                  <div className="badge badge-outline">Webhooks</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">
                      Dark Mode
                      <div className="badge badge-accent">New</div>
                    </h3>
                  </div>
                </div>
                <p className="text-base-content/80">Automatic dark/light mode toggle with system preference detection.</p>
                <div className="card-actions justify-end mt-4">
                  <div className="badge badge-outline">next-themes</div>
                  <div className="badge badge-outline">System</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Join thousands of developers who have accelerated their SaaS development with our template.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://picsum.photos/200/300?random=1" alt="John Doe" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">John Doe</h4>
                    <p className="text-sm text-base-content/60">Senior Developer</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic mb-4">"This SaaS template saved me weeks of development time. The authentication and payments integration is seamless!"</p>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-warning" checked readOnly />
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                      <img src="https://picsum.photos/200/300?random=2" alt="Jane Smith" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Jane Smith</h4>
                    <p className="text-sm text-base-content/60">Entrepreneur</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic mb-4">"The dark mode and responsive design make it perfect for modern web apps. Highly recommend!"</p>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-warning" checked readOnly />
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                      <img src="https://picsum.photos/200/300?random=3" alt="Mike Johnson" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Mike Johnson</h4>
                    <p className="text-sm text-base-content/60">UI/UX Designer</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic mb-4">"Beautiful UI components with daisyUI. The theming system is incredibly flexible and easy to use."</p>
                <div className="rating rating-sm">
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-warning" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-warning" checked readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Start free and scale as you grow. All plans include our core features with different limits and support levels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h3 className="card-title text-2xl justify-center mb-2">Basic</h3>
                  <div className="text-5xl font-bold text-primary mb-1">$20<span className="text-lg font-normal text-base-content/60">/month</span></div>
                  <p className="text-sm text-base-content/60">Perfect for getting started</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    5 Projects
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Basic Support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    1GB Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Email Notifications
                  </li>
                </ul>
                <button
                  className="btn btn-outline btn-primary w-full"
                  onClick={() => handleCheckout('basic', 20)}
                  disabled={loading === 'basic'}
                >
                  {loading === 'basic' ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    'Get Basic'
                  )}
                </button>
              </div>
            </div>
            <div className="card bg-primary text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300 scale-105 border-2 border-primary">
              <div className="card-body">
                <div className="badge badge-secondary mb-4 self-center">Most Popular</div>
                <div className="text-center mb-6">
                  <h3 className="card-title text-2xl justify-center mb-2">Pro</h3>
                  <div className="text-5xl font-bold mb-1">$50<span className="text-lg font-normal opacity-80">/month</span></div>
                  <p className="text-sm opacity-80">Best for growing businesses</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited Projects
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Priority Support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    10GB Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Advanced Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    API Access
                  </li>
                </ul>
                <button
                  className="btn btn-secondary w-full"
                  onClick={() => handleCheckout('pro', 50)}
                  disabled={loading === 'pro'}
                >
                  {loading === 'pro' ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    'Get Pro'
                  )}
                </button>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h3 className="card-title text-2xl justify-center mb-2">Max</h3>
                  <div className="text-5xl font-bold text-primary mb-1">$200<span className="text-lg font-normal text-base-content/60">/month</span></div>
                  <p className="text-sm text-base-content/60">For enterprise-scale applications</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    White-label Solution
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    100GB Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Dedicated Support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Custom Integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    SLA Guarantee
                  </li>
                </ul>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleCheckout('max', 200)}
                  disabled={loading === 'max'}
                >
                  {loading === 'max' ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    'Get Max'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold">Your Company</span>
              </div>
              <p className="text-base-content/70 mb-6 max-w-md">
                Building the future of SaaS applications with modern technology and exceptional user experiences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="btn btn-circle btn-ghost">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Features</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Pricing</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">API</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Help Center</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Documentation</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Status</a></li>
                <li><a href="#" className="link link-hover text-base-content/70 hover:text-base-content transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-base-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-base-content/60">&copy; 2024 Your Company. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="link link-hover text-base-content/60 hover:text-base-content transition-colors">Privacy Policy</a>
                <a href="#" className="link link-hover text-base-content/60 hover:text-base-content transition-colors">Terms of Service</a>
                <a href="#" className="link link-hover text-base-content/60 hover:text-base-content transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
