import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 relative overflow-hidden">
            <div className="z-10 container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="flex flex-col items-start">
                    <h3 className="text-yellow-600 font-semibold mb-4 text-base">Home</h3>
                    <ul className="space-y-2 text-gray-300 text-left">
                        <li>
                            <Link to="/home" className="hover:text-yellow-600 block">
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col items-start">
                    <h3 className="text-yellow-600 font-semibold mb-4 text-base">Blogs</h3>
                    <ul className="space-y-2 text-gray-300 text-left">
                        <li>
                            <Link to="/blog-management" className="hover:text-yellow-600 block">
                                Create Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-blogs" className="hover:text-yellow-600 block">
                                My Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved-blogs" className="hover:text-yellow-600 block">
                                Saved Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/my-personal-dairy" className="hover:text-yellow-600 block">
                                Personal Diary
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-start">
                    <h3 className="text-yellow-600 font-semibold mb-4 text-base">Account</h3>
                    <ul className="space-y-2 text-gray-300 text-left">
                        <li>
                            <Link to="#" className="hover:text-yellow-600 block">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="z-10 mt-10 border-t border-gray-700 pt-4 text-center text-xs text-gray-500 px-4">
                &copy; Copyright BlogNest 2025. All rights are reserved.
            </div>
        </footer>
    );
};

export default Footer;
