import { createFileRoute, Navigate } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'
import { useAuth } from '@/stores/authStore';

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignInComponent,
})

function SignInComponent() {
  const auth = useAuth();

  if (auth.user && auth.accessToken) {
    return <Navigate to='/' />
  } else {
    return <SignIn />
  }
}
