import React, { forwardRef } from 'react'
import cn from 'classnames'
import { DayProps } from '../index.d'
import { Button } from './style'

export default forwardRef<HTMLButtonElement, DayProps>(
  (
    {
      ns,
      leftArrowRef,
      rightArrowRef,
      myRefs,
      day,
      selectedYear,
      selectedMonth,
      handleMonthChange,
      isRange,
      chosenStartDay,
      chosenEndDay,
      hoverDay,
      setChosenEndDay,
      setChosenStartDay,
      setHover,
      isExcludedDay,
      setNewDayFocus,
      convertedMinDate,
      convertedMaxDate,
    }: DayProps,
    ref,
  ) => {
    const checkChosen = (givenDate: number) => {
      if (
        chosenEndDay?.getMonth() === selectedMonth &&
        chosenEndDay.getFullYear() === selectedYear &&
        chosenEndDay.getDate() === givenDate
      ) {
        return {
          isValid: true,
          type: 'endDate',
        }
      }
      if (
        chosenStartDay?.getMonth() === selectedMonth &&
        chosenStartDay.getFullYear() === selectedYear &&
        chosenStartDay.getDate() === givenDate
      ) {
        return {
          isValid: true,
          type: 'startDate',
        }
      }
      return {
        isValid: false,
      }
    }
    const getNextFocus = (dayNumber: number, step: number) => {
      let i = step
      let newDay = new Date(selectedYear, selectedMonth, dayNumber + i)

      if (convertedMinDate && newDay.getTime() < convertedMinDate) {
        return 0
      }
      if (convertedMaxDate && newDay.getTime() > convertedMaxDate) {
        return 0
      }
      while (isExcludedDay(newDay)) {
        i += step
        newDay = new Date(selectedYear, selectedMonth, dayNumber + i)
      }
      return i
    }

    const inBetweenDay = (givenDay: Date) =>
      chosenStartDay &&
      chosenEndDay &&
      chosenStartDay.getTime() < givenDay.getTime() &&
      chosenEndDay.getTime() > givenDay.getTime()

    let todayDate = new Date()
    todayDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate(),
    )
    let borderValue = '0.375rem'
    const dayNumber = day + 1
    const formatDay = new Date(selectedYear, selectedMonth, dayNumber)
    const formatUnix = formatDay.getTime()
    const hoverDayUnix = hoverDay ? hoverDay.getTime() : 0
    const isDisabled = isExcludedDay(
      new Date(selectedYear, selectedMonth, dayNumber),
    )
    const isToday = formatUnix === todayDate.getTime()
    const isChosen = checkChosen(dayNumber)
    const isHoverSameDay = hoverDayUnix === formatUnix
    const isStartLessEqualDay =
      chosenStartDay && chosenStartDay.getTime() <= formatUnix
    const isHoverMoreEqualDay = formatUnix <= hoverDayUnix
    const chosenColorScheme =
      isRange &&
      ((isStartLessEqualDay && isHoverMoreEqualDay) ||
        inBetweenDay(new Date(selectedYear, selectedMonth, dayNumber)))
        ? 'blue'
        : ''
    const dayInRange =
      chosenColorScheme === 'blue' && !isChosen.isValid && !isHoverSameDay
    const variantType = isRange && !chosenEndDay ? 'outline' : 'solid'
    if (
      isRange &&
      ((chosenStartDay &&
        isChosen.isValid &&
        !isHoverSameDay &&
        hoverDayUnix > chosenStartDay.getTime()) ||
        (chosenEndDay && isChosen.isValid && isChosen.type === 'startDate'))
    ) {
      borderValue = `0.375rem 0 0 0.375rem`
    }
    if (
      isRange &&
      ((chosenStartDay &&
        isHoverSameDay &&
        isStartLessEqualDay &&
        hoverDayUnix !== chosenStartDay.getTime()) ||
        (isChosen.isValid && isChosen.type === 'endDate'))
    ) {
      borderValue = `0 0.375rem 0.375rem 0`
    }
    return (
      <Button
        ref={ref}
        className={cn(`${ns}__day`, {
          [`${ns}__day--today`]: isToday,
          [`${ns}__day--selected`]: isChosen.isValid,
          [`${ns}__day--disabled`]: isDisabled,
          [`${ns}__day--in-range`]: dayInRange,
        })}
        aria-selected={isChosen.isValid}
        disabled={isDisabled}
        variant={
          isChosen.isValid || chosenColorScheme === 'blue'
            ? variantType
            : 'ghost'
        }
        backgroundColor={isChosen.isValid ? 'cyan' : chosenColorScheme}
        onClick={() => {
          const newDay = new Date(selectedYear, selectedMonth, dayNumber)
          if (
            isRange &&
            chosenStartDay &&
            newDay.getTime() > chosenStartDay.getTime()
          ) {
            setChosenEndDay(newDay)
          } else {
            setChosenStartDay(
              isRange && newDay.getTime() === chosenStartDay?.getTime()
                ? undefined
                : newDay,
            )
            setChosenEndDay(undefined)
          }
        }}
        onMouseOver={() => {
          setHover(new Date(selectedYear, selectedMonth, dayNumber))
        }}
        onMouseOut={() => {
          setHover(undefined)
        }}
        onFocus={() => {
          setHover(new Date(selectedYear, selectedMonth, dayNumber))
        }}
        onBlur={() => {
          setHover(undefined)
        }}
        autoFocus={
          (isChosen.isValid && isChosen.type === 'startDate') ||
          (!chosenStartDay && isToday)
        }
        onKeyDown={(e) => {
          let newIndex = 0
          let newFocus = 0
          if (e.key === 'ArrowDown') {
            newIndex = dayNumber + getNextFocus(dayNumber, 7) - 1
            newFocus =
              new Date(selectedYear, selectedMonth, dayNumber + 7).getDate() - 1
          }
          if (e.key === 'ArrowRight') {
            newIndex = dayNumber + getNextFocus(dayNumber, 1) - 1
            newFocus = 0
          }
          if (e.key === 'ArrowUp') {
            newIndex = dayNumber + getNextFocus(dayNumber, -7) - 1
            newFocus =
              new Date(selectedYear, selectedMonth, dayNumber - 7).getDate() - 1
          }
          if (e.key === 'ArrowLeft') {
            newIndex = dayNumber + getNextFocus(dayNumber, -1) - 1
            newFocus = new Date(selectedYear, selectedMonth, 0).getDate() - 1
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (newIndex < myRefs.current.length && myRefs.current[newIndex]) {
              myRefs.current[newIndex]?.focus()
            } else {
              handleMonthChange({ increase: true })
              setNewDayFocus(newFocus)
            }
          }
          if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (newIndex > -1) {
              myRefs.current[newIndex]?.focus()
            } else {
              handleMonthChange({ increase: false })
              setNewDayFocus(newFocus)
            }
          }
          if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault()
            rightArrowRef.current.focus()
          } else if (e.key === 'Tab') {
            e.preventDefault()
            leftArrowRef.current.focus()
          }
        }}
        borderRadius={dayInRange ? 0 : borderValue}
      >
        {dayNumber}
      </Button>
    )
  },
)
