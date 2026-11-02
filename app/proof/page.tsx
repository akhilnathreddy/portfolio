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
                    Theorem: Akhil Minimizes the Loss
                </h1>

                <div className="space-y-6 font-serif text-lg leading-relaxed text-gray-700">
                    <p>
                        <strong className="text-black">Lemma 1:</strong> Let <em className="font-mono">H</em> be the hypothesis space of all ML engineers.
                        Let <em className="font-mono">L(h)</em> be the expected loss of engineer <em className="font-mono">h</em> on unseen, real-world data.
                    </p>

                    <p>
                        <strong className="text-black">Lemma 2:</strong> As coffee consumption <em className="font-mono">c → ∞</em>,
                        the learning rate <em className="font-mono">η</em> stays well-tuned.
                    </p>

                    <p>
                        <strong className="text-black">Proof:</strong>
                    </p>

                    <ul className="list-decimal list-inside space-y-3 pl-4 border-l-2 border-gray-200">
                        <li>Assume there exists an engineer <em className="font-mono">h ∈ H</em> such that <em className="font-mono">L(h) &lt; L(Akhil)</em>.</li>
                        <li>Akhil splits by patient and by time, embargoes his folds, and never peeks at the test set, so his <em className="font-mono">L</em> is an unbiased estimate.</li>
                        <li>By the <em className="italic">Persistence Baseline Lemma</em>, every model he ships has already beaten the naive forecast.</li>
                        <li>His uncertainty maps flag his own errors (AUROC 0.97), so even <em className="font-mono">∂L/∂h</em> is known.</li>
                        <li>Therefore <em className="font-mono">h</em> must have leaked the labels, a contradiction.</li>
                    </ul>

                    <p className="pt-4 text-xl font-bold text-black">
                        ∴ Akhil = argmin<sub className="font-mono text-sm">h ∈ H</sub> L(h). ■
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
