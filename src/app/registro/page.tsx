import React from 'react';
import { RegisterFormComponent } from '@/components/Users/register-form';
import { registerBackground } from '@/../public/imgs/imagenes';
import Image from 'next/image';
const Register = () => {
  return (
    <div className="w-screen h-screen flex relative">
      <div className="w-1/2 relative">
        <Image
          src={registerBackground}
          alt="background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>
      <div className="w-1/2 relative">
        <RegisterFormComponent />
      </div>
    </div>
  );
};

export default Register;
