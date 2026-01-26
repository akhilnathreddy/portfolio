import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 relative overflow-hidden">
            {/* Mathematical Background Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
                <div className="absolute top-10 left-10 text-9xl font-serif">∫</div>
                <div className="absolute bottom-20 right-20 text-9xl font-serif">∑</div>
                <div className="absolute top-1/2 left-1/4 text-6xl font-serif">∂</div>
            </div>

            <div className="z-10 text-center space-y-8">
                <h1 className="text-9xl font-bold font-serif tracking-tighter mb-4">
                    e<sup className="text-6xl">iπ</sup> + 1 = 0
                </h1>

                <div className="space-y-2">
                    <h2 className="text-2xl font-medium text-gray-600">
                        Euler's Identity Not Found
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        The page you are looking for is purely imaginary.
                        It has rotated into the complex plane.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
                >
                    Return to Real Axis
                </Link>
            </div>
        </div>
    );
}
