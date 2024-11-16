import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Light transparent white background on hover */
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: white; /* Set icon color to white */
    transition: color 0.2s;

    &:hover {
      color: var(--color-grey-300); /* Light grey color on hover */
    }
  }
`;

export default ButtonIcon;

