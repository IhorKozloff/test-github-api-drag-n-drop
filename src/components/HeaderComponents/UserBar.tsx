import { RxAvatar } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelectorAndDispatch';
import { PrimaryButton } from './PrimaryButton';
import {onLogOut} from '../../redux/slices/authSlice';
import { clearIssueState } from '../../redux/slices/issuesSlice';
import Notiflix from 'notiflix';

export const UserBar = () => {
    const { isLogin, user } = useAppSelector(state => state.userStatus);
    const dispatch = useAppDispatch();
    
    const onLogOutBtnCLick= () => {
        dispatch(onLogOut());
        dispatch(clearIssueState());
        Notiflix.Notify.info('Good bye:)');
    };

    const unauthorizedContent = () => {
        return (
            <>
                <div className="user-avatar">
                    <RxAvatar/>
                </div>
                <div className="user-name">Unauthorized</div>
            </>
        );
    };

    const authorizedContent = () => {
        return (
            <>
                <div className="user-avatar w-12 h-12 rounded-full overflow-hidden">
                    <img src={`${user.avatar_img_url}`} alt="users demonstration"/>
                </div>
                <div className="user-name flex items-center justify-center gap-1">
                    <span>{user.first_name}</span>
                    <span>{user.second_name}</span>
                </div>
                <PrimaryButton onClick={onLogOutBtnCLick} title="LogOut"/>
            </>
        );
    };
    return  (
        
        <div className="flex gap-4 items-center">
            {isLogin === false && unauthorizedContent()}
            {isLogin === true && authorizedContent()}
        </div>
    );
};