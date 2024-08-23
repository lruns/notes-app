import {ComponentType, useEffect, useState} from "react";
import styles from "./with_loading.module.css"

interface WithLoadingProps {
    loading: boolean;
}

const LoadingSpinner = ({animEnd}) => {
    const classNames = animEnd ? [styles.loadingContainer, styles.unvisible] : [styles.loadingContainer];
    return (
        <div className={classNames.join(" ")}>
            <div className={styles.ring}/>
            <div className={styles.ring}/>
            <div className={styles.ring}/>
            <span>Loading...</span>
        </div>
    );
}

const withLoading = <P extends object>(Component: ComponentType<P>) => {
    return (props: WithLoadingProps) => {
        const {loading} = props;
        const [animEnd, setAnimEnd] = useState(false);

        useEffect(() => {
            if (!loading) {
                setAnimEnd(true);
            }
        }, [loading]);

        const classNames = animEnd ? [styles.mainContent, styles.visible] : [styles.mainContent];
        return (
            <>
                <LoadingSpinner animEnd={animEnd}/>
                <div className={classNames.join(" ")}><Component {...props as P}/></div>
            </>
        );
    }
}

export default withLoading;