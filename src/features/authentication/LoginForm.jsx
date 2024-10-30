import { useState } from "react";
import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoadingAuth } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Електронна пошта" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          placeholder="Уведіть електронну пошту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoadingAuth}
        />
      </FormRow>
      <FormRow label="Пароль" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Уведіть пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoadingAuth}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button disabled={isLoadingAuth} size="large">
          {!isLoadingAuth ? "Увійти" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
