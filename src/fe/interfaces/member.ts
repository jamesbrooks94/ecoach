import { ILesson } from './lesson'

export interface IMember {
  id: number
  firstName: string
  surname: string
  fullName: string
  lessons: any[]
  memberLessons: { lesson: ILesson }[]
}

export interface IMemberListData {
  data: {
    allMembers?: IMember[]
  }
  refetch: Function
}
