import React, { useContext } from 'react'
import css from './SmallLoader.module.scss'
import { MainContext } from '../../../MainContext/MainContext'


const SmallLoader = () => {
    const { darkMode } = useContext(MainContext)
    return (
        <div className={css.loader} id={!darkMode && css.lightMode}>
            <div className={css.bar1}></div>
            <div className={css.bar2}></div>
            <div className={css.bar3}></div>
            <div className={css.bar4}></div>
            <div className={css.bar5}></div>
            <div className={css.bar6}></div>
            <div className={css.bar7}></div>
            <div className={css.bar8}></div>
            <div className={css.bar9}></div>
            <div className={css.bar10}></div>
            <div className={css.bar11}></div>
            <div className={css.bar12}></div>
        </div>
    )
}

export default SmallLoader