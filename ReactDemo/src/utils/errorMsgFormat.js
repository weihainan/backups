export default (msg) => {
    if (msg) {
        if (msg === 'Failed to fetch') {
            return '请检查网络是否异常.'
        }
    }
    return msg;
}
