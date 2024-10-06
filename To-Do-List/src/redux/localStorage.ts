export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("tasksState");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

export const saveStateToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("tasksState", serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};
