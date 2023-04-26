import { useContext } from 'react';
import { 
        FormContainer,
        TaskInput,
        MinutesAmountInput
        } from './styles';
import { CyclesContext } from '../../../../Contexts/CyclesContext';
import { useFormContext } from 'react-hook-form';


export function NewCycleForm(){
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext()
    // register adiciona um input ao formlulário
    
    return(
        <FormContainer>
            <label htmlFor="task">Vou Trabalhar em</label>
            <TaskInput 
                id="task"
                list="task-suggestions"
                placeholder="De um nome para o seu projeto"
                disabled={!!activeCycle}
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
    )
}