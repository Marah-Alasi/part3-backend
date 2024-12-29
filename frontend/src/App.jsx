import { useEffect, useState } from 'react'
import { Name } from './components/Name'
import { Filter } from './components/Filter'
import { Form } from './components/Form'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [shown, setShown] = useState([])

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()

    const takenName = persons.find(person => person.name === newName)
    const takenNumber = persons.find(person => person.number === newNumber)

    if (takenName || takenNumber) {
      alert(`${newName} is already added to phonebook or ${newNumber} already exists`)
    } else {
      const newEntry = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newEntry)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

    }

  }

  const handleDeletion = (event) => {
    const person = persons.find(x => x.id === event.target.id)
    if (window.confirm(`${person.name} is about to be deleted, are you sure about that`)) {
      const updatedArray = persons.filter(person => person.id !== event.target.id)
      setPersons(updatedArray)
      personService.deletePerson(event.target.id)
    }


  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter function={handleSearchChange} value={newSearch} />
      <h3>add new people</h3>
      <Form onSubmit={addNewName} newName={newName} newNumber={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.includes(newSearch)).map(person => {
          return (
            <Name key={person.id} person={person} handleDeletion={handleDeletion} />
          )
        })}
      </ul>
    </div>
  )
}

export default App
