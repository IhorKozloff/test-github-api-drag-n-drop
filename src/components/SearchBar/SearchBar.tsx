
import { Button, Input, Space } from 'antd';
import { useState } from 'react';

interface IProps {
    onSearchSubmit: (repoUrl: string) => void;
}

export const SearchBar = ({onSearchSubmit}: IProps) => {

    const [searchInputData, setSearchInputData] = useState('');

    const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputData(e.target.value);
    };

    const onSearchBtnSubmit = async () => {
        onSearchSubmit(searchInputData);
    };

    return (
        <div className="w-[700px]">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>

                <Space.Compact size="large" style={{ width: '100%' }}>
                    <Input onChange={onInputChange} placeholder="Enter only repo addres. (Fore example - facebook/react)"/>
                    <Button type="primary" onClick={onSearchBtnSubmit}>Load</Button>
                </Space.Compact>

            </Space>
        </div>

    );
};