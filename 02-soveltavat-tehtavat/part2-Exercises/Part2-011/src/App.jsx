import { useState , useEffect} from "react"
import Person from "./components/person"
import Filter from "./components/Filter"
import PersonForm from "./components/personForm"
import axios from "axios"

function App(){
  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNum, setNewNum] = useState('')

  const[searchedName, setSearchedName] = useState('')
  const[showAll, setShowAll]= useState(true)

useEffect(()=>{
  console.log("using effect")
axios
  .get('http://localhost:3001/persons')
  .then(response=>{
    console.log('promise fulfilled')
const persons = response.data;
setPersons(persons);
  })
}, []);

console.log('render', persons.length, 'persons')
  
    //IF showAll is true then show full persons list else filter to find the searched name
    var phonebookToShow= showAll
    ? persons
    :(persons.filter(person => 
      {
        const lowercaseName = person.name.toLowerCase();
        const lowercaseQuery = searchedName.toLowerCase();
        return lowercaseName.includes(lowercaseQuery); //check if name matches with the searched name(lower+ upper cases both checked here)
      }
      ))

  return(
    <div>
      <h2>Phonebook</h2>
    
      <Filter 
        searchedName={searchedName} 
        setSearchedName={setSearchedName}  
        showAll={showAll} 
        setShowAll={setShowAll}
      />

      <h3>add a new</h3>
      
      <PersonForm 
          key={persons.id}
          persons={persons} 
          setPersons={setPersons} 
          newName={newName} 
          setNewName={setNewName} 
          newNum= {newNum} 
          setNewNum={setNewNum}
          showAll={showAll}  
      />

      <h3>Numbers</h3>

      <Person 
      key={persons.id} 
      phonebookToShow={phonebookToShow} 
      />
      
    </div>
  )

}

export default App


















