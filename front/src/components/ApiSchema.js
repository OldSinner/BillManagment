const baseApi = 'http://localhost:5115';
export const Apischema = {
  register: baseApi + '/auth/register',
  login: baseApi + '/auth/login',
  bills: baseApi + '/bill',
  statistic: baseApi + '/statistic',
  summary: baseApi + '/statistic/summary',
};
