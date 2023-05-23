import { useEffect } from 'react'

declare global {
    interface Window {
        hbspt: any
    }
}

const Admin = () => {
    useEffect(() => {
        ; (async () => {

            if (window && document) {
                const CMS = (await import('netlify-cms-app')).default

                const script = document.createElement('script')
                const body = document.getElementsByTagName('body')[0]
                script.src = "https://unpkg.com/netlify-cms-widget-geojson@^0.0.3"
                body.appendChild(script)
                script.addEventListener('load', () => {
                    CMS.init()
                })
            }
        })()
    }, [])

    return <div />
}

export default Admin
