window.human_date = (d) ->
  date = new Date()
  time = Date.parse(d.replace(/\-/g, '/'))
  date.setTime(time)
  if date
    date.getDate() + " " + date.getMonthNameRelated()