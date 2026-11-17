"use client";

import { ExternalLink, Trophy, Database, NotebookPen } from "lucide-react";
import Reveal from "./Reveal";

const KAGGLE_PROFILE = "https://www.kaggle.com/akhilnathreddy";

const tiers = [
    { label: "Competitions", tier: "Contributor", icon: Trophy },
    { label: "Datasets", tier: "Contributor", icon: Database },
    { label: "Notebooks", tier: "Contributor", icon: NotebookPen },
];

type Competition = {
    title: string;
    host: string;
    status: string;
    detail: string;
    link: string;
    gradient: string;
};

const competitions: Competition[] = [
    {
        title: "Enveda CASMI 2026: Molecule ID From Mass Spectra",
        host: "Enveda · Featured · Code competition",
        status: "Active",
        detail: "Predicting 2D structures of small molecules from mass spectra, ranking candidate structures with learned scorers and ensembles.",
        link: "https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        title: "Gemma 4 Developer Agent",
        host: "Google DeepMind · Featured",
        status: "Active",
        detail: "Building an autonomous coding agent on Gemma 4 for real-world software-engineering tasks.",
        link: "https://www.kaggle.com/competitions/gemma-4-developer-agent",
        gradient: "from-sky-500 to-indigo-500",
    },
    {
        title: "Gemma 4 Developer Agent: Paper Track",
        host: "Google DeepMind · Featured",
        status: "Writeup submitted",
        detail: "Research writeup on parametric vs environmental contamination of the public dev set.",
        link: "https://www.kaggle.com/competitions/gemma-4-developer-agent-paper",
        gradient: "from-rose-500 to-pink-500",
    },
    {
        title: "Playground S6E9: Predicting EV Purchases",
        host: "Kaggle · Playground · ROC AUC",
        status: "Completed",
        detail: "Tabular binary classification, scored by ROC AUC.",
        link: "https://www.kaggle.com/competitions/playground-series-s6e9",
        gradient: "from-violet-500 to-fuchsia-500",
    },
];

const datasets = [
    {
        title: "QM9 Curated: Validated, Tiered, Split-Audited",
        detail: "133,885 molecules with quality tiers and leakage-audited splits · CC0 · DOI on Zenodo",
        link: "https://www.kaggle.com/datasets/akhilnathreddy/qm9-curated",
    },
    {
        title: "BraTS 2020 Brain Tumor Segmentation U-Net Weights",
        detail: "Four trained U-Nets in fp16 and ONNX, with code and test metrics",
        link: "https://www.kaggle.com/datasets/akhilnathreddy/brats2020-unet-segmentation-weights",
    },
    {
        title: "Gemma 4 Dev Set Contamination Labels",
        detail: "Leak labels, memorisation-probe scores and a reproduce script",
        link: "https://www.kaggle.com/datasets/akhilnathreddy/gemma-4-dev-set-contamination-labels",
    },
];

export default function Kaggle() {
    return (
        <section id="kaggle" className="py-20 relative bg-white/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
                            On <span className="text-primary">Kaggle</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
                            Competing in featured competitions and publishing datasets other people can build on.
                        </p>
                    </Reveal>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Reveal width="100%">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                            {tiers.map((t) => (
                                <div
                                    key={t.label}
                                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5"
                                >
                                    <div className="p-3 rounded-xl bg-sky-50 text-sky-500">
                                        <t.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900">{t.tier}</div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-gray-500">{t.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal width="100%">
                        <h3 className="text-sm font-mono font-semibold uppercase tracking-widest mb-6 text-sky-500">
                            Competitions
                        </h3>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {competitions.map((c, i) => (
                            <Reveal key={c.title} width="100%" delay={i * 0.1}>
                                <a
                                    href={c.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block h-full bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.gradient}`} />
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h4 className="text-lg font-bold text-gray-900">{c.title}</h4>
                                        <span className="shrink-0 px-3 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                                            {c.status}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500 mb-3">{c.host}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{c.detail}</p>
                                </a>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal width="100%">
                        <h3 className="text-sm font-mono font-semibold uppercase tracking-widest mb-6 text-sky-500">
                            Published Datasets
                        </h3>
                    </Reveal>
                    <div className="space-y-4 mb-12">
                        {datasets.map((d, i) => (
                            <Reveal key={d.title} width="100%" delay={i * 0.1}>
                                <a
                                    href={d.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <Database className="w-5 h-5 shrink-0 text-sky-500" />
                                        <div>
                                            <div className="font-semibold text-gray-900">{d.title}</div>
                                            <div className="text-sm text-gray-500">{d.detail}</div>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-black transition-colors" />
                                </a>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal width="100%">
                        <div className="text-center">
                            <a
                                href={KAGGLE_PROFILE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
                            >
                                View my Kaggle profile
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
