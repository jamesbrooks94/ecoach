interface IQueryResult {
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

const create_query = `INSERT INTO email(title, content_plain, content_html, member_id) VALUES ($1,$2,$3,$4)`

export const generateEmails = async (applicationId: number, pgClient: any) => {
  const result = await pgClient.query({
    text: `
    SELECT l.name, l.cost, l.day, l.start_time, l.end_time, m.first_name, m.surname, m.email, m.id as memberId
    FROM public.lesson l
    INNER JOIN public.member_lesson ml on ml.lesson_id = l.id
    INNER JOIN public.member m on m.id = ml.member_id
    WHERE l.application = $1 AND m.application = $1
    `,
    values: [applicationId],
  })

  await Promise.all(
    result.rows.map((row: IQueryResult) =>
      pgClient.query({
        text: create_query,
        values: ['Title', 'plain content', '<>HTML content</>', row.memberid],
      })
    )
  )

  console.log(result.rows)

  debugger
}
