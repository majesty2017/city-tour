import {Images} from "../index.js";

const ImageCard = ({src, alt}) => {
    return (
        <div
            className="dropzone d-flex justify-content-center align-items-center"
            style={{width: 150, height: 100}}
            id="single-file-upload">
            <div className="fallback">
                <Images src={src} alt={alt || 'Photo'} width={150} height={100} borderRadius={5} />
            </div>
        </div>
    )
}

export default ImageCard
