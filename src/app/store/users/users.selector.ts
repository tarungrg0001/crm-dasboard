import { User } from '../../model/user';

export const getUsers = (state: { users: User[] }) => state.users;
