import {
    CURRENT_PAGE_DATA,
} from '../actions/types';

export default function (state = {}, actions) {

    switch (actions.type) {

        case CURRENT_PAGE_DATA:
            return actions.payload || {};

        default:
            return state;

    }

}