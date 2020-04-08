import { IMember } from './member'

export interface ILesson {
  id: number
  name: string
  day: string
  startTime: string
  endTime: string
  cost: string
  lessonMembers: ILessonMember[]
}

export interface ILessonMember {
  id: number
  member: IMember
}

export interface ILessonsApiResponse {
  data: {
    allLessons?: ILesson[]
  }
  refetch: Function
}
