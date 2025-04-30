export const persistStore = (store: any) => (next: any) => (action: any) => {
    console.log(store.getState());
    console.log(action.type);
    console.log(action.payload);
    next(action);
};
