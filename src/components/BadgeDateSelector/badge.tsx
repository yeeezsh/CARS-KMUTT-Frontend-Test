import React from 'react'
import blueCheckedIcon from '../../assets/icons/checked.blue.svg'

const styles = (active: boolean): React.CSSProperties => {
    return {
        position: 'absolute',
        marginLeft: '55px',
        width: '20px',
        visibility: active ? 'visible' : 'hidden',
    }
}


const Badge: React.FunctionComponent<
    { active: boolean }
> = (props) => {
    return (
        <React.Fragment>
            <img
                src={blueCheckedIcon}
                alt="blue-checked"
                style={styles(props.active)}
            />
            {props.children}
        </React.Fragment>

    )
}

export default Badge
