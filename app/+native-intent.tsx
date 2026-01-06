import RNInsider from "react-native-insider";

export function redirectSystemPath({ path, initial }: { path: string, initial: boolean }) {
    if (path.includes('insider{YOUR_PARTNER_NAME}')) {
        console.log('path', path);

        RNInsider.handleURL(path);

        return '';
    } else {
        return path;
    }
}