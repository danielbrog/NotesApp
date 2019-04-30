const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
	"Your notes..."
}

const listNotes = () => {
	const notes = loadNotes()

	console.log(chalk.yellow.underline.bold('Notes:'))

	notes.forEach((note) => {
		console.log(chalk.green.underline(note.title))
		console.log(note.body)
	})

}


const addNote = (title,body) => {
	const notes = loadNotes()

	const duplicateNote = notes.find((note) => note.title === title)

	
	if(!duplicateNote){
		notes.push({
			title: title,
			body: body
		})

		saveNotes(notes)
		console.log(chalk.green('New note added!'))
	}else {
		console.log(chalk.red('Note title taken!'))
	}
}

const removeNote = (title) => {
	
	const notes = loadNotes()

	const newNotes = notes.filter((note) => note.title !== title)

	if (notes.length == newNotes.length){
		console.log(chalk.red('Could not find title: ') + chalk.bold(title))
	}else{
		saveNotes(newNotes)
		console.log(chalk.green('Removing: ') + chalk.bold(title))
	}
}

const readNote = (title) => {
	const notes = loadNotes()

	const note = notes.find((note) => note.title === title)


	if(note){
		console.log(chalk.yellow.underline.bold('Note Found!'))
		console.log(chalk.green.underline(note.title))
		console.log(note.body)
	}else{
		console.log(chalk.red.bold('Note not found'))
	}
}
	

const loadNotes = () => {
	try{
		return JSON.parse(fs.readFileSync('notes.json').toString())
	} catch (e){
		return []
	}
}


const saveNotes = (notes) => {
	fs.writeFileSync('notes.json',JSON.stringify(notes))
}

module.exports = {
	listNotes: listNotes,
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	readNote: readNote
}
