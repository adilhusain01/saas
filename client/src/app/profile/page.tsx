'use client';

import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  image: string;
  created_at: string;
}

interface Subscription {
  id: string;
  dodo_session_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: string;
  plan_type: string;
  created_at: string;
  updated_at: string;
  payment_data: any;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [cancelImmediately, setCancelImmediately] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google');
      return;
    }

    if (status === 'authenticated') {
      fetchProfile();
      fetchSubscriptions();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        headers: {
          'Authorization': `Bearer ${(session as any)?.supabaseAccessToken || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${(session as any)?.supabaseAccessToken || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Subscriptions data:', data);
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string, cancelImmediately: boolean) => {
    setCancelLoading(subscriptionId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.supabaseAccessToken || ''}`,
        },
        body: JSON.stringify({ subscriptionId, cancelImmediately }),
      });

      if (response.ok) {
        alert('Subscription cancelled successfully');
        fetchSubscriptions(); // Refresh the list
        setShowCancelModal(false);
        setSelectedSubscription(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription');
    } finally {
      setCancelLoading(null);
    }
  };

  const openCancelModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setCancelImmediately(false);
    setShowCancelModal(true);
  };

  const getSubscriptionStatus = (subscription: Subscription) => {
    const status = subscription.status;
    const cancelAtNext = subscription.payment_data?.cancel_at_next_billing_date;
    const expiresAt = subscription.payment_data?.expires_at;
    const nextBillingDate = subscription.payment_data?.next_billing_date;
    const cancelledAt = subscription.payment_data?.cancelled_at;

    if (status === 'cancelled') {
      const cancelledDate = cancelledAt || subscription.updated_at;
      if (nextBillingDate) {
        return `Cancelled on ${new Date(cancelledDate).toLocaleDateString()} (active until ${new Date(nextBillingDate).toLocaleDateString()}, no future charges)`;
      }
      return `Cancelled on ${new Date(cancelledDate).toLocaleDateString()}`;
    }
    if (status === 'active') {
      const createdDate = new Date(subscription.created_at).toLocaleDateString();
      if (cancelAtNext === true && nextBillingDate) {
        return `Active until ${new Date(nextBillingDate).toLocaleDateString()} (created on ${createdDate})`;
      }
      return `Active since ${createdDate}`;
    }
    if (status === 'on_hold') {
      return 'Inactive';
    }
    if (status === 'failed') {
      return 'Failed';
    }
    if (status === 'expired') {
      return 'Expired';
    }
    return status.charAt(0).toUpperCase() + status.slice(1); // Capitalize other statuses
  };

  const isSubscriptionCancellable = (subscription: Subscription) => {
    return subscription.status === 'active' && subscription.payment_data?.cancel_at_next_billing_date !== true;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="skeleton h-8 w-48 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="skeleton h-6 w-32 mb-4"></div>
                    <div className="flex items-center gap-4">
                      <div className="skeleton w-16 h-16 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-24"></div>
                        <div className="skeleton h-4 w-32"></div>
                        <div className="skeleton h-3 w-28"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <div className="skeleton h-6 w-32 mb-4"></div>
                    <div className="space-y-3">
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => router.push('/')}>Home</a></li>
              <li><a onClick={() => router.push('/profile')}>Profile</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold" onClick={() => router.push('/')}>
            SaaS Template
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a onClick={() => router.push('/')}>Home</a></li>
            <li><a onClick={() => router.push('/profile')}>Profile</a></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-primary" onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Profile Information</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src={profile?.image || session.user?.image || ''} alt="Profile" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{profile?.name || session.user?.name}</h3>
                      <p className="text-base-content/70">{profile?.email || session.user?.email}</p>
                      <p className="text-sm text-base-content/50">
                        Member since: {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Subscriptions</h2>

              {subscriptions.length === 0 ? (
                <p className="text-base-content/60">No subscriptions found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td>
                            <div>
                              <div className="font-bold">
                                {subscription.plan_type === 'basic' && 'Basic Plan'}
                                {subscription.plan_type === 'pro' && 'Pro Plan'}
                                {subscription.plan_type === 'max' && 'Max Plan'}
                                {subscription.plan_type === 'subscription' && 'Subscription'}
                              </div>
                              <div className="text-sm opacity-60">ID: {subscription.dodo_session_id}</div>
                            </div>
                          </td>
                          <td>${(subscription.amount / 100).toFixed(2)} {subscription.currency.toUpperCase()}</td>
                          <td>
                            <span className={`badge ${getSubscriptionStatus(subscription).includes('Active') ? 'badge-success' : getSubscriptionStatus(subscription).includes('Cancelled') ? 'badge-error' : 'badge-neutral'}`}>{getSubscriptionStatus(subscription)}</span>
                          </td>
                          <td>
                            {isSubscriptionCancellable(subscription) && (
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => openCancelModal(subscription)}
                                disabled={cancelLoading === subscription.dodo_session_id}
                              >
                                {cancelLoading === subscription.dodo_session_id ? (
                                  <div className="loading loading-spinner loading-xs"></div>
                                ) : (
                                  'Cancel'
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      <dialog className={`modal ${showCancelModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Cancel Subscription</h3>
          <p className="py-4">
            Are you sure you want to cancel your subscription? The subscription will be cancelled at the next billing date.
          </p>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Note: Dodo Payments only supports cancellation at the next billing date. Immediate cancellation is not available.</span>
          </div>
          <div className="alert alert-warning mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Warning: Refund is not applicable for subscription cancellations.</span>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => setShowCancelModal(false)}>Cancel</button>
            <button
              className="btn btn-error"
              onClick={() => selectedSubscription && cancelSubscription(selectedSubscription.dodo_session_id, cancelImmediately)}
              disabled={cancelLoading === selectedSubscription?.dodo_session_id}
            >
              {cancelLoading === selectedSubscription?.dodo_session_id ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                'Confirm Cancellation'
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}