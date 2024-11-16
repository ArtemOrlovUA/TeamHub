/* eslint-disable react/prop-types */
import { Form } from 'react-router-dom';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 0.5rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-family: 'Montserrat-Regular', sans-serif; /* Apply Montserrat-Regular */
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  font-family: 'Montserrat-Bold', sans-serif; /* Apply Montserrat-Bold */
`;

function FormRow({ label, children, error }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
