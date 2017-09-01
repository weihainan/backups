export function getItem(name) {
    return !(name && localStorage.getItem(name)) ? false : JSON.parse(localStorage.getItem(name));
}

export function remove(name) {
    localStorage.removeItem(name);
}

export function setItem(name, value) {
    if (name && value) {
        localStorage.setItem(name, JSON.stringify(value))
    }
}
