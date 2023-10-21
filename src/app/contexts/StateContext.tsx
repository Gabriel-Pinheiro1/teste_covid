import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Cria um contexto para compartilhar o estado entre componentes.
const SharedStateContext = createContext<any>(null);

// Um hook personalizado que permite que os componentes acessem o estado compartilhado.
export function useSharedState() {
  return useContext(SharedStateContext);
}

// Define o estado inicial do contexto.
interface SharedState {
  novoPacienteCadastrado: boolean;
}

const initialState: SharedState = {
  novoPacienteCadastrado: false, // Inicialmente, nenhum paciente foi cadastrado.
};

// Redutor que atualiza o estado com base nas ações.
type SharedStateAction = { type: 'PACIENTE_CADASTRADO' };

function sharedStateReducer(state: SharedState, action: SharedStateAction) {
  switch (action.type) {
    // Se a ação for 'PACIENTE_CADASTRADO', define novoPacienteCadastrado como verdadeiro.
    case 'PACIENTE_CADASTRADO':
      return { ...state, novoPacienteCadastrado: true };
    default:
      return state;
  }
}

// Componente que fornece o contexto e o estado compartilhado para os componentes filhos.
interface SharedStateProviderProps {
  children: ReactNode;
}

export function SharedStateProvider({ children }: SharedStateProviderProps) {
  // useReducer é usado para gerenciar o estado com o redutor.
  const [state, dispatch] = useReducer(sharedStateReducer, initialState);

  return (
    <SharedStateContext.Provider value={{ state, dispatch }}>
      {children}
    </SharedStateContext.Provider>
  );
}