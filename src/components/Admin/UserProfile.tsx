import useUserStore from '@/store/userStore';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  profileData: {
    user: {
      email: string | null;
      first_name: string | null;
      last_name: string | null;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ profileData }) => {
  const history = useUserStore();
  const Router = useRouter();

  useEffect(() => {
    if( !profileData || !profileData.user ) {
      Router.push(`/`)
    }
  }, [profileData, history]);


  const user = profileData?.user;
  return (
    <div className="mt-2 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Perfil</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-indigo-700">{user.email}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Nombre:</span>
          <span className="text-indigo-700">{user.first_name}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Apellido:</span>
          <span className="text-indigo-700">{user.last_name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
