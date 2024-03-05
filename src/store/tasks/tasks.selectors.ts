import { RootState } from '..'

export const isErrorSelector = (state: RootState) => state.tasks.isError
export const isLoadingSelector = (state: RootState) => state.tasks.isLoading
export const tasksSelector = (state: RootState) => state.tasks.tasks
export const errorsSelector = (state: RootState) => state.tasks.error
