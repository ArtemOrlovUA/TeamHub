import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();

  function onSubmit({ fullName, email, password, linkedin }) {
    console.log({ fullName, email, password, linkedin });

    signup(
      { fullName, email, password, linkedin },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  return (
    <Form type="users" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Ваше повне ім'я" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Це поле повинно бути заповнене",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Електронна пошта" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Це поле повинно бути заповнене",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Буль ласка, введіть коректну електронну пошту",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Посилання на ваш LinkedIn"
        error={errors?.linkedin?.message}
      >
        <Input
          type="text"
          id="linkedin"
          {...register("linkedin", {
            required: "Це поле повинно бути заповнене",
            pattern: {
              value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
              message: "Посилання повинно починатися з https://www.linkedin.com або www.linkedin.com",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Пароль (минімум 8 символів)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Це поле повинно бути заповнене",
            minLength: {
              value: 8,
              message: "Пароль повинен містити мінімум 8 символів",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Повторіть пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Це поле повинно бути заповнене",
            validate: (value) =>
              value === getValues().password || "Паролі не співпадають",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isSigningUp}>Зареєструватися</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
