import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

// const StyledAppLayout = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   grid-template-rows: auto 1fr;
//   height: 100dvh;
// `;

// const Main = styled.main`
//   background-color: var(--color-grey-100);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow: scroll;
//   overflow-x: hidden;
//   overflow-y: auto;
// `;

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;

function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
