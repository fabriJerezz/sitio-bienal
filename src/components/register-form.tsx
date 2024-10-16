'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "s/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "s/components/ui/form"
import { Input } from "s/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "s/components/ui/select"
import { ChevronDown } from 'lucide-react'

// This would typically come from a real API or database
const countries = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  // Add more countries as needed
]

const formSchema = z.object({
  usuario: z.string().min(3, { message: 'El usuario debe tener al menos 3 caracteres' }),
  pais: z.string().min(1, { message: 'Por favor seleccione un país' }),
  email: z.string().email({ message: 'Ingrese un email válido' }),
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  apellido: z.string().min(1, { message: 'El apellido es requerido' }),
})

export function RegisterFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usuario: '',
      pais: '',
      email: '',
      nombre: '',
      apellido: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      // Here you would typically send the data to your backend
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Registrarse</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="usuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre de usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ingrese su email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su apellido" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Registrarse'}
          </Button>
        </form>
      </Form>
    </div>
  )
}