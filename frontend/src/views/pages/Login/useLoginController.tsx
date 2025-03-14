import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { authService } from '../../../app/services/auth';
import { SigninParams } from '../../../app/services/auth/signin';

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: signin, isPending: isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => authService.signin(data),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signin(data);

      console.log({ accessToken });
      toast.success('Usuário autenticado!');
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    errors,
    isLoading,
    register,
    handleSubmit,
  };
}
