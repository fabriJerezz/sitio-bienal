'use client';

import { useState } from 'react';
import { LogIn, Lock, User, Mail, ArrowLeft, CloudLightning } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import userService from '@/services/userService';
import ResetPassword from '@/app/restablecer-contrasena/page';

const formSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Por favor, ingrese un email válido' }),
});

type FormValues = z.infer<typeof formSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function LoginDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const userStore = useUserStore();

  const onSubmit = async (values: FormValues) => {
    try {
      await userStore.login(values);
      setIsOpen(false);
    } catch (_) {
      setErrorMessage('Usuario o contraseña incorrectos');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };

  const onResetPasswordSubmit = async (values: ResetPasswordFormValues) => {
    try {
      console.log('email', values.email);
      await userService.resetPassword(values.email);
      setIsResetPassword(false);
      // Keep the dropdown open
      setIsOpen(true);
      // Reset the email field to be empty
      resetPasswordForm.reset({ email: '' });
    } catch (error) {
      setErrorMessage(`No se encontró un usuario con el email ${values.email}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      resetPasswordForm.reset({ email: '' });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset the form state when closing the dropdown
      setIsResetPassword(false);
      setErrorMessage(null);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="bg-transparent hover:text-white/80 focus:border-white/0 text-white text-md hover:bg-white/10"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Ingresar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 p-4 rounded-lg bg-black text-white/80 bg-opacity-40 backdrop-blur-sm border-black/10 shadow-lg"
        align="end"
        side="bottom"
        data-side="bottom"
        style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }}
      >
        {!isResetPassword ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DropdownMenuLabel className="text-center text-lg font-bold">
                Login
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="space-y-3 py-3">
                {errorMessage && !isResetPassword && (
                  <div className="text-red-500 text-sm text-center mb-2">
                    {errorMessage}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Usuario
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresá tu usuario"
                          {...field}
                          className="text-sm bg-black/55 text-white border-white/20"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Ingresá tu contraseña"
                          {...field}
                          className="text-sm bg-black/55 text-white border-white/20"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full text-sm py-1 bg-white/70 bg-opacity-85 text-black hover:bg-white"
                >
                  Ingresar
                </Button>
              </DropdownMenuGroup>
            </form>
          </Form>
        ) : (
          <Form {...resetPasswordForm}>
          <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}>
            <DropdownMenuLabel className="text-center text-lg font-bold">Reset Password</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-3 py-3">
              {errorMessage && (
                <div className="text-red-500 text-sm text-left mb-2">
                  {errorMessage}
                </div>
              )}

                    {isResetPassword ? (
                      <Form {...resetPasswordForm}>
                        <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}>
                          <DropdownMenuGroup className="space-y-3 py-3">
                            <FormField
                              control={resetPasswordForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    Email
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your email"
                                      {...field}
                                      className="text-sm bg-black text-white border-white/20"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </DropdownMenuGroup>
                        </form>
                      </Form>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <DropdownMenuLabel className="text-center text-lg font-bold">Login</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup className="space-y-3 py-3">
                            {errorMessage && (
                              <div className="text-red-500 text-sm text-center mb-2">
                                {errorMessage}
                              </div>
                            )}
                            <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    Usuario 
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Ingresá tu usuario"
                                      {...field}
                                      className="text-sm bg-black text-white border-white/20"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Password
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="Enter your password"
                                      {...field}
                                      className="text-sm bg-black text-white border-white/20"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" className="w-full text-sm py-1 bg-white text-black hover:bg-white/90">
                              Login
                            </Button>
                          </DropdownMenuGroup>
                        </form>
                      </Form>
                    )}

              <Button type="submit" className="w-full text-sm py-1 bg-white/70 bg-opacity-85 text-black hover:bg-white">
                Restablecer contraseña
              </Button>
            </DropdownMenuGroup>
            </form>
          </Form>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isResetPassword ? (
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full text-sm py-1 bg-transparent text-opacity-85 text-white hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResetPassword(false);
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al login
              </Button>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="w-full text-sm flex justify-start py-1 bg-transparent text-opacity-85 text-white hover:bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsResetPassword(true);
                    setErrorMessage(null);
                    resetPasswordForm.reset();
                  }}
                >
                  <Lock className="mr-2 h-3.5 w-3.5" />
                  <span>Restablecer contraseña</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/registro"
                  className="flex items-center text-sm hover:bg-white/10"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Registrarse</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
