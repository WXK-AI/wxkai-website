import Plate from './Plate.jsx'

export default function Frontispiece() {
  return (
    <Plate
      className="plate-identity"
      src="/identity/portrait.jpg"
      alt="Wong Xin Kai, head and shoulders, facing the camera, in a dark jacket and open-collar white shirt."
      caption="Plate 0. Wong Xin Kai."
      width={413}
      height={591}
      loading="eager"
    />
  )
}
