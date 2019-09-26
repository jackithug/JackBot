declare module "*.json" {
  const value: any;
  export default value;
}

declare module 'text-to-mp3';
declare module 'uuid/v4';

interface ChannelMessage {
  channelId: string
  message: string
}