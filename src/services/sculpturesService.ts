import { NewSculpture, ModifiedSculpture, Sculpture } from '@/types';

const sculpturesService = {
  addSculpture: async (sculpture: NewSculpture): Promise<Sculpture> => {
    try {
      const response = await fetch('https://tp-final-bienal.onrender.com/sculptures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sculpture),
      });
      if (!response.ok) {
        throw new Error('Failed to add sculpture');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getSculptures: async (): Promise<Sculpture[]> => {
    try {
      const response = await fetch('https://tp-final-bienal.onrender.com/sculptures');
      if (!response.ok) {
        throw new Error('Failed to get sculptures');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateSculpture: async (sculpture: ModifiedSculpture, id: string): Promise<Sculpture> => {
    try {
      const response = await fetch(`https://tp-final-bienal.onrender.com/sculptures?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sculpture),
      });
      if (!response.ok) {
        throw new Error('Failed to update sculpture');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteSculpture: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`https://tp-final-bienal.onrender.com/sculptures?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete sculpture');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  voteSculpture: async (id: string, calification: number): Promise<void> => {
    //hacer implementacion
  },
  // Es necesaria??
  getSculpturesByEvent: async (eventId: string): Promise<Sculpture[]> => {
    try {
      const response = await fetch(`https://tp-final-bienal.onrender.com/sculptures?eventId=${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to get sculptures by event');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default sculpturesService;
