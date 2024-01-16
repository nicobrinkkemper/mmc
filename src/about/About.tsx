
import { default as classes } from './About.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseSvg } from './CloseSvg';
import { Content } from "../copy/Content";

export const About = () => {
    const location = useLocation()
    const navigate = useNavigate()
    if (location.hash !== '#!/about') return null
    return (
        <div className={classes.outer} >
            <div className={classes.main}>
                <div className={classes.inner}>
                    <div className={classes.header}>
                        <button className={classes.close} onClick={() => navigate(location.pathname)}>
                            <CloseSvg />
                        </button>
                    </div>
                    <div className={classes.body}>
                        <div>
                            <Content.About />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
