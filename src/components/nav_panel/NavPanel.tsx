import { BiArrowBack } from 'react-icons/bi';
import { FiLogIn } from 'react-icons/fi';
const NavPanel = () => {
    return (
        <div className='NavPanel'>
            <button className="NavPanel_back_btn center"><BiArrowBack /></button>
            <div className="NavPanel_information">
                <div className="info_top">
                    <div className="info_top_gameIcon">
                        <div className="gameIcon_img"></div>
                    </div>
                    <span>Race for Ginn</span>
                </div>
                <div className="info_bottom">
                    <span>@gameinn_bot</span>
                </div>
            </div>
            <button className='NavPanel_login_btn center'><FiLogIn /></button>
        </div>
    )
}
export default NavPanel