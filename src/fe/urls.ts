const urls = {
  root: '/',
  members: {
    list: '/member/list',
    view: (id = ':id') => `/member/view/${id}`,
  },
  lessons: {
    list: '/lesson/list',
    view: (id = ':id') => `/lesson/view/${id}`,
    edit: (id = ':id') => `/lesson/edit/${id}`,
  },
}

export default urls
