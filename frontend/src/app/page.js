'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  const router = useRouter();
  const { user , logout} = useAuth();
  console.log("User in Home: ", user);


  useEffect(() => {

    if (user) {
      const userType = user.type.toLowerCase();
      if (userType === 'driver') router.replace('/driver/dashboard');
      else if (userType === 'customer') router.replace('/customer');
      else router.replace('/');
    }
    

  }, [user, router]);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
