import './App.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ToDoList from './components/ToDoList/ToDoList';
import NewTaskBox from './components/NewTaskBox/NewTaskBox';

function App() {

  return (
    <>
      <Header/>
      <NewTaskBox/>
      
      <div id='to-to-list-container'>
        <ToDoList title="Monday"/>
        <ToDoList title="Tuesday"/>
        <ToDoList title="Wednesday"/>
        <ToDoList title="Thursday"/>
        <ToDoList title="Friday"/>
        <ToDoList title="Saturday"/>
        <ToDoList title="Sunday"/>
      </div>

      <Footer/>
    </>
  )
}

export default App
