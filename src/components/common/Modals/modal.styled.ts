import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.1s ease-in;
  background-color: var(--bg-color-modal);
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div<{
  $limitsize?: string | null;
}>`
  &::-webkit-scrollbar {
    width: 3px;
    height: 5px;
    background-color: transparent !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-lead);
    transition: 0.3s;
  }

  ::-webkit-scrollbar-thumb:hover {
    border-radius: 10px;
    background-color: var(--color-primary);
    transition: 0.3s;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent !important;
  }
  background-color: var(--bg-color);
  padding: 1rem;
  width: fit-content;
  min-width: 390px;
  max-height: 90%;
  overflow-y: scroll;
  border-radius: 0.8rem;
  max-width: ${({ $limitsize }) => $limitsize};
  animation: zoomInSmall 0.2s ease-in-out;

  @media (max-width: 600px) {
    min-width: 95%;
  }
`;

export const SideModalContainer = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: end;
  animation: fadeIn 0.1s ease-in;
  background-color: var(--bg-color-modal);
  backdrop-filter: blur(2px);
`;

export const SideModalContent = styled.div<{
  $limitsize?: string | null;
}>`
  background-color: white;
  padding: 1rem;
  width: fit-content;
  min-width: 50%;
  height: 100%;
  overflow-y: scroll;
  border-radius: 0.8rem;
  max-width: ${({ $limitsize }) => $limitsize};
  animation: slideInRight 0.2s ease-in-out;

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;
