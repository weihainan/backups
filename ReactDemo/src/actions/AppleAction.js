export const BEGIN_PICK_APPLE = 'apple/BEGIN_PICK_APPLE'
export const DONE_PICK_APPLE = 'apple/DONE_PICK_APPLE'
export const FAIL_PICK_APPLE = 'apple/FAIL_PICK_APPLE'

export const EAT_APPLE = 'apple/EAT_APPLE'

let actions = {

    pickApple: ()=> {
        //在函数体内可以使用 dispatch 方法来发射其他action
        //在函数体内可以使用 getState 方法来获取当前的state
        return function (dispatch, getState) {

            /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
            if (getState().appleBasket.isPicking) {
                return;
            }

            /** 通知开始摘苹果 */
            dispatch(actions.beginPickApple());
            let url = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
            fetch(url)
                .then(res => {
                    if (res.status != 200) dispatch(
                        actions.failPickApple(res.statusText)
                    );
                    let weight = Math.floor(200 + Math.random() * 50);
                    dispatch(actions.donePickApple(weight));
                }).catch(e => {
                dispatch(actions.failPickApple(e.statusText));
            });
        }
    },
    beginPickApple: () => ({
        type: BEGIN_PICK_APPLE
    }),

    donePickApple: appleWeight => ({
        type: DONE_PICK_APPLE,
        payload: appleWeight
    }),

    failPickApple: errMsg => ({
        type: FAIL_PICK_APPLE,
        payload: new Error(errMsg),
        error: true
    }),

    eatApple: appleId => ({
        type: EAT_APPLE,
        payload: appleId
    })

};

export default actions;