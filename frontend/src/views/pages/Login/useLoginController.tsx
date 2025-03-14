import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório.")
    .email("O e-mail deve ser válido."),
  password: z
    .string()
    .nonempty("A senha é obrigatória.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log({ data });
  });

  return {
    errors,
    register,
    handleSubmit,
  };
}
