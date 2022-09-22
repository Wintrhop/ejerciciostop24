
import Button from './components/Button';
import Counter from './components/Counter';
import Posts from './components/Posts';
import Text from './components/Text';
import InputText from './components/InputText';

import { decrement, increment } from './store/reducers/Count.reducer'

import './App.css';

//Principios
//  Almacenamiento centralizado
//  Estados predecibles
//  Debuggleable
//  Flexible


function App() {
  return (
    <div className="App">
      <h1>Configuración redux-toolkit en nuestro proyecto</h1>
      <Counter />
      <Button type={increment}>Incrementar</Button>
      <Button type={decrement}>Decrementar</Button>
      <Text />
      <InputText />
      <Posts />
    </div>
  );
}

export default App;
