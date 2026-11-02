"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useState } from "react";

export default function Contact() {
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Show success popup
        setShowSuccess(true);

        // Clear the form
        setFormData({ name: "", email: "", message: "" });

        // Hide popup after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-24 relative bg-gray-50">
            {/* Success Popup */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold">Message Sent Successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 flex flex-col items-center">
                <div className="text-center mb-16 w-full">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 text-center">
                            Get In Touch
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.1}>
                        <p className="text-gray-600 max-w-xl mx-auto text-lg text-center">
                            Hiring for an ML role, or have a modeling problem worth solving? I'd love to hear from you.
                        </p>
                    </Reveal>
                </div>

                <div className="w-full max-w-2xl">
                    <Reveal delay={0.2}>
                        <motion.form
                            className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 transition-all resize-none"
                                    placeholder="Tell me about the role or the problem..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                Send Message
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.form>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 text-gray-600">
                            <a href="mailto:contact@akhil.dev" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                                <Mail className="w-5 h-5" />
                                <span>contact@akhil.dev</span>
                            </a>
                            <span className="hidden md:block text-gray-300">|</span>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>Remote / Worldwide</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
