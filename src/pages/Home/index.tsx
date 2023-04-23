import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";
import { differenceInSeconds } from 'date-fns'

import { HomeContainer, 
         FormContainer,  
         CountDownContainer, 
         Separator,
         StartCountDownButton,
         TaskInput,
         MinutesAmountInput
        } from './styles';
import { Play } from 'phosphor-react';

import { number } from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a Tarefa"),
    minutesAmount: number()
                   .min(5, "O ciclo precisa ser no minímo de 5 minutos")
                   .max(60, "O ciclo precisa ser no máximo 60min")
})

// Cria uma interface a partir da validacao do zod
type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string|null>(null);
    const [amountSecondsPast, setAmountSecondsPast] = useState(0)
    // register adiciona um input ao formlulário
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormDataProps>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(() => {
        let interval : number;
        if(activeCycle){
            interval = setInterval(() => {
                setAmountSecondsPast(
                    differenceInSeconds(new Date, activeCycle.startDate)
                )
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle])

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

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60; 
    // Método que prenche uma string até uma tamanho específico com um caracther
    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    // Controlled Component
    const task = watch("task"); 
    const isSubmitDisabled = !task


    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>
                    <TaskInput 
                        id="task"
                        placeholder="De um nome para o seu projeto"
                        list="task-suggestions"
                        {...register("task")}
                    />
                    <datalist id="task-suggestions">
                        <option value="Projeto 1"></option>
                        <option value="Projeto 2"></option>
                        <option value="Projeto 3"></option>
                        <option value="Projeto 4"></option>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount"
                        step={5}
                        min={5}
                        max={60}
                        {...register("minutesAmount", { valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
            

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24}/>
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}