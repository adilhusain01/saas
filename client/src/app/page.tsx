'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
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
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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

      <div className="bg-base-100 py-2">
        <div className="container mx-auto px-4">
          <div className="breadcrumbs text-sm">
            <ul>
              <li><a>Home</a></li>
              <li>Dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="alert alert-info shadow-lg mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">Welcome!</h3>
          <div className="text-xs">This is a demo SaaS template with authentication, payments, and dark mode.</div>
        </div>
        <div>
          <button className="btn btn-sm">Learn More</button>
        </div>
      </div>

      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Your SaaS</h1>
            <p className="py-6">
              A full-stack template with payments, auth, and more.
            </p>
            {session ? (
              <p>Welcome, {session.user?.name}!</p>
            ) : (
              <button className="btn btn-primary" onClick={() => signIn('google')}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  Authentication
                  <div className="badge badge-secondary">Secure</div>
                </h3>
                <p>Secure authentication with NextAuth.js and Supabase</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">NextAuth</div>
                  <div className="badge badge-outline">Supabase</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  Payments
                  <div className="badge badge-primary">Popular</div>
                </h3>
                <p>Integrated payments with Dodo Payments for subscriptions</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Dodo Payments</div>
                  <div className="badge badge-outline">Webhooks</div>
                </div>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">
                  Dark Mode
                  <div className="badge badge-accent">New</div>
                </h3>
                <p>Automatic dark/light mode toggle</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">next-themes</div>
                  <div className="badge badge-outline">System</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/200/300?random=1" alt="User 1" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">John Doe</h4>
                    <p className="text-sm opacity-70">Developer</p>
                  </div>
                </div>
                <p>"This SaaS template saved me weeks of development time. The authentication and payments integration is seamless!"</p>
                <div className="rating rating-sm mt-4">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/200/300?random=2" alt="User 2" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Smith</h4>
                    <p className="text-sm opacity-70">Entrepreneur</p>
                  </div>
                </div>
                <p>"The dark mode and responsive design make it perfect for modern web apps. Highly recommend!"</p>
                <div className="rating rating-sm mt-4">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/200/300?random=3" alt="User 3" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Mike Johnson</h4>
                    <p className="text-sm opacity-70">Designer</p>
                  </div>
                </div>
                <p>"Beautiful UI components with daisyUI. The theming system is incredibly flexible and easy to use."</p>
                <div className="rating rating-sm mt-4">
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly />
                  <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl">Basic</h3>
                <div className="text-4xl font-bold mb-4">$20<span className="text-lg font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li>✓ 5 Projects</li>
                  <li>✓ Basic Support</li>
                  <li>✓ 1GB Storage</li>
                  <li>✓ Email Notifications</li>
                </ul>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleCheckout('basic', 20)}
                  disabled={loading === 'basic'}
                >
                  {loading === 'basic' ? 'Processing...' : 'Get Basic'}
                </button>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl border-2 border-primary">
              <div className="card-body">
                <div className="badge badge-primary mb-2">Most Popular</div>
                <h3 className="card-title text-2xl">Pro</h3>
                <div className="text-4xl font-bold mb-4">$50<span className="text-lg font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li>✓ Unlimited Projects</li>
                  <li>✓ Priority Support</li>
                  <li>✓ 10GB Storage</li>
                  <li>✓ Advanced Analytics</li>
                  <li>✓ API Access</li>
                </ul>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleCheckout('pro', 50)}
                  disabled={loading === 'pro'}
                >
                  {loading === 'pro' ? 'Processing...' : 'Get Pro'}
                </button>
              </div>
            </div>
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl">Max</h3>
                <div className="text-4xl font-bold mb-4">$200<span className="text-lg font-normal">/month</span></div>
                <ul className="space-y-2 mb-6">
                  <li>✓ Everything in Pro</li>
                  <li>✓ White-label Solution</li>
                  <li>✓ 100GB Storage</li>
                  <li>✓ Dedicated Support</li>
                  <li>✓ Custom Integrations</li>
                  <li>✓ SLA Guarantee</li>
                </ul>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleCheckout('max', 200)}
                  disabled={loading === 'max'}
                >
                  {loading === 'max' ? 'Processing...' : 'Get Max'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer bg-neutral text-neutral-content p-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </div>
            <div>
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </div>
            <div>
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </div>
            <div>
              <h6 className="footer-title">Newsletter</h6>
              <div className="form-control w-80">
                <label className="label">
                  <span className="label-text text-neutral-content">Enter your email address</span>
                </label>
                <div className="join">
                  <input type="text" placeholder="username@site.com" className="input input-bordered join-item" />
                  <button className="btn btn-primary join-item">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
