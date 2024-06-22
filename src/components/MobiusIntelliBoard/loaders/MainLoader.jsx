import React, { useContext } from 'react'
import css from './MainLoader.module.scss'

import { MainContext } from '../../../MainContext/MainContext'

const MainLoader = ({ heading }) => {
    const { darkMode } = useContext(MainContext)
    return (
        <div className={css.loader} id={!darkMode && css.lightMode}>
            <p className={css.heading}>{`Loading ${heading}`}</p>
            <div className={css.loading}>
                <div className={`${css.dot} ${css.dot_1}`}></div>
                <div className={`${css.dot} ${css.dot_2}`}></div>
                <div className={`${css.dot} ${css.dot_3}`}></div>
                <div className={`${css.dot} ${css.dot_4}`}></div>
                <div className={`${css.dot} ${css.dot_5}`}></div>
            </div>
        </div>
    )
}

export default MainLoader