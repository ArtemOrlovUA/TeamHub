import styled, { css } from 'styled-components';

const Row = styled.div`
  ${(props) => {
    return (
      props.type === 'hor' &&
      css`
        display: flex;
        flex-direction: row;
        gap: 3rem;
        justify-content: space-between;
        align-items: center;
      `
    );
  }}

  ${(props) => {
    return (
      props.type === 'vert' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
        gap: 1.5rem;
      `
    );
  }}

  ${(props) => {
    return (
      props.type === 'updateUser' &&
      css`
        display: flex;
        flex-direction: column;

        padding-bottom: 20px;
        gap: 1.5rem;
      `
    );
  }}

${(props) => {
    return (
      props.as === 'header' &&
      css`
        display: flex;
        justify-content: space-between;
        padding-right: 4rem;
      `
    );
  }}
`;

Row.defaultProps = {
  type: 'hor',
};

export default Row;
