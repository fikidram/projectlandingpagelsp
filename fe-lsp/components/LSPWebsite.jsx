import React, { useState, useEffect } from 'react';
import {
  Award,
  Users,
  BookOpen,
  Shield,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Building,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  Globe
} from 'lucide-react';
import logo from '../src/assets/logo.png';

import { useNavigate } from 'react-router-dom';

const LSPWebsite = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [certificationSchemes, setCertificationSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchSchemes = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/skema?page=${pageNumber}&limit=8`);
      const responseData = await response.json();

      const newSchemes = responseData.data;

      // Check if we have more data
      if (pageNumber >= responseData.totalPages) {
        setHasMore(false);
      }

      // Map data and assign colors based on jenis
      const processedData = newSchemes.map(item => {
        let color = "from-gray-500 to-slate-500";
        let icon = <Award className="w-8 h-8" />;

        if (item.jenis === 'Okupasi') {
          color = "from-blue-500 to-cyan-500";
          icon = <Users className="w-8 h-8" />;
        } else if (item.jenis === 'Klaster') {
          color = "from-green-500 to-emerald-500";
          icon = <Target className="w-8 h-8" />;
        } else if (item.jenis === 'Kualifikasi') {
          color = "from-purple-500 to-pink-500";
          icon = <Award className="w-8 h-8" />;
        }

        return {
          ...item,
          title: item.judul,
          description: item.ringkasan || (item.deskripsi && item.deskripsi.length > 100 ? item.deskripsi.substring(0, 100) + "..." : item.deskripsi) || "Sertifikasi kompetensi profesi",
          color,
          icon
        };
      });

      if (pageNumber === 1) {
        setCertificationSchemes(processedData);
      } else {
        setCertificationSchemes(prev => [...prev, ...processedData]);
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSchemes(nextPage);
  };

  const features = [
    {
      icon: <Award className="w-12 h-12" />,
      title: "Sertifikat Terakreditasi",
      description: "Diakui oleh BNSP dan berbagai institusi nasional maupun internasional"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Asesor Berpengalaman",
      description: "Tim asesor profesional dengan pengalaman lebih dari 10 tahun"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Standar Internasional",
      description: "Menggunakan standar ISO dan best practice internasional"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Materi Berkualitas",
      description: "Materi pembelajaran dan asesmen yang selalu up-to-date"
    }
  ];

  const stats = [
    { number: "500+", label: "Peserta Tersertifikasi", icon: <Users className="w-6 h-6" /> },
    { number: "102+", label: "Skema Sertifikasi", icon: <Award className="w-6 h-6" /> },
    { number: "15+", label: "Tahun Pengalaman", icon: <Calendar className="w-6 h-6" /> },
    { number: "98%", label: "Tingkat Kepuasan", icon: <Star className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Ahmad Rizki",
      position: "IT Manager, PT. Teknologi Maju",
      content: "Proses sertifikasi yang profesional dan berkualitas. Sangat membantu dalam pengembangan karir saya.",
      rating: 5
    },
    {
      name: "Siti Nurhaliza",
      position: "Project Manager, CV. Solusi Digital",
      content: "Materi yang komprehensif dan asesor yang berpengalaman. Highly recommended!",
      rating: 5
    },
    {
      name: "Bambang Sutrisno",
      position: "Finance Director, PT. Maju Bersama",
      content: "Sertifikasi yang sangat membantu dalam meningkatkan kompetensi tim keuangan kami.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo LSP" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">LSP P2 BPVP</h1>
                <p className="text-xs text-gray-600">Banda Aceh</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Beranda</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Tentang</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Layanan</a>
              <a href="#certification" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Sertifikasi</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Kontak</a>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Daftar Sekarang
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Beranda</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Tentang</a>
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Layanan</a>
              <a href="#certification" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Sertifikasi</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Kontak</a>
              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid xl:grid-cols-2 gap-12 xl:gap-20 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Lembaga Sertifikasi Profesi Terakreditasi
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Wujudkan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"> Kompetensi</span>
                Profesional Anda
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Lembaga Sertifikasi Profesi P2 BPVP Banda Aceh memberikan sertifikasi kompetensi
                yang diakui secara nasional untuk meningkatkan karir dan profesionalisme Anda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Mulai Sertifikasi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                  Lihat Skema
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-12">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2 text-blue-600">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih LSP P2 BPVP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kami berkomitmen memberikan layanan sertifikasi terbaik dengan standar internasional
              dan didukung oleh tim profesional berpengalaman.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Schemes */}
      <section id="certification" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Skema Sertifikasi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih skema sertifikasi yang sesuai dengan bidang keahlian dan tujuan karir Anda.
            </p>
          </div>

          {loading && !certificationSchemes.length ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certificationSchemes.map((scheme, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${scheme.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {scheme.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {scheme.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {scheme.description}
                  </p>
                  <button
                    onClick={() => navigate(`/skema/${scheme._id}`)}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center"
                  >
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
              >
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimoni dari para profesional yang telah mengikuti program sertifikasi kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Siap Memulai Perjalanan Sertifikasi Anda?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Hubungi kami untuk konsultasi gratis dan temukan skema sertifikasi yang tepat untuk Anda.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alamat</h3>
                    <p className="text-blue-100">Jl. Pendidikan No. 123, Banda Aceh, Aceh</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-blue-100">+62 651 1234567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-100">info@lspp2bpvp.ac.id</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Hubungi Kami</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Pesan"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Logo LSP" className="w-12 h-12 object-contain" />
                <div>
                  <h3 className="text-lg font-bold">LSP P2 BPVP</h3>
                  <p className="text-sm text-gray-400">Banda Aceh</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Lembaga Sertifikasi Profesi yang berkomitmen mengembangkan kompetensi profesional di Indonesia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Sertifikasi IT</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sertifikasi Manajemen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sertifikasi Administrasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sertifikasi Keuangan</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Berita</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Jl. Pendidikan No. 123</p>
                <p>Banda Aceh, Aceh</p>
                <p>+62 651 1234567</p>
                <p>info@lspp2bpvp.ac.id</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 LSP P2 BPVP Banda Aceh. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LSPWebsite;