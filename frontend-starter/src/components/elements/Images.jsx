
const Images = ({src, alt, width, height, borderRadius, onClick}) => {
    return (
        <img src={src} alt={alt} style={{
          width: width || 64,
          height: height || 64,
          borderRadius: borderRadius || 50,
          objectFit: 'cover',
          cursor: "pointer"
        }}
        onClick={onClick}
        />
    )
}

export default Images
