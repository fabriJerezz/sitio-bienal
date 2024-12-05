import { NewSculptor, ModifiedSculptor, Sculptor } from '@/types';

const sculptorsService = {
  addSculptor: async (sculptor: NewSculptor): Promise<Sculptor> => {
    try {
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/sculptors',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sculptor),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to add sculptor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getSculptors: async (): Promise<Sculptor[]> => {
    try {
      const response = await fetch(
        'https://tp-final-bienal.onrender.com/sculptors'
      );
      if (!response.ok) {
        throw new Error('Failed to get sculptors');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateSculptor: async (sculptor: ModifiedSculptor, id:string): Promise<Sculptor> => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/sculptors?id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sculptor),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update sculptor');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteSculptor: async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/sculptors?id=${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete sculptor');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getScrulptorsByNacionality: async (
    nacionality: string
  ): Promise<Sculptor[]> => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/sculptors?nacionality=${nacionality}`
      );
      if (!response.ok) {
        throw new Error('Failed to get sculptors by nacionality');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getSculptorsByName: async (name: string): Promise<Sculptor[]> => {
    try {
      const response = await fetch(
        `https://tp-final-bienal.onrender.com/sculptors?name=${name}`
      );
      if (!response.ok) {
        throw new Error('Failed to get sculptors by name');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default sculptorsService;
