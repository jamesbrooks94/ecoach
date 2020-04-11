import ejs from 'ejs'

interface IQueryResult {
  lesson: {
    application: number
    name: string
    cost: string
    day: string
    start_time: Date
    end_time: Date
  }
  member: {
    application: number
    first_name: string
    surname: string
    email: string
    memberid: number
  }
  application: number
  name: string
  cost: string
  day: string
  start_time: Date
  end_time: Date
  first_name: string
  surname: string
  email: string
  memberid: number
}

const CREATE_EMAIL = `INSERT INTO email(title, content_plain, content_html, member_id) VALUES ($1,$2,$3,$4)`
const GET_USERS = `
SELECT l.name, l.cost, l.day, l.start_time, l.end_time, m.first_name, m.surname, m.email, m.id as memberId
FROM public.lesson l
INNER JOIN public.member_lesson ml on ml.lesson_id = l.id
INNER JOIN public.member m on m.id = ml.member_id
WHERE l.application = $1 AND m.application = $1
`
const unescape = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')

export const generateEmails = async (applicationId: number, pgClient: any) => {
  const { rows: users } = await pgClient.query({
    text: GET_USERS,
    values: [applicationId],
  })
  const {
    rows: [email],
  } = await pgClient.query({
    text: 'SELECT * FROM email_templates WHERE application = $1',
    values: [applicationId],
  })

  //   email.content = '<p>asdasdasd <%= user.name %></p>'

  debugger

  const t = await Promise.all(
    users.map((row: IQueryResult) =>
      pgClient.query({
        text: CREATE_EMAIL,
        values: [email.subject, '', ejs.render(unescape(email.content), row), row.memberid],
      })
    )
  )

  console.log(users)

  debugger

  return true
}
