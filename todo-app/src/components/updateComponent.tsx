import { IonModal, IonButton, IonIcon, IonToolbar, 
    IonTitle, IonHeader, IonContent, IonCard, IonItem,
     IonTextarea, IonLabel, IonSelect, IonSelectOption,
      IonDatetime, IonChip} from '@ionic/react';
import { briefcase,  calendarOutline, close, home, person, pricetag } from 'ionicons/icons';

interface props {
    showModal:boolean,
    setShowModal:Function,
    todoItem:{
        id:string
        name:string,
        dueDate:string,
        priority:string
    },
    handleChange:Function,
    handleCategory:Function
    category:string,
    editTaskHandle:(items:any)=>void
  }
const EditTodo = (props:props) => {

  return (
    <IonModal isOpen={props.showModal} cssClass='my-custom-class'>
        <IonHeader>
          <IonToolbar>
            <IonTitle >Edit Todo</IonTitle>
            <IonIcon icon={close} slot="end" className="ioc-padding" size="large" onClick={() => props.setShowModal(false)}/>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonCard>
                <IonItem>
                    <IonTextarea placeholder="Write your task here" value={props.todoItem.name} onIonChange={props.handleChange('name')}/>
                </IonItem>
                <IonItem>
                    <IonLabel>Priorty</IonLabel>
                    <IonSelect value={props.todoItem.priority} placeholder="Select One" onIonChange={props.handleChange('priority')}>
                        <IonSelectOption value="low">Low</IonSelectOption>
                        <IonSelectOption value="middle">Middle</IonSelectOption>
                        <IonSelectOption value="high">High</IonSelectOption>
                    </IonSelect>
                </IonItem>
                
                <IonItem>
                    <IonIcon icon={calendarOutline} slot="start"/>
                    <IonLabel>Due Date</IonLabel>
                    <IonDatetime displayFormat="D-MMM-YYYY" value={props.todoItem.dueDate} onIonChange={props.handleChange('dueDate')}></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonIcon icon={pricetag} slot="start"></IonIcon>
                    <IonLabel>Category</IonLabel>
                    <span>{props.category}</span>
                </IonItem>
                <IonItem>
                    <IonChip onClick={props.handleCategory('Home')}>
                        <IonIcon icon={home}/>
                        <IonLabel>Home</IonLabel>
                    </IonChip>
                    <IonChip onClick={props.handleCategory('Work')}>
                        <IonIcon icon={briefcase}/>
                        <IonLabel>Work</IonLabel>
                    </IonChip>
                    <IonChip onClick={props.handleCategory('Personal')}>
                        <IonIcon icon={person} />
                        <IonLabel>Personal</IonLabel>
                    </IonChip>
                </IonItem>
                <IonButton 
                    className="ion-margin" 
                    color="tertiary"
                    shape='round' 
                    size="default"
                    expand="block" 
                    onClick={()=>props.editTaskHandle({id:props.todoItem.id,name:props.todoItem.name,dueDate:props.todoItem.dueDate,priority:props.todoItem.priority,category:props.category})}
                    >Update Tesk</IonButton>
            </IonCard>
        </IonContent>
    </IonModal>
  );
};
export default EditTodo