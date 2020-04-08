const urls = {
  root: '/',
  lessons: {
    create: `/lesson/create`,
    edit: (id = ':id') => `/lesson/edit/${id}`,
    list: '/lesson/list',
    view: (id: string | number = ':id') => `/lesson/view/${id}`,
  },
  members: {
    list: '/member/list',
    view: (id: string | number = ':id') => `/member/view/${id}`,
  },
}

export default urls
