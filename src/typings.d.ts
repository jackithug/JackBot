declare module "*.json" {
  const value: any;
  export default value;
}

interface ChannelMessage {
  channelId: string
  message: string
}