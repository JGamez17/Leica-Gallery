import Link from 'next/link';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-md">
            {/* Title/Logo */}
            <h1 className="text-2xl font-bold">
                <Link href="/">Leica Moments</Link>
            </h1>

            {/* Navigation Links */}
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/gallery">Moments</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
