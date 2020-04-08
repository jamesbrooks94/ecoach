import { ILesson } from './lesson'

export interface IMember {
  id: number
  firstName: string
  surname: string
  fullName: string
  memberLessons: IMemberLesson[]
}

interface IMemberLesson {
  id: number
  lesson: ILesson
}

export interface IMemberListData {
  data: {
    allMembers?: IMember[]
  }
  refetch: Function
}
