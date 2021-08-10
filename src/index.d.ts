import { MutableRefObject } from 'react'

export interface ConfigProps {
  days: number[]
  spacer: number[]
  totalDays: number
  firstDay: number
}
export interface InputProps {
  ref: MutableRefObject<HTMLInputElement>
  value?: string
  onChange?(): void
  ns: string
  readonly: boolean
  onClick(): void
  onFocus(): void
}
export interface HeaderProps {
  ns: string
  config: ConfigProps
  myRefs: any
  leftArrowRef: any
  rightArrowRef: any
  months: string[]
  years: number[]
  selectedMonth: number
  handleMonthChange: any
  selectedYear: number
  setSelectedYear(year: number): void
}
export interface DayProps {
  ns: string
  myRefs: any
  leftArrowRef: any
  rightArrowRef: any
  day: number
  selectedYear: number
  selectedMonth: number
  isRange: boolean
  chosenStartDay?: Date
  chosenEndDay?: Date
  hoverDay?: Date
  setChosenEndDay(givenDay?: Date): void
  setChosenStartDay(givenDay?: Date): void
  setHover(givenDay?: Date): void
  isExcludedDay(givenDay: Date): boolean
  setNewDayFocus(newIndex?: number): void
  isLast?: boolean
  handleMonthChange: any
  convertedMinDate?: number
  convertedMaxDate?: number
}
export interface CalendarioProps {
  excludedDates?: Date[]
  startDate?: Date
  endDate?: Date
  yearRange?: {
    start: number
    end: number
  }
  onChange?({ startDate, endDate }: { startDate?: Date; endDate?: Date }): void
  readonly?: boolean
  isRange?: boolean
  minDate?: Date
  maxDate?: Date
}
