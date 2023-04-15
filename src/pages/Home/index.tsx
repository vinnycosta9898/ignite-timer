import { Play } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HomeContainer, 
         FormContainer,  
         CountDownContainer, 
         Separator,
         StartCountDownButton,
         TaskInput,
         MinutesAmountInput
        } from './styles';

export function Home(){
    // register adiciona um input ao formlulário
    const { register, handleSubmit, watch } = useForm();

    function handleCreateNewCycle(data:any){
        console.log(data)
    }

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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24}/>
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}