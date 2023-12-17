
import { default as classes } from './About.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContent } from '../content/useContent';
import { CloseSvg } from './CloseSvg';
import "./accordion.css";

export const About = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const AboutContent = useContent('AboutContent')
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
                            <AboutContent />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
