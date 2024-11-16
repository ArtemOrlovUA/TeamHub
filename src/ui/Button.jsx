// src/components/Button.js
import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1rem 2rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: white;
    background-color: #140D2D;
    border: 1px solid white;

    &:hover {
      background-color: white;
      color: #140D2D;
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 9999px; /* Full rounded corners */
  transition: all 0.3s ease-in-out;
  text-align: center;
  font-family: 'Montserrat-Bold', 'Montserrat-Regular', sans-serif; /* Montserrat font applied */
  box-shadow: var(--shadow-sm);
  margin-top: 0.5rem;

  ${(props) => variations[props.variation]}
  ${(props) => sizes[props.size]}
`;


Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
