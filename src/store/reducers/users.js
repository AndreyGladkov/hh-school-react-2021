import {RECEIVE_USERS} from '../../api/contributors'

const users = (state = [], action) => {
    console.log(action);
    console.log(state);
    switch(action.type){
       case RECEIVE_USERS:
        state = action.users;
           return state;
   //     // case "DECREMENT":
   //     //     return state - 1
        default: 
            return state
    }
}

export default users