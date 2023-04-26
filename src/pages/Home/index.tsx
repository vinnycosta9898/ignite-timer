import { useContext } from 'react';
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
import { CyclesContext } from '../../Contexts/CyclesContext';


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

    const { activeCycle, createNewCycle, interruptCurrentCycle, } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormDataProps>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset} = newCycleForm;

    // Controlled Component
    const task = watch("task"); 
    const isSubmitDisabled = !task

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(createNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                <CountDown/>
                { activeCycle ? (
                    <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
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