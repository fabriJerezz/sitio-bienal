import { ModifiedSculptor } from '@/types';

export declare interface UserAuthentication {
  username: string;
  password: string;
}

export declare interface UserReturnedData {
  username: string;
  token: string;
  role: string;
  country: string;
  staff: boolean;
}

export declare interface UserRegistration {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: string;
    country: string;
  };
  userExtra: {
    country: string;
    birthdate: string;
  };
}

declare interface UserStore {
  user: UserReturnedData | null;
  login: (user: UserAuthentication) => Promise<void>;
  logout: () => void;
}

export declare interface Event {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_final: string;
  lugar: string;
  descripcion: string;
  estado: string;
  portada: string | File;
}

export declare interface Sculptor {
  id: string | number;
  name: string;
  lastName: string;
  birthdate: string;
  nacionality: string;
  winnedEvents: number;
  image: string;
}

export declare type NewSculptor = Omit<Sculptor, 'id'>;

export declare type ModifiedSculptor = Partial<NewSculptor>;

export declare interface Sculpture {
  id: string | number;
  title: string;
  creationDate: string;
  qrCode: string;
  qrExpiration: {
    date: string;
    time: string;
  };
  material: string;
  sculptorId: number;
  eventId: number;
}

export declare type NewSculpture = Omit<
  Sculpture,
  'id' | 'qrCode' | 'qrExpiration'
>;

export declare type ModifiedSculpture = Partial<NewSculpture>;
