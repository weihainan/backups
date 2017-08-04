export default ()=> {
    let admin = JSON.parse(localStorage.getItem('admin'))
    if (admin === null) {
        return '';
    }
    let auth = admin.id + '-' + admin.token;
    return auth;
};
