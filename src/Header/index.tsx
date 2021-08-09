import React from 'react'
import { HeaderProps } from '../index.d'
import { Header, Button } from './style'

export default ({
  config,
  firstElementRef,
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
      ref={firstElementRef}
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
    <select
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
    </select>
    <select
      onChange={(e) => {
        setSelectedYear(Number(e.currentTarget.value))
      }}
      value={selectedYear}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
    {/* <Text>
{months[selectedMonth]} {currentDate.getFullYear()}
</Text> */}
    <Button
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
