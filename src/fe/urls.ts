const urls = {
  root: '/',
  lessons: {
    create: `/lesson/create`,
    edit: (id = ':id') => `/lesson/edit/${id}`,
    list: '/lesson/list',
    view: (id = ':id') => `/lesson/view/${id}`,
  },
  members: {
    list: '/member/list',
    view: (id = ':id') => `/member/view/${id}`,
  },
}

export default urls
