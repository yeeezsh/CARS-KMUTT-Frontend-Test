export interface Drawer {
    key: string,
    label: string,
    icon: string,
    link?: string,
    settings?: {
        iconSize?: number,
        labelColor: string,
    },
    sub?: Drawer[]
}