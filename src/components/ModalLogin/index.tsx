import { Button, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface IModalLoginProps {
    open: boolean;
    onClose: () => void;
}

function LoginModal({ open, onClose }: IModalLoginProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute top-1/2 left-1/2 rounded-t-xl   -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[600px] bg-[linear-gradient(#252525,#151515)]">
                <div className="relative shadow-[0_4px_50px_0_#FFFFFF36] rounded-t-xl">
                    <div
                        className="absolute -z-10 top-0 left-0 w-full h-[182px] bg-cover bg-center bg-no-repeat rounded-t-xl"
                        style={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(32,32,32,0), rgba(32,32,32,0.69), rgba(32,32,32,1)), url(/image/auth-background.png)',
                        }}
                    ></div>
                    <div className="absolute z-20 right-4 top-4 bg-[#FFFFFF47] rounded-full">
                        <IconButton onClick={onClose}>
                            <CloseIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </div>
                    <div className="flex items-center flex-col p-6 rounded-t-xl">
                        <div className="mb-6 mt-[40px]">
                            <img
                                src="/image/logo.png"
                                alt=""
                                className="w-52 object-cover"
                            />
                        </div>
                        <h2 className="text-center font-bold text-white mb-4 md:text-[26px]">
                            Experience Super Music & Download for Free
                        </h2>
                        <p className="text-[14px] text-center hidden sm:block text-[#A5A5A5] mb-6 max-w-3xl">
                            Discover amazing melodies, keeping up with the
                            ever-expanding music trends from talented and famous
                            artists around the world. Share your unique way of
                            listening to music.
                        </p>
                        <div className="w-full max-w-lg ">
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    borderRadius: '12px',
                                    backgroundColor: 'rgb(255,67,25)',
                                    padding: '12px 8px',
                                    fontWeight: 600,
                                    textTransform: 'capitalize',
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;
