import ICSearch from '@components/Icon/ICSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Divider, Input, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModalLogin, openModalSetting } from '@redux/ModalSlice';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

function NavBar({
    screenWidth,
    openSideBar,
}: {
    screenWidth: number;
    openSideBar: () => void;
}) {
    const dispatch = useDispatch();
    return (
        <div>
            {screenWidth > 1024 ? (
                <div className="flex justify-between pt-2 lg:pt-4 pb-2 px-4 sm:px-6 md:px-8">
                    <div className="bg-[#441B1B] rounded-[20px] px-6 py-[6px] flex items-center gap-x-3 w-[36vw] sm:min-w-56">
                        <ICSearch className="cursor-pointer" />
                        <Input
                            placeholder="What do you want to listen to?"
                            disableUnderline
                            sx={{
                                background: 'transparent',
                                color: 'white',
                                width: '100%',
                            }}
                        />
                    </div>
                    <div className="flex gap-1 md:gap-6 items-center">
                        <Tooltip title="Settings" arrow>
                            <div
                                className="p-2 rounded-full bg-[rgba(255,255,255,0.1)]"
                                onClick={() => dispatch(openModalSetting())}
                            >
                                <SettingsIcon className="cursor-pointer" />
                            </div>
                        </Tooltip>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            className="bg-[#ffffff36] w-[2px] !h-4"
                        />
                        <Button
                            sx={{
                                padding: '8px 16px',
                                color: 'white',
                                backgroundColor: 'rgb(255,67,25)',
                                borderRadius: '28px',
                                textTransform: 'capitalize',
                            }}
                            onClick={() => dispatch(openModalLogin())}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="py-2 px-8 flex justify-between items-center">
                    <MenuIcon
                        onClick={openSideBar}
                        className="cursor-pointer"
                    />
                    <img
                        src="/image/logo.png"
                        alt=""
                        className="w-40 cursor-pointer max-sm:w-32 block"
                    />
                    <SearchIcon className="cursor-pointer" />
                </div>
            )}
        </div>
    );
}

export default NavBar;
