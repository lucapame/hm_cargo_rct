import styled from 'styled-components';

export const Table = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border: 0;
`;

export const TableBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin: 0 auto;
  border-radius: 1rem;
`;

export const TableHead = styled.div<{
  flex?: number;
}>`
  display: flex;
  flex: ${(props) => props.flex || 1};
  font-size: 14px;
  padding: 8px 8px;
  justify-content: start;
  align-items: center;
  transition: all 0.15s ease-in-out;
`;

export const TableRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
    /*   box-shadow: 0px 1px 4px rgba(0, 0, 0, .08); */
  }
`;

export const TableData = styled.div<{
  flex?: number;
}>`
  display: flex;
  flex: ${(props) => props.flex || 1};
  font-size: 14px;
  padding: 8px 8px;
  justify-content: start;
  align-items: center;
  transition: all 0.15s ease-in-out;
  word-break: break-all;
`;

export const TableDataSubContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  padding: 8px 0;
  border-bottom: 1px solid #dadada;

  &:last-child {
    border-bottom: 0;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;

  padding: 8px 0;
  font-weight: bold;
`;
