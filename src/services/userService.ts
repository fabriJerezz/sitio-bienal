import {
  UserAuthentication,
  UserRegistration,
  UserReturnedData,
} from '@/types';
import keysToCamelCase from '@/utils/toCamelCase';
import  keysToSnakeCase  from '@/utils/toSnakeCase';

const userService = {
  authenticateUser: async (
    user: UserAuthentication
  ): Promise<UserReturnedData> => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }
      const data = await response.json();
      
      return keysToCamelCase(data) as UserReturnedData;
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  },
  registerUser: async (user: UserRegistration): Promise<UserReturnedData> => {
    try {
      const snakeCaseUser = keysToSnakeCase(user);
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(snakeCaseUser),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      const data = await response.json();
      return keysToCamelCase(data) as UserReturnedData;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },
  resetPassword: async (email: string) => {
    const url = "https://tp-final-bienal.onrender.com/password-reset/";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        // throw new Error('Failed to reset password');
        console.log(response)
      }
      console.log(response)
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  },
  
};

export default userService;
          