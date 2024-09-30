import React from 'react';

interface UserProfileProps {
  profileData: {
    user: {
      username: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ profileData }) => {
  return (
    <div className="mt-2 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Perfil</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-indigo-700">{profileData.user.email}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Nombre:</span>
          <span className="text-indigo-700">{profileData.user.first_name}</span>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-gray-600 font-medium">Apellido:</span>
          <span className="text-indigo-700">{profileData.user.last_name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
