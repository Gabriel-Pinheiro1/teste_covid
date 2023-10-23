import { createContext, useContext, useReducer, ReactNode } from 'react';


const SharedStateContext = createContext<any>(null);


export function useSharedState() {
  return useContext(SharedStateContext);
}


interface SharedState {
  novoPacienteCadastrado: boolean;
}

const initialState: SharedState = {
  novoPacienteCadastrado: false, 
};


type SharedStateAction = { type: 'PACIENTE_CADASTRADO' };

function sharedStateReducer(state: SharedState, action: SharedStateAction) {
  switch (action.type) {
   
    case 'PACIENTE_CADASTRADO':
      return { ...state, novoPacienteCadastrado: true };
    default:
      return state;
  }
}


interface SharedStateProviderProps {
  children: ReactNode;
}

export function SharedStateProvider({ children }: SharedStateProviderProps) {
  
  const [state, dispatch] = useReducer(sharedStateReducer, initialState);

  return (
    <SharedStateContext.Provider value={{ state, dispatch }}>
      {children}
    </SharedStateContext.Provider>
  );
}