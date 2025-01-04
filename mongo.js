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

const person = new Person({
  number: '000-777-555',
  name: 'Jane Doe',
  important: true,
})

note.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})