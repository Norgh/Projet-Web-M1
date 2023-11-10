import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models';

type UseListUsersProvider = {
  Users: PlainUserModel[];
  load: () => void;
};

export const useListUsers = (): UseListUsersProvider => {
  const [Users, setUsers] = useState<PlainUserModel[]>([]);

  const fetchUsers = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/Users`)
      .then((data) => setUsers(data.data));
  };

  return { Users, load: fetchUsers };
};

type UserProviders = {
  useListUsers: () => UseListUsersProvider;
};

export const useUsersProviders = (): UserProviders => ({
  useListUsers,
});
