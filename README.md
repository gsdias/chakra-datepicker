# A Datepicker built with Chakra elements

It supports single and range selection. Fully accessible. WIP and a few more features to come. Any feedback is welcome.

## Common usage
```js
  const [startDate, setStartDate] = useState<Date>(undefined);
  
  <DatePicker
    onChange={()=>{}}
    isRange
  />
  <DatePicker
    onChange={({startDate: value}) => setStartDate(value)}
	startDate={startDate}
  />

```