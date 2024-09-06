'use client';
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

const backendUrl = process.env.NEXT_PUBLIC_APP_URL; // Use NEXT_PUBLIC_ for public environment variables

const LoginRedirect = () => {
  const [text, setText] = useState('Loading...');
  const router = useRouter();
  const searchParams = useSearchParams();
  // Access dynamic route param

  useEffect(() => {
    const accessToken = searchParams.toString(); // Get the query parameters

    // Successfully logged with the provider
    fetch(`${backendUrl}api/auth/github/callback?${accessToken}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        // Successfully logged with Strapi
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('user', res.user);

        setText(
          'You have been successfully logged in. You will be redirected in a few seconds...',
        );
        setTimeout(() => router.push('/guestbook'), 3000); // Redirect to homepage after 3 sec
      })
      .catch((err) => {
        console.error(err);
        setText('An error occurred, please see the developer console.');
      });
  }, [router, searchParams]);

  return <p>{text}</p>;
};

export default LoginRedirect;
