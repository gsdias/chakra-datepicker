export interface ConfigProps {
  days: number[]
  spacer: number[]
  totalDays: number
  firstDay: number
}
export interface HeaderProps {
  ns: string
  config: ConfigProps
  myRefs: any
  firstElementRef: any
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
  firstElementRef: any
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
  forceFocus?: boolean
  isLast: boolean
  handleMonthChange: any
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
}
