import { Image } from "../../components/Image";

export type BatchContent = {
    [key: string]: {
        icon: JSX.Element;
        title: string;
        description: string;
    }
}
export const batchContent: BatchContent = {
    '1': {
        icon: <Image name={'batch_1' as any} />,
        title: 'The Symphony',
        description: 'The Symphonic Levels',
    },
    '2': {
        icon: <Image name={'batch_2' as any} />,
        title: 'The Orchestra',
        description: 'The MMC levels you know and love.',
    }
}
