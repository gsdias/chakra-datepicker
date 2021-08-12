# A Datepicker built with Accessibility in mind

It supports single and range selection. Fully accessible. WIP and a few more features to come. Any feedback is welcome.

## Common usage
```js
  const [startDate, setStartDate] = useState<Date>(undefined);
  
  <DatePicker
    onChange={({startDate: value}) => setStartDate(value)}
	  startDate={startDate}
  />
```

## All properties
```js
  const ExampleCustomInput = forwardRef<HTMLButtonElement>(
    ({ value, onClick, className, onFocus }, ref) => (
      <input
        className={className}
        onClick={onClick}
        onFocus={onFocus}
        ref={ref}
        value={value}
      />
    ),
  )

  <DatePicker
    placeholder="Placeholder for input"
    excludedDates={[new Date('2021-01-01')]}
    startDate={new Date('2021-01-10')}
    endDate={new Date('2021-01-15')}
    yearRange={{
      start: 2020,
      end: 2022,
      isExtended: true
    }}
    onChange={({ startDate, endDate }) => {}}
    readonly
    isRange
    minDate={[new Date('2020-12-01')]}
    maxDate={[new Date('2021-03-20')]}
    input={<ExampleCustomInput />}
    peakMonths={false}
  />

```