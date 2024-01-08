import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border: none;
  border-radius: 1rem;
`;

export const TableHead = styled.thead`
  border-radius: 1rem;
  border: none !important;
  border-color: transparent !important;
`;

export const TableRow = styled.tr`
  height: 3rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-gray6) !important;
    border-radius: 100px;
  }
`;

export const TableData = styled.td`
  padding: 0.75rem;

  vertical-align: middle;
  border: none !important;
`;

export const TableHeader = styled.th`
  padding: 0.75rem;
  vertical-align: middle;
  text-transform: uppercase;
  font-size: 0.8rem;
`;
