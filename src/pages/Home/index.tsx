import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";

import { HomeContainer, 
         StartCountDownButton,
         StopCountDownButton,
        } from './styles';
import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from './components/NewCycleForm';
import { CountDown } from './components/CountDown';

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
}

interface CyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPast: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds : number) => void; 

}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a Tarefa"),
    minutesAmount: zod
                   .number()
                   .min(1, "O ciclo precisa ser no minímo de 5 minutos")
                   .max(60, "O ciclo precisa ser no máximo 60min")
})

// Cria uma interface a partir da validacao do zod
type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string|null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState(0);


    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const newCycleForm = useForm<NewCycleFormDataProps>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset} = newCycleForm;

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
    

    function handleCreateNewCycle(data:NewCycleFormDataProps){
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
        reset();
    }

    function handleInterruptCycle(){
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

    // Controlled Component
    const task = watch("task"); 
    const isSubmitDisabled = !task


    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider     
                    value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPast, setSecondsPassed}}
                >
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <CountDown/>
                </CyclesContext.Provider>
                { activeCycle ? (
                    <StopCountDownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountDownButton>
                ): (
                    <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24}/>
                            Começar
                    </StartCountDownButton>
                )
                }
            </form>
        </HomeContainer>
    )
}