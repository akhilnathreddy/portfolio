import Link from "next/link";

export default function Proof() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6">
            <div className="max-w-2xl w-full bg-gray-50 p-10 rounded-3xl border border-gray-200 shadow-xl relative overflow-hidden">
                {/* QED Stamp */}
                <div className="absolute top-6 right-6 w-16 h-16 border-4 border-gray-200 rounded-full flex items-center justify-center -rotate-12 opacity-50">
                    <span className="font-serif font-bold text-gray-300">Q.E.D.</span>
                </div>

                <h1 className="text-3xl font-bold font-serif mb-8 border-b border-gray-200 pb-4">
                    Theorem: Akhil is the Optimal Developer
                </h1>

                <div className="space-y-6 font-serif text-lg leading-relaxed text-gray-700">
                    <p>
                        <strong className="text-black">Lemma 1:</strong> Let <em className="font-mono">S</em> be the set of all developers.
                        Let <em className="font-mono">f(x)</em> be a function mapping developer <em className="font-mono">x</em> to code quality.
                    </p>

                    <p>
                        <strong className="text-black">Lemma 2:</strong> As coffee consumption <em className="font-mono">c → ∞</em>,
                        productivity <em className="font-mono">p → max</em>.
                    </p>

                    <p>
                        <strong className="text-black">Proof:</strong>
                    </p>

                    <ul className="list-decimal list-inside space-y-3 pl-4 border-l-2 border-gray-200">
                        <li>Assume there exists a developer <em className="font-mono">y ∈ S</em> such that <em className="font-mono">f(y) &gt; f(Akhil)</em>.</li>
                        <li>However, Akhil's stack includes Next.js, Python, and AI, which implies <em className="font-mono">f(Akhil)</em> scales exponentially.</li>
                        <li>By the <em className="italic">Full Stack Approximation Theorem</em>, any developer covering both frontend and backend converges to a local maximum.</li>
                        <li>Adding AI capabilities integrates the function over the entire domain of innovation.</li>
                        <li>Therefore, the assumption leads to a contradiction.</li>
                    </ul>

                    <p className="pt-4 text-xl font-bold text-black">
                        ∴ Akhil is the optimal solution. ■
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        href="/"
                        className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
                    >
                        Back to Reality
                    </Link>
                </div>
            </div>
        </div>
    );
}
