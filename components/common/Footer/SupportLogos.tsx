import Image from 'next/image'

const SupportLogos = () => {
  return (
    <div className="flex py-6 justify-center">
      <div className="flex flex-col justify-center">
        <b className="mb-2">Пројекат суфинансиран од</b>
        <div className="flex justify-center">
          <Image
            src="/img/MtoVertical.png"
            alt="MTO Logo"
            width={160}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

export default SupportLogos
