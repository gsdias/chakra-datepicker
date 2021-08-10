import React, {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  memo,
  forwardRef,
} from 'react'
import { SimpleGrid, useOutsideClick, Spacer, Text } from '@chakra-ui/react'
import { CalendarioProps, ConfigProps } from './index.d'
import Header from './Header'
import Day from './Day'
import Input from './Input'
import { ListDays, Root, Container } from './style'

const ns = 'datePicker'

export default memo(
  forwardRef<HTMLDivElement, CalendarioProps>(
    (
      {
        excludedDates = [],
        startDate,
        endDate,
        yearRange = {
          start: new Date().getFullYear() - 5,
          end: new Date().getFullYear() + 5,
        },
        onChange = () => null,
        readonly = false,
        isRange = false,
        minDate,
        maxDate,
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

      const years = []

      for (let i = yearRange.start; i <= yearRange.end; i += 1) {
        years.push(i)
      }

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

      useEffect(() => {
        if (minDate) {
          setConvertedMinDate(
            new Date(
              minDate.getFullYear(),
              minDate.getMonth(),
              minDate.getDate(),
            ).getTime(),
          )
        }
        if (maxDate) {
          setConvertedMaxDate(
            new Date(
              maxDate.getFullYear(),
              maxDate.getMonth(),
              maxDate.getDate(),
            ).getTime(),
          )
        }
      }, [minDate, maxDate])

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
        setConfig({
          ...config,
          totalDays: newTotalDays,
          firstDay: newFirstDay,
          days: [...Array(newTotalDays).keys()],
          spacer: [...Array(newFirstDay).keys()],
        })
        myRefs.current = []
      }, [selectedMonth, selectedYear])

      useOutsideClick({
        ref: calendarRef,
        handler: () => {
          if (isRange && !chosenEndDay) {
            setChosenStartDay(undefined)
          }
          setCalendarVisibility(true)
        },
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

      return (
        <Root className={ns} ref={ref}>
          <Input
            ns={ns}
            ref={inputRef}
            readonly={readonly}
            onChange={() => null}
            onClick={() => setCalendarVisibility(false || readonly)}
            onFocus={() => {
              setCalendarVisibility(false || readonly)
            }}
            value={
              chosenStartDay
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
                : ''
            }
          />
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
                <SimpleGrid
                  className={`${ns}__week-days`}
                  columns={7}
                  spacing={0}
                  justifyItems="center"
                  mt={1}
                  mb={1}
                >
                  {weekDays.map((text) => (
                    <Text fontSize="xs" color="gray.300" key={text}>
                      {text}
                    </Text>
                  ))}
                </SimpleGrid>
                <ListDays className={`${ns}__days`}>
                  {config.spacer.map((item: number, index) => (
                    <Spacer key={`${item}${index}`} />
                  ))}
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
                </ListDays>
              </div>
            </Container>
          )}
        </Root>
      )
    },
  ),
)
