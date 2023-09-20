import { FC } from "react";
import { IThumbnail } from "../../interfaces/Iuser/IThumbnail";
const Thumbnail: FC<IThumbnail> = ({ src, alt }) => {
  return <img src={src} className="img__thumbnail" alt={alt} />;
};

export default Thumbnail;
