import moment from 'moment'

export const convertDate = time => {
    return moment(time).startOf('hour').fromNow();
}