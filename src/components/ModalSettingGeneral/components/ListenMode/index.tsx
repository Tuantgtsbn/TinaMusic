import {
    setMusicQuality,
    setRemoveSilent,
    setTimeToNextSong,
} from '@redux/GlobalSettingSlice';
import { IRootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Config from '@config';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import GlobalSwitch from '@components/SwitchCustom';

function ListenMode() {
    const dispatch = useDispatch();
    const { musicQuality, removeSilent, timeToNextSong } = useSelector(
        (state: IRootState) => state.settings,
    );
    const handleChangeTimeToNextSong = (e: SelectChangeEvent<number>) => {
        dispatch(setTimeToNextSong(Number(e.target.value)));
    };
    const handleChangeRemoveSilent = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        dispatch(setRemoveSilent(e.target.checked));
    };
    const handleChangeMusicQuality = (e: SelectChangeEvent<number>) => {
        dispatch(setMusicQuality(e.target.value as number));
    };
    const timeToNextSongItems = [
        { value: 3, label: '3s' },
        { value: 5, label: '5s' },
    ];
    const musicQualityItems = [
        { value: 1, label: 'High' },
        { value: 0, label: 'Low' },
    ];
    return (
        <div>
            <p className="text-base font-medium mb-[15px]">Advanced settings</p>
            <div className="flex flex-col gap-[15px]">
                <div className="flex  px-[15px] py-[10px] justify-between h-[62px] items-center bg-[#FFFFFF12] rounded-[4px]">
                    <div>
                        <p>Time to next song</p>
                        <p className="text-[#8F8F8F] text-[11px]">
                            {timeToNextSong} second{' '}
                            {timeToNextSong ===
                            Config.LISTENING_MODE_DEFAULT.TIME_TO_NEXT_SONG
                                ? '(Default)'
                                : ''}
                        </p>
                    </div>

                    <div>
                        <Select
                            value={timeToNextSong}
                            onChange={handleChangeTimeToNextSong}
                            disabled={removeSilent}
                            size="small"
                            displayEmpty
                            sx={{
                                'borderRadius': '10px',
                                'fontWeight': '500',
                                'fontSize': '14px',
                                'color': '#fff',
                                '& .MuiSelect-select': {
                                    color: '#fff',
                                    padding: '4px 28px 4px 8px',
                                    textAlign: 'center',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                    },
                                '& .MuiSelect-icon': { color: '#FF0000' },
                            }}
                            className="bg-[#3C3C3C] custom-select h-8 w-[65px] py-1"
                            inputProps={{
                                'aria-label': 'Without label',
                                'style': {
                                    backgroundColor: '#3C3C3C',
                                    padding: '0',
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        'marginTop': '3px',
                                        'color': '#fff',
                                        'backgroundColor': '#3C3C3C',
                                        'borderRadius': '10px',
                                        '& .MuiMenuItem-root': {
                                            fontSize: '14px',
                                        },
                                        '& .MuiMenuItem-root.Mui-selected:not(:first-of-type)':
                                            {
                                                backgroundColor: '#3C3C3C',
                                                color: '#fff',
                                                fontSize: '14px',
                                            },
                                        '& .MuiMenuItem-root.Mui-selected:first-of-type':
                                            {
                                                color: '#fff',
                                                backgroundColor: 'transparent',
                                                fontSize: '14px',
                                            },
                                    },
                                },
                            }}
                        >
                            {timeToNextSongItems.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="flex  px-[15px] py-[10px] justify-between h-[62px] items-center bg-[#FFFFFF12] rounded-[4px]">
                    <div>
                        <p>Remove silence between songs</p>
                        <p className="text-[#8F8F8F] text-[11px]">
                            {removeSilent ? 'On' : 'Off'}
                        </p>
                    </div>

                    <GlobalSwitch
                        checked={removeSilent}
                        onChange={handleChangeRemoveSilent}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <div className="flex  px-[15px] py-[10px] justify-between h-[62px] items-center bg-[#FFFFFF12] rounded-[4px]">
                    <div>
                        <p>Music quanlity</p>
                        <p className="text-[#8F8F8F] text-[11px]">
                            {musicQuality === 0
                                ? 'Quanlity Low'
                                : 'Quanlity High'}
                        </p>
                    </div>

                    <div>
                        <Select
                            value={musicQuality}
                            onChange={handleChangeMusicQuality}
                            size="small"
                            displayEmpty
                            sx={{
                                'borderRadius': '10px',
                                'fontWeight': '500',
                                'fontSize': '14px',
                                'color': '#fff',
                                '& .MuiSelect-select': {
                                    color: '#fff',
                                    padding: '4px 28px 4px 8px',
                                    textAlign: 'center',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: 'transparent',
                                    },
                                '& .MuiSelect-icon': { color: '#FF0000' },
                            }}
                            className="bg-[#3C3C3C] custom-select h-8 w-auto py-1"
                            inputProps={{
                                'aria-label': 'Without label',
                                'style': {
                                    backgroundColor: '#3C3C3C',
                                    padding: '0',
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        'marginTop': '3px',
                                        'color': '#fff',
                                        'backgroundColor': '#3C3C3C',
                                        'borderRadius': '10px',
                                        '& .MuiMenuItem-root': {
                                            fontSize: '14px',
                                        },
                                        '& .MuiMenuItem-root.Mui-selected:not(:first-of-type)':
                                            {
                                                backgroundColor: '#3C3C3C',
                                                color: '#fff',
                                                fontSize: '14px',
                                            },
                                        '& .MuiMenuItem-root.Mui-selected:first-of-type':
                                            {
                                                color: '#fff',
                                                backgroundColor: 'transparent',
                                                fontSize: '14px',
                                            },
                                    },
                                },
                            }}
                        >
                            {musicQualityItems.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListenMode;
