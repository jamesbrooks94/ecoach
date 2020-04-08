const urls = {
  root: '/',
  lessons: {
    create: `/lesson/create`,
    edit: (id = ':id') => `/lesson/${id}/edit`,
    list: '/lesson/list',
    view: (id: string | number = ':id') => `/lesson/${id}`,
  },
  members: {
    edit: (id: string | number = ':id') => `/member/${id}/edit`,
    list: '/member/list',
    view: (id: string | number = ':id') => `/member/${id}`,
  },
}

export default urls
