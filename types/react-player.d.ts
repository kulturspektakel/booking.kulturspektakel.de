declare class ReacyPlayer extends React.Component<
  {
    url: string;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    light?: boolean;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: number | string;
    height?: number | string;
    style?: Object;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    wrapper?: React.Component<any>;
    config?: any;
  },
  any
> {}

export default ReacyPlayer;
