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

export declare interface New {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
}

export declare interface Auction {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
  url: string;
}

export declare interface Artist {
  id: number;
  title: string;
  about: string;
  date: string;
  url: string;
  image: string;
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
  evento_en_transcurso: string;
  foto1: string | File | null;
  foto2: string | File | null;
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

export declare interface Piece {
  id: number;
  titulo: string;
  fecha_creacion: Date;
  descripcion: string;
  material: string;
  id_escultor: number;
  id_evento: number;
  foto1: File | null | string;
  foto2: File | null | string;
  votacion_en_transcurso: string;
}

export declare type NewSculpture = Omit<
  Sculpture,
  'id' | 'qrCode' | 'qrExpiration'
>;

export declare type ModifiedSculpture = Partial<NewSculpture>;
