import { Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';

interface IProps {
    onClick: () => void;
    title: string;
}

export const PrimaryButton = ({onClick, title}: IProps) => {

    const colors1 = ['#6253E1', '#04BEFE'];
    const getHoverColors = (colors: string[]) =>
        colors.map((color) => new TinyColor(color).lighten(5).toString());
    const getActiveColors = (colors: string[]) =>
        colors.map((color) => new TinyColor(color).darken(5).toString());

    return (

        <Space>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                            lineWidth: 0,
                        },
                    },
                }}
            >
                <Button type="primary" size="large"
                    onClick={onClick}             
                >
                    {title}
                </Button>
            </ConfigProvider>
        </Space>

    );
};