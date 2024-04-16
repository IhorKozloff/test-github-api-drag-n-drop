import React, { ReactNode } from 'react';
import { useAppSelector } from '../hooks/useSelectorAndDispatch';
import { Navigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}
export default function PublickRoute({ children }: IProps) {

    const {isLogin} = useAppSelector(state => state.userStatus);

    return <>{isLogin ? <Navigate to="/" /> : children}</>;
}