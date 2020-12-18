import React , {useState} from 'react';
import './App.css';
import Routes from './routes/Routes';

interface IProps {
 name:string; 
}

interface FormProps<T> {
  values:T;
  children: (values:T) => JSX.Element;
}

const Form =<T extends {}>({values,children}:FormProps<T>) => {
  return children(values);
}
const App:React.FC<IProps> = ({name}) => {

  return (
    <div className="App">
      <Form values = {{lastName:'Shrestha' ,firstName:'sush'}}>
        {(values) => (
          <div>
            {values.lastName};
          </div>
        )}
      </Form>
      <Routes/>
    </div>
  );
}

export default App;
