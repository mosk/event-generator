export type TimeItem = 'minutes' | 'hours' | 'days'

export interface UserEvent {
  title: string
  desc: string
  /** YYYY-MM-DDThh:mm */
  dateStart: Date
  /** YYYY-MM-DDThh:mm */
  dateEnd: Date
  timezone: string
  remindValue?: number
  remindType?: TimeItem
  url?: string
  address?: string
}
