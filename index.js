const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
    
})

app.get('/info', (request,response) => {
  const length = persons.length
  const date = new Date()
  let formattedDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',  // Set timezone
      year: 'numeric',               // Show year
      month: '2-digit',              // Show month
      day: '2-digit',                // Show day
      hour: '2-digit',               // Show hour
      minute: '2-digit',             // Show minute
      second: '2-digit',             // Show second
      hour12: true                   // Use 12-hour format
  }).format(date)
  response.send(`<p>this page has infor for ${length} people</p>
      <p>${formattedDate}</p>`)
})

const doesNameExists = (name) => {
  const nameExists = persons.find(person => person.name === name)

  return nameExists
}

app.post('/api/persons', (request, response) => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => Number(n.id))) 
  : 0
  
  const person = request.body
  person.id = String(maxId + 1)

  if (person.number && person.name){
    persons = persons.concat(person)
  } else {
    return response.status(400).json({
      error: "name or number is missing"
    })
  }

  if(doesNameExists(person.name)){
    return response.status(400).json({
      error: "name already exists"
    })
  }
  
  response.json(person)

})

app.delete('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

