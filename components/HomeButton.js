import Link from "next/link";
import Image from "next/image";
const HomeButton = ({ className }) => {
    return (
        <div className={className}>
            <div className="text-center font-luloBold">
                <Link href="/">
                    <button>
                        <Image src="/gorra-inicio.webp" alt="home" width={155} height={106} />
                        <p className="text-3xl -mt-4">MAPA</p>
                        <p className="text-sm  my-1">DE LA POLICIA </p>
                        <p className="text-xxs font-lulo">DE LA CIUDAD DE BUENOS AIRES</p>
                        <div className="text-violeta mt-2 text-xs"> <p >RED DE CUIDADOS CONTRA </p>
                            <p> LA VIOLENCIA POLICIAL</p>
                        </div>

                    </button>

                </Link>
            </div>
        </div>

    );
};
export default HomeButton;