const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://marah:${password}@cluster0.h707d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)



const personSchema = new mongoose.Schema({
  number: String,
  name: String,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length>3){
  newName = process.argv[3]
  newNumber = process.argv[4]

  const person = new Person({
    number: newNumber,
    name: newName,
    important: true,
  })

  person.save().then(result => {
    console.log(`${newName} contact saved!`)
    mongoose.connection.close()
  })
}

if (process.argv.length===3){
  Person.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

