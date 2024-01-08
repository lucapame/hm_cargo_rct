import styled from 'styled-components';

export const InputGroup = styled.div`
  /* border: 1px #c3cfd5; */
  background-color: var(--color-gray6);
  border-radius: 50px;
  padding: 0 0.5em;
`;

export const Input = styled.input`
  &:focus {
    border: none;
    background-color: transparent;
    color: var(--text-color);
  }
  border: none;
  padding: 0.5em 1em;
  background-color: transparent;
  width: 100%;
  caret-color: var(--text-color);
  color: var(--text-color);

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--text-color);
    opacity: 0.5; /* Firefox */
  }
`;

export const Icon = styled.span`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0.2em 1em;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
