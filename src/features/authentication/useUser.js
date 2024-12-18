// import { useQuery } from '@tanstack/react-query';
// import { getCurrentUser } from '../../services/apiAuth';

// export function useUser() {
//   const { isLoading, data: user } = useQuery({
//     queryKey: ['user'],
//     queryFn: getCurrentUser,
//   });

//   return { user, isLoading, isAuth: user?.role === 'authenticated' };
// }

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuth: user?.role === "authenticated", refetch };
}
