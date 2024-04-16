export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData extends ILoginData {
    name?: string;
}

export interface IRegisterDataInForm extends Omit<IRegisterData, 'name'> {
    firstName: string;
}

export interface IRegisterFullfiled {
    user: {
        email: string;
        token: string;
        id: string;
    }
}

export interface IAuthError {
    frontEndError: {
        message: string;
    }
}