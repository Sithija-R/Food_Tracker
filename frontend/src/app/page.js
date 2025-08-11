"use client";

import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setIsRedirecting(true);
      const userType = user.type.toLowerCase();
      if (userType === 'driver') router.replace('/driver/dashboard');
      else if (userType === 'customer') router.replace('/customer');
      else router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading user info...</p>;

  if (isRedirecting) return <p>Redirecting...</p>;

  if (!user) return <LoginForm />;

  return null;
}
