export interface UserEvent {
  title: string
  desc: string
  /** YYYY-MM-DDThh:mm */
  dateStart: Date
  /** YYYY-MM-DDThh:mm */
  dateEnd: Date
  timezone: string
  remindValue?: number
  remindType?: 'minutes' | 'hours' | 'days'
  url?: string
  address?: string
}
