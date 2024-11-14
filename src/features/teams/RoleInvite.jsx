/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { useInvite } from "./useInvite";

function RoleInvite({ role, team_id }) {
  const { invite } = useInvite();

  const { closeModal } = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    invite({
      email: data.email,
      role: role,
      team_id,
      status: "pending",
    });
    reset();
    closeModal();
  };

  return (
    <div>
      <p>Введіть пошту людини, котру ви хочете запросити на роль: {role}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />

        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <button type="submit">Запросити</button>
      </form>
    </div>
  );
}

export default RoleInvite;
