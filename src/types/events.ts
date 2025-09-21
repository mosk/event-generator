export interface UserEvent {
  title: string
  desc: string
  /** YYYY-MM-DDThh:mm */
  dateStart: string
  /** YYYY-MM-DDThh:mm */
  dateEnd: string
  timezone: string
  remindValue?: number
  remindType?: 'minutes' | 'hours' | 'days'
  url?: string
  address?: string
}
