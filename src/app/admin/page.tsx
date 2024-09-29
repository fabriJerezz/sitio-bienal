import React from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const Admin = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() : void => {
    if (user?.rol !== 'staff') {
        router.push('/unauthorized');
    }
  }, [user, router]);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default Admin;
