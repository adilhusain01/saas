'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="card-title justify-center text-2xl">Payment Cancelled</h2>
          <p className="mb-6">
            Your payment was cancelled. No charges were made.
          </p>
          <Link href="/" className="btn btn-primary">
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}