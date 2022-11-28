const baseApi = 'http://localhost:5115';
export const Apischema = {
  register: baseApi + '/auth/register',
  login: baseApi + '/auth/login',
  bills: baseApi + '/bill',
  summary: baseApi + '/statistic/dashboard',
  category: baseApi + '/category',
  changePassword: baseApi + '/auth/password',
};
