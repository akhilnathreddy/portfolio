export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>

                {/* Spinning Ring */}
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

                {/* Inner Pulse */}
                <div className="absolute inset-8 bg-gray-50 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}
