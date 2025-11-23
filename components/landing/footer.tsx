export function Footer() {
    return (
        <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            EduLMS
                        </h3>
                        <p className="text-slate-400 mt-2">
                            Modern Learning Management System
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Terms of Service
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                            Contact
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8">
                    <p className="text-slate-400">
                        © 2024 EduLMS. All rights reserved. Built with modern web technologies.
                    </p>
                </div>
            </div>
        </footer>
    );
}
