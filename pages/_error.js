'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  const router = useRouter();
  useEffect(() => {
    if ((router.asPath = '/')) {
      router.push(`/?page=1&query=`);
    }
    console.error(error);
  }, [error]);

  return (
    <div className="mt-[100px]">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
