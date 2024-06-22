import React, { useContext } from 'react'
import css from './StoriesSkeletonLoading.module.scss'
import { MainContext } from '../../../MainContext/MainContext'

const StoriesSkeletonLoading = ({ storiesLength }) => {
const {darkMode} = useContext(MainContext)
    return (
        <div className={`${css.mainContainer}`} id={!darkMode && css.lightMode}>
            <p className={css.skeletonLoading}></p>
            <div className={css.loading}>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        <p className={css.skeletonLoading}></p>
                    </span>
                    <div className={`${css.content} }`}>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                        <div className={`${css.card}`}>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                            <p className={css.skeletonLoading}></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoriesSkeletonLoading