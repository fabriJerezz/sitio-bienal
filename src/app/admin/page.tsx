'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const Admin = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() : void => {
    if (user?.role !== 'STAFF') {
        router.push('/unauthorized');
    }
  }, []);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export default Admin;
