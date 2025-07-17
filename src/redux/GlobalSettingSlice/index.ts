import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Config from '@config';
interface GlobalSettingState {
    timeToNextSong: number;
    removeSilent: boolean;
    musicQuality: number;
    language: string;
}
const initialState: GlobalSettingState = {
    timeToNextSong: Config.LISTENING_MODE_DEFAULT.TIME_TO_NEXT_SONG,
    removeSilent: Config.LISTENING_MODE_DEFAULT.REMOVE_SILENT,
    musicQuality: Config.LISTENING_MODE_DEFAULT.MUSIC_QUANLITY,
    language: Config.LANGUAGE.DEFAULT,
};
const GlobalSettingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTimeToNextSong: (state, action: PayloadAction<number>) => {
            state.timeToNextSong = action.payload;
        },
        setRemoveSilent: (state, action: PayloadAction<boolean>) => {
            state.removeSilent = action.payload;
        },
        setMusicQuality: (state, action: PayloadAction<number>) => {
            state.musicQuality = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    },
});
export default GlobalSettingSlice;
export const GlobalSettingReducer = GlobalSettingSlice.reducer;
export const {
    setTimeToNextSong,
    setRemoveSilent,
    setMusicQuality,
    setLanguage,
} = GlobalSettingSlice.actions;
