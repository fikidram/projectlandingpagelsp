import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, ArrowLeft, BookOpen, List, Shield } from 'lucide-react';

const SchemeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scheme, setScheme] = useState(null);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemeDetail = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/skema/${id}`);
                const data = await response.json();
                setScheme(data.data);
                setUnits(data.units || []);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemeDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!scheme) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Skema Tidak Ditemukan</h2>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali ke Beranda
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-600 relative">
                        <div className="absolute -bottom-10 left-8">
                            <div className="bg-white p-4 rounded-xl shadow-lg">
                                <Award className="w-12 h-12 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{scheme.judul}</h1>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                            {scheme.jenis}
                        </span>

                        <div className="prose max-w-none text-gray-600">
                            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                                Deskripsi Skema
                            </h3>
                            <p className="mb-6">{scheme.deskripsi}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h3 className="flex items-center text-xl font-bold text-gray-900">
                            <List className="w-6 h-6 mr-2 text-blue-600" />
                            Daftar Unit Kompetensi
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-16">No.</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 w-48">Kode Unit</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Judul Unit Kompetensi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {units.length > 0 ? (
                                    units.map((unit, index) => (
                                        <tr key={unit._id || index} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">{index + 1}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-mono">{unit.kode_unit}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800 font-medium">{unit.judul}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic">
                                            Belum ada data unit kompetensi
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchemeDetail;
