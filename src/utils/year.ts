import { YearRangeProps } from '../index.d'

type YearWindowRange = {
  yearRange: YearRangeProps
  yearWindow: number
}
type YearMinMaxSelected = {
  minDate?: Date
  maxDate?: Date
  selectedYear: number
}
type GetValidYear = {
  givenYear: number
}

export const getValidYear = ({
  minDate,
  maxDate,
  givenYear,
  selectedYear,
}: GetValidYear & YearMinMaxSelected): number => {
  return (!minDate || (minDate && givenYear >= minDate.getFullYear())) &&
    (!maxDate || (maxDate && givenYear <= maxDate.getFullYear()))
    ? Number(givenYear)
    : selectedYear
}
export const increaseYear = ({
  minDate,
  maxDate,
  selectedYear,
}: YearMinMaxSelected): number =>
  getValidYear({ minDate, maxDate, selectedYear, givenYear: selectedYear + 1 })
export const decreaseYear = ({
  minDate,
  maxDate,
  selectedYear,
}: YearMinMaxSelected): number =>
  getValidYear({ minDate, maxDate, selectedYear, givenYear: selectedYear - 1 })

export const getYearList = ({
  minDate,
  maxDate,
  yearWindow,
  selectedYear,
  yearRange: { start, end, isExtended },
}: YearMinMaxSelected & YearWindowRange) => {
  const yearList = []
  const limit = isExtended ? selectedYear + yearWindow : end
  for (
    let i = isExtended ? selectedYear - yearWindow : start;
    i <= limit;
    i += 1
  ) {
    if (
      (!minDate || (minDate && i >= minDate.getFullYear())) &&
      (!maxDate || (maxDate && i <= maxDate.getFullYear()))
    ) {
      yearList.push(i)
    }
  }
  return yearList
}

export default {
  getValidYear,
  getYearList,
  decreaseYear,
  increaseYear,
}
