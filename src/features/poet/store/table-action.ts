import { DataTableRowAction } from '@/types';
import { create } from 'zustand';
import { NonNullablePoetType } from '../api/get-poets';

interface TableActionState {
  state: DataTableRowAction<NonNullablePoetType> | null;
  updateAction: (newState: DataTableRowAction<NonNullablePoetType>) => void;
  clearAction: () => void;
}

export const usePoetsTableAction = create<TableActionState>()(set => ({
  state: null,
  updateAction: newState => {
    set({ state: newState });
  },
  clearAction: () => {
    set({ state: null });
  },
}));
