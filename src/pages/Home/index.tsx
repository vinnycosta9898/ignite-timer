import { Play } from 'phosphor-react';
import { HomeContainer, 
         FormContainer,  
         CountDownContainer, 
         Separator,
         StartCountDownButton,
         TaskInput,
         MinutesAmountInput
        } from './styles';

export function Home(){
    return(
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou Trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        placeholder="De um nome para o seu projeto"
                    />
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput type="number" id="minutesAmount" />
                    <span>minutos.</span>
                </FormContainer>
            

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountDownButton type="submit" disabled>
                    <Play size={24}/>
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}