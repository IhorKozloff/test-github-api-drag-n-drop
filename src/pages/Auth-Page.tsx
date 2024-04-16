import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { IUser, onLoginSuccesss } from '../redux/slices/authSlice';
import { useAppDispatch } from '../hooks/useSelectorAndDispatch';
import { generate } from 'random-words';
import _ from 'lodash';
import { PrimaryButton } from '../components/HeaderComponents/PrimaryButton';

interface JwtPayload {
    given_name: string,
    family_name: string,
    picture: string,
    email: string,
}

export const AuthPage = () => {

    const dispatch = useAppDispatch();

    const onGuestBtnClick = () => {
        const guestName = generate({ exactly: 1, wordsPerString: 2, separator: '-' });

        const guestData: IUser = {
            first_name: `Guest ${_.capitalize(guestName[0])}`,
            second_name: '',
            avatar_img_url: 'https://cdn.pixabay.com/photo/2023/01/09/22/10/vector-graphic-7708408_1280.jpg',
            email: 'gusets_email@gmail.com',
        };

        dispatch(onLoginSuccesss(guestData));
    };
    
    return (
        <div className="w-full h-[50vh] flex justify-center items-center">

            <ul className="flex justify-center items-center gap-6">
                <li>
                    <GoogleLogin
                        onSuccess={credentialResponse => {

                            const decryptedData = jwtDecode(credentialResponse.credential!) as JwtPayload;
                            console.log(decryptedData.given_name);

                            const storageUserData: IUser = {
                                first_name: decryptedData.given_name,
                                second_name: decryptedData.family_name,
                                avatar_img_url: decryptedData.picture,
                                email: decryptedData.email,
                            };

                            dispatch(onLoginSuccesss(storageUserData));
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </li>

                <li>
                    <PrimaryButton onClick={onGuestBtnClick} title="Enter as a guest"/>
                </li>
            </ul>
        </div>

    );
};