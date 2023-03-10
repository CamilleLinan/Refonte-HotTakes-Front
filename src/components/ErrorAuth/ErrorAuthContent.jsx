import { NavLink } from 'react-router-dom';

const ErrorAuthContent = () => {
    return(
        <div className='bg_section errorAuth_container'>
            <h1 className='errorAuth_container_title'>Vous devez être connecté pour accéder à cette page !</h1>
            <NavLink end to='/login' title='login'>
                <button className='btn_form bold'>S'inscrire / Se connecter</button>
            </NavLink>
        </div>
    )
}

export default ErrorAuthContent