import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/authContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import HeatScale from "../Layout/HeatScale";

const penIcon = <FontAwesomeIcon icon={faPen} />

const UpdateSauce = ({ propSauceData }) => {
    const authCtx = useContext(AuthContext);

    const [ sauceDataUpdate, setSauceDataUpdate ] = useState(propSauceData);
    const [ modify, setModify ] = useState(false);

    const nameInputRef = useRef();
    const manufacturerInputRef = useRef();
    const heatInputRef = useRef();
    const descriptionInputRef = useRef();
    const mainPepperInputRef = useRef();

    useEffect(() => {
        setSauceDataUpdate(propSauceData);
    }, [propSauceData])

    const modifyHandler = () => {
        setModify((modify) => !modify);
    }
    
    const changeHandler = () => {
        const enteredName = nameInputRef.current.value;
        const enteredManufacturer = manufacturerInputRef.current.value;
        const enteredHeat = heatInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredMainPepper = mainPepperInputRef.current.value;

        setSauceDataUpdate({
            ...propSauceData,
            'name': enteredName,
            'manufacturer': enteredManufacturer,
            'heat': enteredHeat,
            'description': enteredDescription,
            'mainPepper': enteredMainPepper
        })
    }

    const url = `http://localhost:5000/api/sauces/${propSauceData._id}`

    const confirmUpdate = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('userId', authCtx.userId);
        formData.append('name', sauceDataUpdate.name);
        formData.append('manufacturer', sauceDataUpdate.manufacturer);
        formData.append('heat', sauceDataUpdate.heat);
        formData.append('description', sauceDataUpdate.description);
        formData.append('mainPepper', sauceDataUpdate.mainPepper);
 
        await axios.put(url, formData, {
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        })
            .then(() => {
                modifyHandler();
                alert('Modification(s) enregistrée(s) !');
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return(
        <> <section className="form_container">
            {modify && <h1 className="sauce_page_header_title bold">Modifier la sauce</h1>}
            <form action="" id='update-sauce-infos' className="update_sauce_form"> 

            {!modify ?
                <header className="sauce_page_header">
                    <h1 className="sauce_page_header_title bold">{sauceDataUpdate.name}</h1>
                    {sauceDataUpdate.userId === authCtx.userId &&
                        <i onClick={modifyHandler} title='Éditer' className='sauce_page_header_icon sauce_page_header_icon_modify'>{penIcon}</i>
                    }
                </header>    
            : <>
                <label htmlFor="name" className="update_sauce_form_label bold">Nom :</label>
                    <br />
                    <input 
                        type='text'
                        name="name"
                        id="name"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.name}
                        ref={nameInputRef}
                        className='form_input update_sauce_form_input'
                    /> 
                </>}

                {!modify ? <>
                    <h2 className="sauce_page_content_manufacturer">By <span className="bold">{sauceDataUpdate.manufacturer}</span></h2>
                </> : <>
                <label htmlFor="manufacturer" className="update_sauce_form_label bold">Fabriquant :</label>
                    <br />
                    <input 
                        type='text'
                        name="manufacturer"
                        id="manufacturer"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.manufacturer}
                        ref={manufacturerInputRef}
                        className='form_input update_sauce_form_input'
                    /> 
                </>}

                
                {!modify ? <>
                    <p className="sauce_page_content_heat bold">Force :</p>
                    <div className='sauce_page_ratings'>
                        <HeatScale heat={sauceDataUpdate.heat} />
                    </div>
                </> : <>
                <label htmlFor="heat" className="update_sauce_form_label bold">Force : <span className="update_sauce_form_label_heat">{sauceDataUpdate.heat} / 5</span></label>
                    <br />
                    <input 
                        type='range'
                        name="heat"
                        id="heat"
                        min='1' max='5'
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.heat}
                        ref={heatInputRef}
                        className='update_sauce_form_input_range custom_slider'
                    />
                </>}
                <br />
                {!modify ? <>
                    <p className="sauce_page_content_desc_title bold sauce_page_content_desc_title_desc">Description :</p>
                    <p className="sauce_page_content_desc_content">{sauceDataUpdate.description}</p>
                </> : <>
                <label htmlFor="description" className="update_sauce_form_label bold">Description :</label>
                    <br />
                    <textarea 
                        name="description"
                        id="description"
                        rows='4' cols='100'
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.description}
                        ref={descriptionInputRef}
                        className='form_input update_sauce_form_input update_sauce_form_input_desc'
                    /> 
                </>}

                {!modify ? <>
                    <p className="sauce_page_content_desc_title bold">Piment principal :</p>
                    <p className="sauce_page_content_desc_content">{sauceDataUpdate.mainPepper}</p>
                </> : <>
                <label className="update_sauce_form_label bold">Piment principal :</label>
                <br />
                    <input 
                        type='text'
                        name="mainPepper"
                        id="mainPepper"
                        onChange={changeHandler}
                        defaultValue={sauceDataUpdate.mainPepper}
                        ref={mainPepperInputRef}
                        className='form_input update_sauce_form_input'
                    /> 
                </>}
                <br />
                {modify && 
                    <div className="update_sauce_form_buttons_container">
                        <button onClick={modifyHandler} className='update_sauce_form_button update_sauce_form_button_cancel'>Annuler</button>
                        <button type='submit' onClick={confirmUpdate} className='update_sauce_form_button update_sauce_form_button_confirm'>Enregistrer</button>
                    </div>
                }
            </form>
        </section> </>
    )
}

export default UpdateSauce