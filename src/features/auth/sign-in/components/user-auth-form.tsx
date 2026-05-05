import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/login.service'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'
import { getAdminByUsername } from '@/services/admin.service'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'İstifadəçi adınızı daxil edin' }),
  password: z
    .string()
    .min(1, {
      message: 'Şifrənizi daxil edin',
    })
}).superRefine(({ password }, ctx) => {
  if (password.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Şifrə ən az 8 simvol olmalıdır.',
      path: ['password'],
    })
  }

  if (!password.match(/[A-Z]/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Şifrədə ən az bir böyük hərf olmalıdır.',
      path: ['password'],
    })
  }

  if (!password.match(/[a-z]/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Şifrədə ən az bir kiçik hərf olmalıdır.',
      path: ['password'],
    })
  }

  if (!password.match(/\d/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Şifrədə ən az bir rəqəm olmalıdır.',
      path: ['password'],
    })
  }

  if (!password.match(/[^a-zA-Z0-9]/)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Şifrədə ən az bir xüsusi simvol olmalıdır.',
      path: ['password'],
    })
  }
});

export type UserAuth = z.infer<typeof formSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore((state) => state)
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data, variables) => {
      if (data) {
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          refreshTokenExpiryTime: data.refreshTokenExpiryTime,
        });

        const res = await getAdminByUsername(variables.username);
        if (res.success) {
          setUser(res.data); // Store admin details in authStore
        }
        navigate({ to: '/' });
      }
    },
    onError(error: unknown) {
      if (axios.isAxiosError(error)) {
        toast({ variant: 'destructive', title: error?.response?.data.message });
      } else {
        throw error;
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
