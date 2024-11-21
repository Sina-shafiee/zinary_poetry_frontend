export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },
  writer_panel: {
    root: {
      path: '/panel',
      getHref: () => '/panel',
    },
    dashboard: {
      path: '',
      getHref: () => '/panel',
    },
    poets: {
      path: 'poets',
      getHref: () => '/panel/poets',
    },
  },
};
