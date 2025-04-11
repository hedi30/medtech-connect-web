import axios from './axios';

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  userName: string;
  email: string;
  password: string;
}

export const UserService = {
  signIn: async (data: SignInData) => {
    const response = await axios.post('/signIn', data);
    return response.data;
  },

  signUp: async (data: SignUpData) => {
    const response = await axios.post('/signUp', data);
    return response.data;
  }
};
