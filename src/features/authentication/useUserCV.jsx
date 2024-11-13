import { useUser } from './useUser';

export function useUserCV() {
  const { user } = useUser();

  const cvUrl = user?.user_metadata?.cv
    ? `https://qpwpyyjgjxspyivcnljp.supabase.co/storage/v1/object/public/cvs/${user.user_metadata.cv}`
    : null;

  return { cvUrl };
}
