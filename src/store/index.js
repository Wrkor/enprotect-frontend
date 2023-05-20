import {createStore} from "vuex";
import { alert } from './alert';
import { authentication } from './authentication';
import { globalConstants } from './globalConstants';
import { account } from './account';

export default createStore({
    modules: {
        globalConstants,
        authentication,
        alert,
        account,
    }
});
