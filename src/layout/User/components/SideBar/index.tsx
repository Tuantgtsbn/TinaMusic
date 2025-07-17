import ICHome from '@components/Icon/ICHome';
import ICLibraryMusic from '@components/Icon/ICLibraryMusic';
import ICRank from '@components/Icon/ICRank';
import ICTopic from '@components/Icon/ICTopic';
import Config from '@config';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const SideBar = ({
    className,
    isDrawer,
    closeDrawer,
}: {
    className?: string;
    isDrawer?: boolean;
    closeDrawer?: () => void;
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const { pathname } = useLocation();
    const checkActive = (path: string) => {
        return pathname === path;
    };
    const generalMenuItems = useMemo(
        () => [
            {
                title: 'Home',
                icon: ICHome,
                path: Config.PATHNAME.HOME,
                active: checkActive(Config.PATHNAME.HOME),
            },
            {
                title: 'Rankings',
                icon: ICRank,
                path: Config.PATHNAME.RANK,
                active: checkActive(Config.PATHNAME.RANK),
            },
            {
                title: 'Topics and genres',
                icon: ICTopic,
                path: Config.PATHNAME.TOPIC,
                active: checkActive(Config.PATHNAME.TOPIC),
            },
        ],
        [pathname],
    );
    const libraryMenuItems = useMemo(
        () => [
            {
                title: 'Favarite list',
                path: '/library/favorite',
                active: checkActive('/library/favorite'),
            },
            {
                title: 'Recently played',
                path: '/library/recent',
                active: checkActive('/library/recent'),
            },
            {
                title: 'My playlists',
                path: '/library/my-playlists',
                active: checkActive('/library/my-playlists'),
            },
        ],
        [pathname],
    );
    const handleNavigate = (path: string) => {
        if (isDrawer && closeDrawer) {
            closeDrawer();
        }
        navigate(path);
    };

    return (
        <div
            className={clsx(
                'sidebar fixed top-0 left-0 bottom-0 bg-[linear-gradient(#3F1414,#161110_40%)]',
                isDrawer ? 'w-[256px]' : 'w-[250px]',
                className,
            )}
        >
            <div className="flex justify-center py-[28px]">
                <img
                    src="/image/logo.png"
                    draggable={false}
                    className="w-40 cursor-pointer max-sm:w-32"
                />
            </div>
            <hr className="border-t border-t-[#FFFFFF12]" />
            <div className="pt-3 py-8">
                <List component="ul">
                    {generalMenuItems.map((item) => (
                        <div
                            key={item.path}
                            className={clsx('relative nav-item')}
                        >
                            {item.active && (
                                <div className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-md shadow-[4px_4px_20px_0_#FF4319,-4px_-4px_20px_0_#FF43199E] block" />
                            )}
                            <ListItemButton
                                className={clsx(
                                    '!py-3 !pr-[20px] !pl-2 !ml-3',
                                    item.active &&
                                        '!bg-[rgba(255,255,255,0.15)] !rounded-l-[10px]',
                                )}
                                onClick={() => handleNavigate(item.path)}
                            >
                                <ListItemIcon className="!min-w-fit">
                                    <item.icon color="#FFFFFF" />
                                </ListItemIcon>
                                <ListItemText
                                    className="ml-4"
                                    primary={item.title}
                                />
                            </ListItemButton>
                        </div>
                    ))}
                </List>
            </div>
            <hr className="border-t border-t-[#FFFFFF12]" />
            <div className="pt-3 py-8">
                <List component="ul" aria-labelledby="nested-list-subheader">
                    <div className="relative">
                        <ListItemButton
                            onClick={handleClick}
                            className={clsx(
                                '!py-3 !pr-[20px] !pl-2 !ml-3',
                                pathname.includes('/library') &&
                                    '!bg-[rgba(255,255,255,0.15)] !rounded-l-[10px]',
                            )}
                        >
                            <ListItemIcon className="!min-w-fit">
                                <ICLibraryMusic color="#FFFFFF" />
                            </ListItemIcon>
                            <ListItemText className="ml-4" primary="Library" />
                        </ListItemButton>
                        {pathname.includes('/library') && (
                            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-md shadow-[4px_4px_20px_0_#FF4319,-4px_-4px_20px_0_#FF43199E] block" />
                        )}
                    </div>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {libraryMenuItems.map((item) => (
                                <ListItemButton
                                    key={item.path}
                                    sx={{ pl: 4 }}
                                    className="!py-3 !pr-[20px] !pl-2 !ml-3"
                                    onClick={() => handleNavigate(item.path)}
                                >
                                    <ListItemIcon className="!min-w-fit">
                                        <div
                                            className={clsx(
                                                'p-[3px] mx-2.5 rounded-full bg-[#343F2F]',
                                                item.active && '!bg-[#fd1500]',
                                            )}
                                        ></div>
                                    </ListItemIcon>
                                    <ListItemText
                                        className="ml-4"
                                        primary={item.title}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </div>
        </div>
    );
};

export default SideBar;
