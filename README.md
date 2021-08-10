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