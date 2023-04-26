import { createContext, ReactNode, useState } from "react";

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
}

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface CyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPast: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds : number) => void;
    createNewCycle: (data: CreateCycleData) => void; 
    interruptCurrentCycle: () => void;
}

interface CycleContextProviderProps{
    children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CycleContextProviderProps){

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string|null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPast(seconds)
    }

    function markCurrentCycleAsFinished(){
        setCycles( state => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            })
        )
    }

    function createNewCycle(data:CreateCycleData){
        const id = String(new Date().getTime())
        const newCycle : Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id);
        setAmountSecondsPast(0);
        //reset();
    }

    function interruptCurrentCycle(){
        setCycles( state => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }

    return(
        <CyclesContext.Provider     
            value={{
                    activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished, 
                    amountSecondsPast, 
                    setSecondsPassed,
                    createNewCycle,
                    interruptCurrentCycle
                  }}
        >
            {children}
        </CyclesContext.Provider>
    )
}