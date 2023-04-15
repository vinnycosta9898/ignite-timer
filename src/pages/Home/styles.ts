import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    color: ${(props) => props.theme["gray-100"]}
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`

const BaseInput = styled.input`
    height: 2.5rem;

    background: transparent;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme["gray-500"]}
    color: ${(props) => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    padding: 0 0.5rem;

    &:focus{
        box-shadow: none;
        border-color: ${(props) => props.theme["green-500"]}
    }

    &::placeholder{
        color: ${(props) => props.theme["gray-500"]};
    }
`

export const TaskInput = styled(BaseInput)`
    background: transparent;
    flex: 1;
`

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`

export const CountDownContainer = styled.div`
    color: ${(props) => props.theme['gray-100']};
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    
    display: flex;
    gap: 1rem;
    
    span {
        background: ${(props) => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`
export const Separator = styled.div`
    padding: 2rem 0;
    color: ${(props) => props.theme['green-500']};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const StartCountDownButton = styled.button`
    width: 100%;
    
    background: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme["gray-100"]};
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:disabled{
        cursor: not-allowed;
        opacity: 0.7;
    }

    &:not(:disabled):hover{
        background: ${(props => props.theme["green-700"])};
    }
`