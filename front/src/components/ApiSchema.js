const baseApi = 'http://oldsinner.net/api';
export const Apischema = {
  register: baseApi + '/auth/register',
  login: baseApi + '/auth/login',
  bills: baseApi + '/bill',
  summary: baseApi + '/statistic/dashboard',
  pdf: baseApi + '/statistic/pdf',
  category: baseApi + '/category',
  changePassword: baseApi + '/auth/password',
  changeUsername: baseApi + '/auth/username',
};
