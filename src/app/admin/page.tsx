'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import AddSculptorForm from '@/components/Admin/AddSculptorForm';

const Admin = () => {
  const { user } = useUserStore();
  const router = useRouter();

  console.log(user);

  useEffect((): void => {
    if (user?.role !== 'STAFF') {
      router.push('/unauthorized');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Admin</h1>
      <AddSculptorForm />
    </div>
  );
};

export default Admin;
