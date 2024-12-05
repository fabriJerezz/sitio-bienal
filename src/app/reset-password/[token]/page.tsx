import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
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
  const { token } = useParams();

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
      await 
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
    //   console.error('Error during registration:', error);
    //   setErrorMessage('Error al registrar usuario');
      setIsSubmitting(false);
      form.reset();
    }
  }

  console.log(token);
  return (
    <>
      <h1>Reestablecer contraseña</h1>
      <Card className="w-full max-w-xl bg-white bg-opacity-100 px-8 py-6 md:mt-8 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registrarse
          </CardTitle>
        </CardHeader>
        {successMessage && <p className="text-green-500 text-opacity-85 mb-4 text-start ml-6">{successMessage}</p>}
        {infoMessage && <p className="text-blue-800 text-opacity-75 mb-4 text-start ml-6">{infoMessage}</p>}
        {errorMessage && <p className="text-red-500 text-opacity-85 mb-4 text-start ml-6">{errorMessage}</p>}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <FormField
                                  control={form.control}
                                  name="password"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Contraseña</FormLabel>
                                      <FormControl>
                                        <Input type="password" placeholder="Ingrese su contraseña" {...field} />
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
                                        <Input type="password" placeholder="Confirme su contraseña" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Registrarse'}
              </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default ResetPasswordPage;
