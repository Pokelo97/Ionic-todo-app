import { useState,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {IonContent,IonFab, IonFabButton, 
  IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AddTodo from '../components/AddTodo';
import './TodoPage.css';
import { add,logOutOutline } from 'ionicons/icons';
import { auth ,db} from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const TodoPage = () => {
  const {user} = useAuth();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todoItem,setTodoItem]=useState({
    id:"",
    name:"",
    dueDate:"",
    priority:""
  })
  const [category,setCategory]=useState('')
  const handleChange = (prop:any) => (e:any) => {
    e.preventDefault();
  	setTodoItem({...todoItem, [prop]:e.target.value});
  };
  const handleCategory = (prop:string) =>(e:any) => {
    e.preventDefault();
    setCategory(prop)
  };
  const [todoList,setTodoList]=useState([
    {
      id:"",
      name:'',
      dueDate:'',
      priority:'',
      category:''
    }
  ])
  useEffect(()=>{
    if(!user){
        history.push('/')
        return;
    }
    try {
      
      db.collection(`/todos/${user.uid}/todos`).onSnapshot((snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type==='added'){
              console.log('New todo')
              const values={
                id:change.doc.id,
                name:change.doc.data().name,
                dueDate:change.doc.data().dueDate,
                priority:change.doc.data().priority,
                category:change.doc.data().category
              } 
              setTodoList(todoList => [...todoList, values])
          }
          if(change.type==='modified'){
            console.log('Modified todo')
          }
          if(change.type==='removed'){
            console.log('Removed todo')
          }
        })
        const unsubscribe =  db.collection(`/todos/${user.uid}/todos`).onSnapshot((snapshot)=>{})
        unsubscribe()
      })
    } catch (error) {
      console.log(error)
    }
},[user,history])

  const handleRemove = (id:string) => {
    
    db.collection(`/todos/${user.uid}/todos`).doc(id).delete()
    const newTodo = todoList.filter((item) => item.id !==id);
    setTodoList(newTodo);
  };
  const editTaskHandle = (value:any)=>{
      db.collection(`/todos/${user.uid}/todos`).doc(value.id).set({
        id:value.id,
      name:value.name,
      dueDate:value.dueDate,
      priority:value.priority,
      category:value.category
      })
      
    const newTodo = todoList.filter((item) => item.id !==value.id);
    setTodoList(newTodo);
    setTodoList(todoList => [...todoList, value])
    setShowEditModal(false)
  }

  const addTask =()=>{
    if(todoItem.name.length>=1 && todoItem.dueDate.length>=1 && todoItem.priority.length>=1 && category.length>=1){
      let newTodo={
        name:todoItem.name,
        dueDate:todoItem.dueDate,
        priority:todoItem.priority,
        category:category
      }
      
      db.collection('/todos').doc(user.uid).collection('/todos').add(newTodo)
      .then(()=>console.log('todo added'))
      setShowModal(false)
    }else{
      console.log("nnn")
    }
  }

  const handleLogOut = async()=>{
    await auth.signOut()
  }
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle >Todo App</IonTitle>
            <IonIcon icon={logOutOutline} slot="end" className="ioc-padding" size="large" onClick={handleLogOut} />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen >
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Todo App</IonTitle>
            </IonToolbar>
          </IonHeader>
          {todoList.map(item =>(item.id.length>=1&&
            <ExploreContainer
              id={item.id} 
              name={item.name}
              dueDate={item.dueDate}
              priority={item.priority}
              category={item.category}
              showEditModal={showEditModal}
              handleRemove={handleRemove}
              setShowEditModal={setShowEditModal}
              editTaskHandle={editTaskHandle}
            />)
          )}
          <AddTodo
            showModal={showModal}
            setShowModal={setShowModal}
            todoItem={todoItem}
            handleChange={handleChange}
            handleCategory={handleCategory}
            category={category}
            addTask={addTask}
          />
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="tertiary" onClick={() => setShowModal(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
  );
};

export default TodoPage;
