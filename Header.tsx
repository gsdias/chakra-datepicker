import React from 'react'
import { Flex, Button, Select } from '@chakra-ui/react'
import { HeaderProps } from './index.d'

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
  <Flex
    className={`${ns}__header`}
    justifyContent="space-between"
    alignItems="center"
    gap={6}
  >
    <Button
      ref={firstElementRef}
      aria-label="Previous month"
      variant="outline"
      onClick={() => {
        handleMonthChange({ increase: false })
      }}
      onKeyDown={(e) => {
        if (e.shiftKey && e.key === 'Tab') {
          e.preventDefault()
          myRefs.current[config.totalDays - 1].focus()
        }
      }}
      size="sm"
    >
      &larr;
    </Button>
    <Select
      onChange={(e) => {
        handleMonthChange({ newValue: Number(e.currentTarget.value) })
      }}
      size="sm"
      width="auto"
      value={selectedMonth}
    >
      {months.map((month, index) => (
        <option key={month} value={index}>
          {month}
        </option>
      ))}
    </Select>
    <Select
      onChange={(e) => {
        setSelectedYear(Number(e.currentTarget.value))
      }}
      size="sm"
      width="auto"
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
      aria-label="Next month"
      variant="outline"
      onClick={() => {
        handleMonthChange({ increase: true })
      }}
      size="sm"
    >
      &rarr;
    </Button>
  </Flex>
)
