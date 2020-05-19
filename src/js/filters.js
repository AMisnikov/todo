const filters = {
    text: '',
    hideCompleted: false
};

const getFilters = () => filters;

const setFilters = (updates) => {
    if(typeof updates.text === 'string') {
        filters.text = updates.text;
    }

    if(typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted;
    }
};

export { getFilters, setFilters };