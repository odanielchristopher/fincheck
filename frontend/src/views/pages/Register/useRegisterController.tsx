import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório.')
    .min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('O e-mail deve ser válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data });
  });

  return {
    errors,
    register,
    handleSubmit,
  };
}
