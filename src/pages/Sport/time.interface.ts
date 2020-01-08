import { Moment } from 'moment'
import Area from './area.interface'

interface TimeAreaReserveType {
    date: {
        start: Moment
        stop: Moment
        selected: Moment
    }
    areas: Area[]
    onSelectDate: any
    onSelectTime: any
    onSelectArea: any
}
export default TimeAreaReserveType