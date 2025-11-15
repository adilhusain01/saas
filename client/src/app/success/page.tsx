'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="card-title justify-center text-2xl">Payment Successful!</h2>
          <p className="mb-4">
            Thank you for subscribing to the {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : ''} plan.
          </p>
          <p className="text-sm opacity-70 mb-6">
            You will receive a confirmation email shortly.
          </p>
          <Link href="/" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}