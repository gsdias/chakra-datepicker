import React from 'react'
import { HeaderProps } from '../index.d'
import { Header, Button, Select } from './style'
import { getValidYear } from '../utils/year'

export default ({
  config,
  leftArrowRef,
  rightArrowRef,
  myRefs,
  handleMonthChange,
  selectedMonth,
  setSelectedYear,
  selectedYear,
  months,
  years,
  ns,
}: HeaderProps) => (
  <Header className={`${ns}__header`}>
    <Button
      type="button"
      ref={leftArrowRef}
      aria-label="Previous month"
      onClick={() => {
        handleMonthChange({ increase: false })
      }}
      onKeyDown={(e) => {
        if (e.shiftKey && e.key === 'Tab') {
          e.preventDefault()
          myRefs.current[config.totalDays - 1].focus()
        }
      }}
    >
      &larr;
    </Button>
    <Select
      onChange={(e) => {
        handleMonthChange({ newValue: Number(e.currentTarget.value) })
      }}
      value={selectedMonth}
    >
      {months.map((month: string, index: number) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </Select>
    <Select
      onChange={(e) => {
        setSelectedYear(
          getValidYear({
            givenYear: Number(e.currentTarget.value),
            selectedYear,
          }),
        )
      }}
      value={selectedYear}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
    {/* <Text>
{months[selectedMonth]} {currentDate.getFullYear()}
</Text> */}
    <Button
      ref={rightArrowRef}
      type="button"
      aria-label="Next month"
      onClick={() => {
        handleMonthChange({ increase: true })
      }}
    >
      &rarr;
    </Button>
  </Header>
)
