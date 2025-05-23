import { assets } from "../assets/assets"

function Footer() {
return (
    <div className="flex items-center justify-between gap-4 lg:px-44 py-3">
            <img width={150} src={assets.logo} alt="logo" />
            <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
                © {new Date().getFullYear()} Lithigesh. All rights reserved.
            </p>
            <div className="flex gap-1">
                    <img width={40} src={assets.facebook_icon} alt="Facebook" />
                    <img width={40} src={assets.twitter_icon} alt="Twitter" />
                    <img width={40} src={assets.google_plus_icon} alt="Google Plus" />
            </div>
    </div>
)
}

export default Footer