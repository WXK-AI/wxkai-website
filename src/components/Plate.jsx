export default function Plate({
  src,
  alt,
  caption,
  className = '',
  width,
  height,
  loading = 'lazy',
}) {
  return (
    <figure className={className ? `plate ${className}` : 'plate'}>
      <div className="plate-frame">
        <span className="crop crop-tl" aria-hidden="true" />
        <span className="crop crop-tr" aria-hidden="true" />
        <span className="crop crop-bl" aria-hidden="true" />
        <span className="crop crop-br" aria-hidden="true" />
        <img src={src} alt={alt} width={width} height={height} loading={loading} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
