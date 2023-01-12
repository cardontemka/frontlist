import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeContext";
import styles from './styles/Header.module.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
export const Header = () => {
    const { user, setUser, isPlaylistMenu, setIsPlaylistMenu, isAccountMenu, setIsAccountMenu, noMenus } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setUser({ email: localStorage.getItem('userEmail'), id: localStorage.getItem('userId') });
    }, []);

    const menuContain = () => {
        setIsAccountMenu(!isAccountMenu);
    }

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
        <div className={styles.header} style={{ display: location.pathname === '/login' ? "none" : location.pathname === '/signup' ? "none" : "flex" }} onClick={noMenus}>
            <IoIosArrowBack onClick={goBack} className={styles.arrow} />
            <IoIosArrowForward onClick={goForward} className={styles.arrow} />
            {user.id ?
                <div className={styles.buttonsCont}>
                    <div className={styles.grayButton} onClick={menuContain}>
                        <RiAccountCircleFill />
                        {user.email}
                        <MdArrowDropDown />
                    </div>
                    <div className={styles.menu} style={{ display: isAccountMenu ? "flex" : "none" }}>
                        <div className={styles.menuBar}>Account</div>
                        <div className={styles.menuBar}>Settings</div>
                        <div className={styles.menuBar} onClick={handleLogout}>Log out</div>
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