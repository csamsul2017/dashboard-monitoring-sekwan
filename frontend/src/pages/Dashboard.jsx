import React, { useState } from 'react';
import { 
  LogOut, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle2, 
  Search, 
  Bell, 
  Plus, 
  RefreshCw, 
  BarChart2, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  TrendingUp, 
  FileCheck,
  Building
} from 'lucide-react';

function Dashboard({ user, onLogout }) {
  const [agendas, setAgendas] = useState([
    { id: 1, title: 'Rapat Paripurna LKPJ Bupati Akhir Tahun Anggaran', room: 'Ruang Rapat Utama Paripurna', time: '09:00 - 12:00 WIB', commission: 'Pimpinan & Anggota', status: 'Berlangsung', color: 'blue' },
    { id: 2, title: 'Rapat Dengar Pendapat Umum (RDPU) Pembahasan Raperda Ketertiban Umum', room: 'Ruang Rapat Komisi A', time: '13:00 - 15:00 WIB', commission: 'Komisi A', status: 'Menunggu', color: 'yellow' },
    { id: 3, title: 'Evaluasi Anggaran Triwulan II Dinas Pekerjaan Umum dan Penataan Ruang', room: 'Ruang Rapat Komisi C', time: '14:00 - 16:30 WIB', commission: 'Komisi C', status: 'Menunggu', color: 'yellow' },
    { id: 4, title: 'Koordinasi Lapangan Kunjungan Kerja Dalam Daerah Terkait Infrastruktur Jalan', room: 'Kabupaten/Kota Area Utara', time: '08:00 - selesai WIB', commission: 'Komisi D', status: 'Selesai', color: 'emerald' },
  ]);

  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setAgendas(prev => [...prev].reverse());
    }, 1000);
  };

  const filteredAgendas = agendas.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.commission.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <Building className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 font-extrabold tracking-wide text-sm leading-none">SEKWAN MONITORING</h1>
            <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase block mt-1">DPRD Portal Internal</span>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button 
            id="notif-btn"
            onClick={() => setNotifications(0)} 
            className="relative p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-sm"
          >
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <span className="block text-xs font-bold text-slate-900">{user?.name || 'User'}</span>
              <span className="block text-[10px] text-blue-600 font-semibold">{user?.role || 'Admin'}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-extrabold text-blue-600 shadow-sm">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'AD'}
            </div>
            
            <button 
              id="logout-btn"
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 transition-all shadow-sm"
              title="Keluar Aplikasi"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-lg shadow-blue-500/10 relative overflow-hidden">
          {/* Glowing element inside */}
          <div className="absolute right-0 top-0 w-80 h-full bg-white/[0.05] blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="space-y-1 z-10">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span className="text-[10px] text-blue-100 uppercase tracking-widest font-extrabold">Sistem Aman Terintegrasi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Selamat Datang di Portal Monitoring, {user?.name.split(' ')[0]}!</h2>
            <p className="text-xs text-blue-100">Terakhir masuk pada: <span className="text-white font-semibold">{user?.lastLogin}</span></p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 z-10">
            <button 
              id="refresh-btn"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memuat Ulang...' : 'Segarkan Data'}</span>
            </button>
            <button 
              id="new-agenda-btn"
              onClick={() => alert('Fitur tambah agenda baru disimulasikan untuk prototipe.')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-blue-600 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Agenda</span>
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-250/80 flex items-center justify-between shadow-sm shadow-slate-100/50">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Agenda Hari Ini</span>
              <span className="block text-2xl font-black text-slate-800">4 Rapat</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                1 Paripurna Utama
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-250/80 flex items-center justify-between shadow-sm shadow-slate-100/50">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Surat Disposisi</span>
              <span className="block text-2xl font-black text-slate-800">18 Surat</span>
              <span className="text-[10px] text-slate-500 font-semibold">
                5 Menunggu Persetujuan
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-250/80 flex items-center justify-between shadow-sm shadow-slate-100/50">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Kehadiran Anggota</span>
              <span className="block text-2xl font-black text-slate-800">92.4%</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.1% minggu ini
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-250/80 flex items-center justify-between shadow-sm shadow-slate-100/50">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Dokumen Selesai</span>
              <span className="block text-2xl font-black text-slate-800">98.9%</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Optimal
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Detailed Layout: Main Table and Sidebar Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Large Card: Agenda Table */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col space-y-4 shadow-sm shadow-slate-100/30">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Agenda Rapat & Kegiatan DPRD</h3>
                <p className="text-xs text-slate-500">Menampilkan seluruh agenda legislatif hari ini.</p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-60">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Cari agenda atau komisi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-slate-800 placeholder-slate-400 transition-all"
                />
              </div>
            </div>

            {/* Agenda List / Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Nama Agenda / Kegiatan</th>
                    <th className="py-3 px-4">Komisi / Sektor</th>
                    <th className="py-3 px-4">Ruang / Lokasi</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAgendas.length > 0 ? (
                    filteredAgendas.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900 max-w-xs sm:max-w-md">
                          <div className="space-y-1">
                            <p>{item.title}</p>
                            <span className="text-[10px] text-slate-500 font-semibold block">{item.time}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-700 font-medium">
                          <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-600">
                            {item.commission}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{item.room}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider 
                            ${item.status === 'Berlangsung' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
                            ${item.status === 'Menunggu' ? 'bg-yellow-50 text-yellow-700 border border-yellow-250' : ''}
                            ${item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : ''}
                          `}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400">
                        Tidak ada agenda rapat yang cocok dengan pencarian Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="space-y-6">
            
            {/* Widget 1: Status Disposisi */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm shadow-slate-100/30">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Status Distribusi Disposisi</h3>
                <p className="text-[11px] text-slate-550">Progres tindak lanjut surat masuk sekretariat.</p>
              </div>

              <div className="space-y-3">
                {/* Progress bar 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Bagian Keuangan</span>
                    <span className="text-emerald-600">85% (12/14)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Progress bar 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Bagian Hukum & Perundang-undangan</span>
                    <span className="text-blue-600">92% (23/25)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: '92%' }}></div>
                  </div>
                </div>

                {/* Progress bar 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Bagian Humas & Protokol</span>
                    <span className="text-indigo-600">60% (6/10)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Quick Info */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 space-y-4 shadow-sm shadow-slate-100/30">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs uppercase tracking-widest font-extrabold text-blue-600">Ringkasan Sistem</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aplikasi ini terhubung langsung ke Server Pusat Data DPRD Provinsi. Segala bentuk modifikasi data dicatat dalam log audit resmi demi keamanan informasi negara.
              </p>
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center space-x-3 text-xs text-slate-500 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Lisensi Terdaftar: <strong className="text-slate-700">DPRD Corp Portal PRO</strong></span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-[10px] text-slate-400 mt-auto">
        &copy; {new Date().getFullYear()} Sekretariat DPRD. Seluruh hak cipta dilindungi. Sistem Pemantauan v2.0.0
      </footer>
    </div>
  );
}

export default Dashboard;
