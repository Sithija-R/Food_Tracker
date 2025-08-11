'use client';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/driver/dashboard');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm/>
    </div>
  );
}