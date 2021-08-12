import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  memo,
  forwardRef,
  useMemo,
} from 'react'
import { CalendarioProps, ConfigProps } from './index.d'
import Header from './Header'
import Day from './Day'
import Input from './Input'
import { ListDays, Root, Container, WeekDays } from './style'
import { getYearList } from './utils/year'
import { Button as DayStyled } from './Day/style'

const ns = 'datePicker'

function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default memo(
  forwardRef<HTMLDivElement, CalendarioProps>(
    (
      {
        placeholder,
        excludedDates = [],
        startDate,
        endDate,
        yearRange = {
          start: new Date().getFullYear() - 5,
          end: new Date().getFullYear() + 5,
          isExtended: true,
        },
        onChange = () => null,
        readonly = false,
        isRange = false,
        minDate,
        maxDate,
        input,
        peakMonths = true,
      }: CalendarioProps,
      ref,
    ) => {
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      const calendarRef = useRef() as MutableRefObject<HTMLDivElement>
      const inputRef = useRef() as MutableRefObject<HTMLInputElement>
      const leftArrowRef = useRef() as MutableRefObject<HTMLButtonElement>
      const rightArrowRef = useRef() as MutableRefObject<HTMLButtonElement>
      const myRefs = useRef<HTMLButtonElement[]>([])
      const [config, setConfig] = useState<ConfigProps>({
        days: [],
        spacer: [],
        totalDays: new Date(
          (startDate || new Date()).getFullYear(),
          (startDate || new Date()).getMonth() + 1,
          0,
        ).getDate(),
        firstDay: new Date(
          (startDate || new Date()).getFullYear(),
          (startDate || new Date()).getMonth(),
          1,
        ).getDay(),
        nextMonth: [],
      })
      const [isCalendarHidden, setCalendarVisibility] = useState(true)
      const [selectedMonth, setSelectedMonth] = useState(
        (startDate || new Date()).getMonth(),
      )
      const [selectedYear, setSelectedYear] = useState(
        (startDate || new Date()).getFullYear(),
      )
      const [chosenStartDay, setChosenStartDay] = useState<Date | undefined>(
        startDate,
      )
      const [chosenEndDay, setChosenEndDay] = useState<Date | undefined>(
        endDate,
      )
      const [hoverDay, setHover] = useState<Date | undefined>()
      const [newDayFocus, setNewDayFocus] = useState<number | undefined>()
      const [convertedMinDate, setConvertedMinDate] = useState<number>(0)
      const [convertedMaxDate, setConvertedMaxDate] = useState<number>(0)
      const [years, setYears] = useState<number[]>([])
      const [yearWindow, setYearWindow] = useState<number>(
        Math.floor(Math.abs(yearRange.end - yearRange.start) / 2),
      )

      useEffect(() => {
        let tempMinDate
        let tempMaxDate
        if (minDate) {
          tempMinDate = new Date(
            minDate.getFullYear(),
            minDate.getMonth(),
            minDate.getDate(),
          ).getTime()
          setConvertedMinDate(tempMinDate)
        }
        if (maxDate) {
          tempMaxDate = new Date(
            maxDate.getFullYear(),
            maxDate.getMonth(),
            maxDate.getDate(),
          ).getTime()
          setConvertedMaxDate(tempMaxDate)
        }
        setYears(
          getYearList({
            minDate,
            maxDate,
            yearWindow,
            selectedYear,
            yearRange,
          }),
        )
        setYearWindow(Math.floor(Math.abs(yearRange.end - yearRange.start) / 2))
      }, [minDate, maxDate])

      const cachedGetYearList = useMemo<number[]>(() => {
        return getYearList({
          minDate,
          maxDate,
          yearWindow,
          selectedYear,
          yearRange,
        })
      }, [minDate, maxDate, yearWindow, selectedYear])

      useEffect(() => {
        const currentDate = new Date(selectedYear, selectedMonth, 1)
        const newTotalDays = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        ).getDate()
        const newFirstDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        ).getDay()
        let previousMonthDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          -newFirstDay + 1,
        ).getDate()
        setConfig({
          ...config,
          totalDays: newTotalDays,
          firstDay: newFirstDay,
          days: [...Array(newTotalDays).keys()],
          spacer: [...Array(newFirstDay).keys()].map(() => {
            const day = previousMonthDay
            previousMonthDay += 1
            return day
          }),
          nextMonth: [
            ...Array(
              7 - ((config.days.length + config.spacer.length) % 7),
            ).keys(),
          ],
        })
        myRefs.current = []
        setYears(cachedGetYearList)
      }, [selectedMonth, selectedYear])

      useOnClickOutside(calendarRef, () => {
        if (isRange && !chosenEndDay) {
          setChosenStartDay(undefined)
        }
        setCalendarVisibility(true)
      })

      useEffect(() => {
        if (
          (isRange && chosenStartDay && chosenEndDay) ||
          (!isRange && chosenStartDay)
        ) {
          onChange({ startDate: chosenStartDay, endDate: chosenEndDay })
          inputRef.current.focus()
          setCalendarVisibility(true)
        }
      }, [chosenStartDay, chosenEndDay])

      const isExcludedDay = (day: Date) => {
        if (convertedMinDate && day.getTime() < convertedMinDate) {
          return true
        }
        if (convertedMaxDate && day.getTime() > convertedMaxDate) {
          return true
        }
        return (
          excludedDates.filter(
            (excludedDay: Date) =>
              excludedDay.getFullYear() === day.getFullYear() &&
              excludedDay.getMonth() === day.getMonth() &&
              excludedDay.getDate() === day.getDate(),
          ).length > 0
        )
      }

      const handleMonthChange = ({
        newValue,
        increase,
      }: {
        newValue?: number
        increase?: boolean
      }) => {
        let monthValue = newValue || selectedMonth
        let yearValue = selectedYear

        if (typeof newValue === 'undefined') {
          monthValue += increase ? 1 : -1
        }

        if (monthValue === -1) {
          monthValue = 11
          yearValue -= 1
        }
        if (monthValue === 12) {
          monthValue = 0
          yearValue += 1
        }

        if (convertedMinDate && minDate) {
          const minLimit = new Date(
            minDate.getFullYear(),
            minDate.getMonth(),
            1,
          ).getTime()
          const nextMonth = new Date(yearValue, monthValue, 1).getTime()
          if (nextMonth < minLimit) {
            return
          }
        }

        if (convertedMaxDate) {
          const nextMonth = new Date(yearValue, monthValue, 1).getTime()
          if (nextMonth > convertedMaxDate) {
            return
          }
        }

        setSelectedMonth(monthValue)
        setSelectedYear(yearValue)
      }

      const renderInput = input || <Input />

      return (
        <Root className={ns} ref={ref}>
          {React.isValidElement(renderInput) &&
            React.cloneElement(renderInput as React.ReactElement<any>, {
              className: `${ns}__input`,
              ref: inputRef,
              placeholder,
              readonly,
              onChange: () => null,
              onClick: () => setCalendarVisibility(false || readonly),
              onFocus: () => {
                setCalendarVisibility(false || readonly)
              },
              value: chosenStartDay
                ? `${chosenStartDay.getDate()} ${months[
                    chosenStartDay.getMonth()
                  ].substr(0, 3)} ${chosenStartDay.getFullYear()}${
                    isRange ? ' - ' : ''
                  }${
                    isRange && chosenEndDay
                      ? `${chosenEndDay.getDate()} ${months[
                          chosenEndDay.getMonth()
                        ].substr(0, 3)} ${chosenEndDay.getFullYear()}`
                      : ''
                  }`
                : '',
            })}
          {!isCalendarHidden && (
            <Container
              className={`${ns}__container`}
              ref={calendarRef}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  if (isRange && !chosenEndDay) {
                    setChosenStartDay(undefined)
                  }
                  inputRef.current.focus()
                  setCalendarVisibility(true)
                }
              }}
            >
              <Header
                config={config}
                leftArrowRef={leftArrowRef}
                rightArrowRef={rightArrowRef}
                myRefs={myRefs}
                selectedMonth={selectedMonth}
                setSelectedYear={setSelectedYear}
                selectedYear={selectedYear}
                handleMonthChange={handleMonthChange}
                months={months}
                years={years}
                ns={ns}
              />
              <div className={`${ns}__calendar`}>
                <WeekDays className={`${ns}__week-days`}>
                  {weekDays.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </WeekDays>
                <ListDays className={`${ns}__days`}>
                  {config.spacer.map((item: number) =>
                    peakMonths ? (
                      <DayStyled
                        disabled
                        key={item}
                        className={`${ns}__day ${ns}__day--disabled`}
                      >
                        {item}
                      </DayStyled>
                    ) : (
                      <div />
                    ),
                  )}
                  {config.days.map((day, index, { length }) => (
                    <Day
                      ref={(el: HTMLButtonElement) => {
                        myRefs.current[day] = el
                        if (newDayFocus === day && el) {
                          el.focus()
                          setNewDayFocus(undefined)
                        }
                      }}
                      key={day}
                      leftArrowRef={leftArrowRef}
                      rightArrowRef={rightArrowRef}
                      day={day}
                      isLast={index + 1 === length}
                      selectedYear={selectedYear}
                      selectedMonth={selectedMonth}
                      handleMonthChange={handleMonthChange}
                      isRange={isRange}
                      chosenStartDay={chosenStartDay}
                      chosenEndDay={chosenEndDay}
                      hoverDay={hoverDay}
                      myRefs={myRefs}
                      setChosenEndDay={setChosenEndDay}
                      setChosenStartDay={setChosenStartDay}
                      setHover={setHover}
                      ns={ns}
                      isExcludedDay={isExcludedDay}
                      setNewDayFocus={setNewDayFocus}
                      convertedMinDate={convertedMinDate}
                      convertedMaxDate={convertedMaxDate}
                    />
                  ))}
                  {peakMonths &&
                    config.nextMonth.map((item) => (
                      <DayStyled
                        disabled
                        key={item}
                        className={`${ns}__day ${ns}__day--disabled`}
                      >
                        {item + 1}
                      </DayStyled>
                    ))}
                </ListDays>
              </div>
            </Container>
          )}
        </Root>
      )
    },
  ),
)
