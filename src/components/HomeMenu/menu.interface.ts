export default interface Menu {
    label: string,
    icon: string,
    setting?: {
        center?: boolean,
        backgroundColor?: string,
        labelColor?: string,
    }
}