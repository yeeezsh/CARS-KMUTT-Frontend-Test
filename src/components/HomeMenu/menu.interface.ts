export default interface Menu {
    label: string,
    icon: string,
    setting?: {
        center?: boolean,
        color?: string
    }
}