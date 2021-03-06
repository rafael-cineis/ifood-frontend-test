import styled from 'styled-components'

export const InputWrapper = styled.div`
  > input {
    width: 100%;
    font-size: 14px;
    height: 32px;
    background: none;
    border: none;
    outline: none;
    border-bottom: 2px solid;
    padding: 0;

    &:focus {
      border-bottom-color: ${(props) => props.theme.blue};
    }
  }
`
