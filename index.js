const express = require('express')
const {v4: uuidv4} = require('uuid')

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
	res.json(MEMBERS)
})


app.post('/api/member', (req, res) => {
	if (!req.body.name || !req.body.email) {
		return res.status(400).json({msg: 'Name and Email are required.'})
	} else {
		const newMember = {
			id: uuidv4(),
			name: req.body.name,
			email: req.body.email
		}

		MEMBERS.push(newMember)
		return res.status(201).json(MEMBERS)
	}
})

app.del('/api/member/:id', (req, res) => {
	if (MEMBERS.some(member => member.id === req.params.id)) {
		MEMBERS = MEMBERS.filter(member => member.id !== req.params.id)

		return res.json(MEMBERS)
	} else {
		res.status(400).json({msg: 'There is no member with that id.'})
	}
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))