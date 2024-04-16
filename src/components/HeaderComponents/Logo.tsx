import { IconContext } from 'react-icons';
import { LiaBuyNLarge } from 'react-icons/lia';

export const Logo = () => {
    return (
        <IconContext.Provider value={{ size: '64' }}>
            <div className="flex items-center">
                <LiaBuyNLarge/>
            </div>
        </IconContext.Provider>
    );
};