import styled, { css } from "styled-components";

const Form = styled.form`
  margin: 2rem 0;
  padding: 2.4rem;
  background-color: #ffffff;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  font-size: 1.2rem;

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 60rem;
    `}

  ${(props) =>
    props.type === "users" &&
    css`
      max-height: none;
    `}
`;

export default Form;
