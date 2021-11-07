const express = require('express')
const {v4: uuidv4} = require('uuid')
const mongoose = require('mongoose')
const MemberSchema = require('./models/member')

mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const Member = mongoose.model('Member', MemberSchema)

let MEMBERS = [
	{id: '1', name: 'Joe', email: 'joe@gmail.com'},
	{id: '2', name: 'Tim', email: 'tim@sd.com'},
	{id: '3', name: 'Wjies', email: 'wallet@outlok.com'},
]

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/api/members', (req, res) => {
	Member.find().exec((err, members) => {
		if (err) return res.status(500)
		return res.status(201).json(members)
	})
})


app.post('/api/member', (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({msg: 'Name and Email are required.'})
	} else {
		Member.create({
			id: uuidv4(),
			name: req.body.name,
			email: req.body.email
		}).then(() => {
			Member.find().exec((err, members) => {
				if (err) return res.status(500)
				return res.status(201).json(members)
			})
		})		
	}
})

app.del('/api/member/:id', (req, res) => {
	Member.find({id: req.params.id}).exec((err, member) => {
		if (err) return res.status(500)
		if (member.length < 1) res.status(400).json({msg: 'No member with such id'})
		Member.deleteOne({id: req.params.id}).exec((err1) => {
			if (err1) return res.status(500)			
			Member.find().exec((err2, members) => {
				if (err2) return res.status(500)
				return res.status(201).json(members)
			})
		})
	})
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))