import { Radio } from '@mui/material';
import { setLanguage } from '@redux/GlobalSettingSlice';
import { IRootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';

const languages = [
    {
        label: 'Tiếng Việt',
        value: 'vi-VN',
    },
    {
        label: 'English',
        value: 'en-US',
    },
    {
        label: 'ພາສາລາວ',
        value: 'lo-LA',
    },
];
function LanguageMode() {
    const dispatch = useDispatch();
    const { language } = useSelector((state: IRootState) => state.settings);
    return (
        <div>
            <p className="text-base font-medium mb-[15px]">Select language</p>
            <div className="flex flex-col gap-2">
                {languages.map((item) => (
                    <div
                        key={item.value}
                        className="flex  px-[15px] py-[10px] justify-between h-[62px] items-center bg-[#FFFFFF12] rounded-[4px]"
                    >
                        <label>{item.label}</label>
                        <Radio
                            value={item.value}
                            checked={language === item.value}
                            onChange={() => dispatch(setLanguage(item.value))}
                            sx={{
                                'color': 'rgb(84, 84, 84)',
                                '&.Mui-checked': {
                                    color: '#ff4319',
                                },
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LanguageMode;
