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
  payment_data: any;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState<string | null>(null);

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
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) {
      return;
    }

    setCancelLoading(subscriptionId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.supabaseAccessToken || ''}`,
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (response.ok) {
        alert('Subscription cancelled successfully');
        fetchSubscriptions(); // Refresh the list
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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>

          {/* Profile Information */}
          <div className="card bg-base-100 shadow-xl mb-8">
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
                  <p className="text-gray-600">{profile?.email || session.user?.email}</p>
                  <p className="text-sm text-gray-500">
                    Member since: {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Subscriptions */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Active Subscriptions</h2>

              {subscriptions.length === 0 ? (
                <p className="text-gray-600">No active subscriptions found.</p>
              ) : (
                <div className="space-y-4">
                  {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="border border-base-300 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {subscription.plan_type === 'basic' && 'Basic Plan'}
                            {subscription.plan_type === 'pro' && 'Pro Plan'}
                            {subscription.plan_type === 'max' && 'Max Plan'}
                            {subscription.plan_type === 'subscription' && 'Subscription'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ID: {subscription.dodo_session_id}
                          </p>
                          <p className="text-sm text-gray-600">
                            Amount: ${(subscription.amount / 100).toFixed(2)} {subscription.currency.toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: <span className="badge badge-success">{subscription.status}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Created: {new Date(subscription.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => cancelSubscription(subscription.dodo_session_id)}
                          disabled={cancelLoading === subscription.dodo_session_id}
                        >
                          {cancelLoading === subscription.dodo_session_id ? (
                            <div className="loading loading-spinner loading-xs"></div>
                          ) : (
                            'Cancel'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}