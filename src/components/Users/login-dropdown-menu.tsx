'use client'

import { useState } from "react"
import { LogIn, Mail, Lock, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export function LoginDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    // Handle login logic here
    console.log("Login attempted with:", values)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="bg-transparent text-white text-md hover:bg-white/10">
          <LogIn className="mr-2 h-4 w-4" />
          Ingresar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4 rounded-lg bg-black text-white/80 bg-opacity-40 backdrop-blur-sm border-black/10 shadow-lg" align="end" side="bottom" data-side="bottom" style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto' }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DropdownMenuLabel className="text-center text-lg font-bold">Login</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="space-y-3 py-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="text-sm bg-black/55 text-white border-white/20"
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
                        className="text-sm bg-black/55 text-white border-white/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-sm py-1 bg-white/70 bg-opacity-85 text-black hover:bg-white">
                Ingresar
              </Button>
            </DropdownMenuGroup>
          </form>
        </Form>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/reset-password" className="flex items-center text-sm hover:bg-white/10">
              <Lock className="mr-2 h-3 w-3" />
              <span>Restablecer contraseña</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/register" className="flex items-center text-sm hover:bg-white/10">
              <User className="mr-2 h-3 w-3" />
              <span>Registrarse</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}