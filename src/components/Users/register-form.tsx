'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import userService from '@/services/userService';
import { UserRegistration } from '@/types';
import { useRouter } from 'next/navigation';

const countries = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
];

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'El usuario debe tener al menos 3 caracteres' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string(),
    country: z.string().min(1, { message: 'Por favor seleccione un país' }),
    email: z.string().email({ message: 'Ingrese un email válido' }),
    firstName: z.string().min(1, { message: 'El nombre es requerido' }),
    lastName: z.string().min(1, { message: 'El apellido es requerido' }),
    birthdate: z
      .string()
      .min(1, { message: 'La fecha de nacimiento es requerida' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Indica qué campo genera el error
    message: 'Las contraseñas no coinciden',
  });

export function RegisterFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      country: '',
      email: '',
      firstName: '',
      lastName: '',
      birthdate: '',
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const finalUserObject = {
      user: {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
      userExtra: {
        country: values.country,
        birthdate: values.birthdate,
      },
    };
    try {
      await userService.registerUser(finalUserObject as UserRegistration);
      form.reset();
      setSuccessMessage('Usuario registrado con éxito!');
      setTimeout(() => {
        setSuccessMessage('');
        setInfoMessage('Redirigiendo a la página de inicio...');
      }, 1500);
      setTimeout(() => {
        setInfoMessage('');
        router.push('/');
      }, 3500);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl bg-black bg-opacity-100 px-8 py-6 md:mt-8 transition-all duration-300 text-white">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-bold text-center bg-black py-2 w-full  rounded-lg ">
            Sing Up Account
          </CardTitle>
        </CardHeader>
        {successMessage && (
          <p className="text-green-500 text-opacity-85 mb-4 text-start ml-6">
            {successMessage}
          </p>
        )}
        {infoMessage && (
          <p className="text-blue-800 text-opacity-75 mb-4 text-start ml-6">
            {infoMessage}
          </p>
        )}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="tracking-wider">Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese su nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="tracking-wider">Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese su apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-3">
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="tracking-wider">
                        Fecha de nacimiento
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Ingrese su fecha de nacimiento"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="tracking-wider">País</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione su país" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <span className="flex items-center">
                                <span className="mr-2">{country.flag}</span>
                                {country.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Ingrese su email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su nombre de usuario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row justify-between gap-3 ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Ingrese su contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirme su contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black py-8 text-xl :hover:bg-black :hover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Registrarse'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
