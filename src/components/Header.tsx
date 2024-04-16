import { Logo } from './HeaderComponents/Logo';
import { UserBar } from './HeaderComponents/UserBar';

export const Header = () => {
    
    return (
        <header className="h-[73px] flex justify-between items-center px-6 py-2 bg-slate-200">
            <Logo/>
            <UserBar/>
        </header>
    );
};