import {Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/TodoPage';
import LogIn from './pages/LogInPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SignUp from './pages/SignUpPage';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path='/signUp' component={SignUp}/>
          <AuthProvider>
            <Route exact path="/todo" component={Tab1}/>
            <Route exact path='/' component={LogIn}/>
          </AuthProvider>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
