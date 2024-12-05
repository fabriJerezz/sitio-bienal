'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'node_modules/zod/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import userService from '@/services/userService';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Indica qué campo genera el error
    message: 'Las contraseñas no coinciden',
  });

const ResetPasswordPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { token } : { token: string } = useParams();
  const [verified, setVerified] = useState(false);
  console.log(token);

  useEffect(() => {
    async function validToken() {
      try {
        const response = await fetch(
          `https://tp-final-bienal.onrender.com/password-reset/${token}/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          setVerified(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    validToken();
  }, [token]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    console.log(values);
    try {
      await userService.resetPassword(token, values.password);
      await form.reset();
      setSuccessMessage('Contraseña reestablecida con éxito!');
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
        setErrorMessage('Error al reestablecer contraseña');
        setTimeout(() => {
          setErrorMessage('');
        }, 2750);
      setIsSubmitting(false);
      form.reset();
    }
  }

  console.log(token);
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
          <Card className="w-full max-w-xl bg-white bg-opacity-100 px-8 py-6 md:mt-8 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Reestablecer contraseña
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
            {errorMessage && (
              <p className="text-red-500 text-opacity-85 mb-4 text-start ml-6">
                {errorMessage}
              </p>
            )}
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col justify-between gap-4">
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
                          <FormLabel>Confirmar Contraseña</FormLabel>
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
                    <Button
                      type="submit"
                      className="w-full mt-5"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Reestablecer contraseña'}
                    </Button>
                  </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordPage;
