import { useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Simulate slight network delay for premium feel
            await new Promise(r => setTimeout(r, 800));
            const response = await axios.post('http://localhost:5000/analyze-ticket', {
                message
            });
            setResult(response.data);
        } catch (err) {
            setError('Connection to AI Core failed. Ensure the local server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans text-slate-200 flex items-center justify-center p-4">

            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-blob animation-delay-4000"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CICA8cGF0aCBkPSJNMCAwaDQwdjQwSDBWMHptMjAgMjB2MjBoMjBWMjBIMjB6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgo8L3N2Zz4=')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Input Panel */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-indigo-300 mb-4 tracking-wide uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            System Online
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200 tracking-tight leading-tight">
                            Intelligent Ticket <br /> Triage Console
                        </h1>
                        <p className="mt-4 text-slate-400 text-lg max-w-md">
                            Process customer inquiries instantly. Our keyword-driven engine automatically classifies priority, sentiment, and department.
                        </p>
                    </div>

                    <div className="glass-panel rounded-3xl p-1 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="bg-slate-900/60 rounded-[22px] p-6 lg:p-8">
                            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                                <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-4">
                                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Customer Message Transcript
                                </label>

                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Paste the customer's email or chat message here..."
                                    className="w-full h-48 p-5 rounded-2xl glass-input text-lg resize-none mb-6 font-medium leading-relaxed"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={loading || !message.trim()}
                                    className="group relative w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                >
                                    {/* Button Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>

                                    {loading ? (
                                        <span className="relative flex items-center gap-3 z-10">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Extracting Intent...
                                        </span>
                                    ) : (
                                        <span className="relative flex items-center gap-3 z-10 text-[15px] tracking-wide uppercase">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                            Run AI Analysis
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results Panel */}
                <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-14">
                    <div className="glass-panel rounded-3xl p-1 h-full min-h-[400px] flex flex-col relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="bg-slate-900/60 rounded-[22px] p-6 lg:p-8 h-full flex flex-col relative z-10">

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                    <div className="w-center h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    Analysis Engine
                                </h3>
                                {result && <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">Complete</span>}
                            </div>

                            {error ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20 text-red-400">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <p className="text-red-400/90 font-medium text-sm">{error}</p>
                                </div>
                            ) : !result && !loading ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
                                    <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-slate-400 text-sm font-medium">Awaiting transcript payload for analysis.</p>
                                </div>
                            ) : loading ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-16 h-16 relative mb-6">
                                        <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                                        <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin animation-delay-200"></div>
                                        <div className="absolute inset-4 rounded-full border-b-2 border-blue-500 animate-spin animation-delay-400"></div>
                                    </div>
                                    <p className="text-indigo-300 text-sm font-medium animate-pulse">Running linguistic vector matching...</p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col gap-4">
                                    <MetricCard
                                        label="Priority Level"
                                        value={result.priority}
                                        type="priority"
                                        delay="0ms"
                                    />
                                    <MetricCard
                                        label="Sentiment Profile"
                                        value={result.sentiment}
                                        type="sentiment"
                                        delay="100ms"
                                    />
                                    <MetricCard
                                        label="Routing Category"
                                        value={result.category}
                                        type="category"
                                        delay="200ms"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Sub-component for displaying metrics beautifully
function MetricCard({ label, value, type, delay }) {

    // Dynamic styling mapping
    const styles = {
        priority: {
            'High': 'from-red-600/30 to-red-900/10 border-red-500/40 text-red-400 icon-red',
            'Medium': 'from-orange-500/20 to-orange-900/10 border-orange-500/30 text-orange-400 icon-orange',
            'Low': 'from-indigo-500/20 to-indigo-900/10 border-indigo-500/30 text-indigo-300 icon-indigo',
        },
        sentiment: {
            'Positive': 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30 text-emerald-400 icon-emerald',
            'Neutral': 'from-slate-500/20 to-slate-800/10 border-slate-500/30 text-slate-300 icon-slate',
            'Negative': 'from-rose-500/20 to-rose-900/10 border-rose-500/30 text-rose-400 icon-rose',
        },
        category: {
            default: 'from-blue-500/20 to-blue-900/10 border-blue-500/30 text-blue-400 icon-blue'
        }
    };

    const currentStyle = type === 'category' ? styles.category.default : (styles[type][value] || styles.category.default);

    return (
        <div className={`relative overflow-hidden rounded-2xl glass-panel border ${currentStyle.split('icon-')[0]} p-5 animate-fade-in-up transition-transform hover:-translate-y-1 hover:shadow-lg`} style={{ animationDelay: delay }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${currentStyle.split(' ')[0]} ${currentStyle.split(' ')[1]} opacity-50`}></div>
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">{label}</p>
                    <p className={`text-xl font-bold tracking-tight ${currentStyle.match(/text-\w+-\d+/)[0]}`}>{value}</p>
                </div>

                {/* Dynamic Abstract Graph / Icon Placeholder */}
                <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center border border-white/5 backdrop-blur-xl">
                    {type === 'priority' && value === 'High' && (
                        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    )}
                    {type === 'priority' && value === 'Medium' && (
                        <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    )}
                    {type === 'priority' && value === 'Low' && (
                        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    )}

                    {type === 'sentiment' && value === 'Positive' && (
                        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    {type === 'sentiment' && value === 'Neutral' && (
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    {type === 'sentiment' && value === 'Negative' && (
                        <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}

                    {type === 'category' && (
                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
