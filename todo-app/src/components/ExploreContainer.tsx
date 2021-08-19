import { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
   IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react';
import './ExploreContainer.css';
import { ellipse, pencilOutline, trashOutline} from 'ionicons/icons';
import EditTodo from './updateComponent'

interface props {
  id:string,
  name:string,
  dueDate:string,
  priority:string,
  category:string,
  showEditModal:boolean
  setShowEditModal:Function,
  handleRemove:(id:string) => void,
  editTaskHandle:(item:any)=> void
}
const ExploreContainer = (props:props) => {
  const [showModal, setShowModal] = useState(false);
  const [todoItem,setTodoItem]=useState({
    id:props.id,
    name:props.name,
    dueDate:props.dueDate,
    priority:props.priority
  })
  const [category,setCategory]=useState(props.category)
  const handleChange = (prop:any) => (e:any) => {
    e.preventDefault();
  	setTodoItem({...todoItem, [prop]:e.target.value});
  };
  const handleCategory = (prop:string) =>(e:any) => {
    e.preventDefault();
    setCategory(prop)
  };

  
  return (
    <div>
      <IonCard className="ion-margin" key={props.id}>
        <IonCardHeader>
          <IonCardSubtitle style={{color:props.priority==='high'?'red':(props.priority==='low'?'green':'orange')}}>
            {props.category}
          </IonCardSubtitle>
          <IonItem>
            <IonIcon color={props.priority==='high'?'danger':(props.priority==='low'?'success':'warning')} size="small" icon={ellipse}></IonIcon>
            <IonLabel>{props.name}</IonLabel>
          </IonItem>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel>Due {props.dueDate}</IonLabel>
        </IonCardContent>
        <IonRow>
          <IonItem  onClick={() => props.setShowEditModal(true)}>
            <IonIcon icon={pencilOutline}></IonIcon>
            <p>Edit</p>
          </IonItem>
          <IonItem onClick={()=>props.handleRemove(props.id)}>
            <IonIcon color="danger" icon={trashOutline}></IonIcon>
            <p>Cancle</p>
          </IonItem>
        </IonRow>
      </IonCard>
      
      <EditTodo
            showModal={props.showEditModal}
            setShowModal={props.setShowEditModal}
            todoItem={todoItem}
            handleChange={handleChange}
            handleCategory={handleCategory}
            category={category}
            editTaskHandle={props.editTaskHandle}
          />
    </div>
  );
};

export default ExploreContainer;
