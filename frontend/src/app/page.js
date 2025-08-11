'use client';
import LoginForm from '@/components/LoginForm';
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
      <LoginForm/>
    </div>
  );
}
