import type { NextPage, GetServerSideProps, InferGetServerSidePropsType   } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import HomeButton from '../components/HomeButton'
import HeaderButton from '../components/HeaderButton'
import {Map} from "map-lib" 
import { createClient } from '@supabase/supabase-js'

const styles = {
  hover: {
    backgroundColor: 'red',
  },
  normal: {
    backgroundColor: 'blue',
  },
}

const Home: NextPage = ({comisarias}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    console.log(comisarias)
  }, [])
  return (
    <div className="bg-black text-white h-screen">
      <Head>
        <title>MAPA | Mapa de la Policia</title>
        <meta name="description" content="El Mapa es una herramienta moderna de construcción de ciudadanía, en tanto está orientada a la promoción de los
derechos humanos de todas las personas que habitan o visitan la Ciudad de Buenos Aires. También cuenta con un formulario que permitirá potenciar la denuncia de la violencia policial." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className='flex justify-between mb-14 px-24'>
      <HomeButton className='h-64'/>
        <div className='flex gap-4 m-4 items-center h-32'>
        <HeaderButton image={{src:"/img/mapa-header.webp"}} alt="MAPA" active={true} goTo="/mapa" text="mapa" hoverText="MAPA"/>
        <HeaderButton image={{src:"/img/megafono-header.webp"}} alt="DENUNCIÁ" active={true} goTo="/mapa" text="DENUNCIÁ" hoverText="DENUNCIÁ"/>
        <HeaderButton image={{src:"/img/herramientas-header.webp"}} alt="RECURSOS" active={false} goTo="/mapa" text="RECURSOS" hoverText="RECURSOS"/>
        <HeaderButton image={{src:"/img/investigaciones-header.webp", w:81, h:95}} alt="INVESTIGACIONES" active={false} goTo="/mapa" text="INVESTIGACIONES" hoverText="INVESTIGACIONES"/>
        <HeaderButton alt="NOSOTXS" active={false} goTo="/mapa" text="NOSOTRXS" hoverText="Quienes"/>
        </div>
      </header>

      <main >
<div className='min-h-full  bg-repeat-y	 bg-grid opacity-20 flex flex-col items-center'>
  {typeof Map !== "undefined" && 
<Map 
className=' z-10'
        jurisdiccionesURL={"/geo/caba/comunas.topo"}
        barriosURL={"/geo/caba/barrios.topo"}
        campos={{
          jurisdiccion: "COMUNA",
          interseccion: "COMUNAS",
          barrio: "BARRIO",
        }}
        onClick={(e) => console.log(e ?? "no properties")}
      />  }

</div>



      </main>

      <footer >
        
      </footer>
    </div>
  )
}

// type Data = {
//   comisarias: Array<{
//     id: number,
//     numero: number | null,
//     distrito: string | null,
//     ubicacion: object | null,
//  }>,
//  error: string | null | unknown,
// }


export const getServerSideProps : GetServerSideProps  = async () => {
  const supabase = createClient( process.env.NEXT_PUBLIC_SUPABASE_URL?? '',  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?? '')
  const { data: comisarias, error } = await supabase.from('comisarias').select('*')
  return {
    props: {
      // props for your component
      comisarias,
      error
    },
  }
}

export default Home
