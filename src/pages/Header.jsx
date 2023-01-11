import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeContext";
import styles from './styles/Header.module.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
export const Header = () => {
    const { user, setUser } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setUser({ email: localStorage.getItem('userEmail'), id: localStorage.getItem('userId') });
    }, []);

    const handleLogout = () => {
        setUser({});
        localStorage.removeItem('userEmail')
        localStorage.removeItem('userId')
        navigate("/");
        // signOut(auth)
        //     .then(() => {
        //         // Sign-out successful.
        //         navigate('/');
        //         console.log('Signed out successfully');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         // An error happened
        //     })
    }

    const goBack = () => {
        navigate(-1)
    }
    const goForward = () => {
        navigate(+1)
    }
    return (
        <div className={styles.header} style={{ display: location.pathname === '/login' ? "none" : location.pathname === '/signup' ? "none" : "flex" }}>
            <IoIosArrowBack onClick={goBack} className={styles.arrow} />
            <IoIosArrowForward onClick={goForward} className={styles.arrow} />
            {user.id ?
                <div className={styles.buttonsCont}>
                    <div className={styles.grayButton} >
                        <RiAccountCircleFill />
                        {user.email}
                        <MdArrowDropDown />
                    </div>
                </div>
                :
                <div className={styles.buttonsCont}>
                    <NavLink to="/signup" className={styles.textButton}>Sign up</NavLink>
                    <NavLink to="/login" className={styles.whiteButton}>Log in</NavLink>
                </div>
            }
        </div>
    )
}