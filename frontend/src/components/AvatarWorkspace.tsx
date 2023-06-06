import { Avatar } from "@mui/material";

type AvatarWorkspaceProps = {
    wname: string;
    size: {
        width: number;
        height: number;
    };
};

const AvatarWorkspace: React.FC<AvatarWorkspaceProps> = ({ wname, size }) => {
    const { width, height } = size;
    const stringToColor = (string: string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    };
    return (
        <Avatar variant="square" sx={{ width, height, bgcolor: stringToColor(wname), fontSize: `calc(0.6*${width}px)` }}>
            {wname.charAt(0).toUpperCase()}
        </Avatar>
    );
};

export default AvatarWorkspace;
