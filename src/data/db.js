export const DB = {
  users: [
    { id: 'admin', password: 'admin', name: 'Administrator', role: 'admin' },
    { id: 'sales1', password: 'sales', name: 'Budi', role: 'sales' }
  ],
  currentUser: null,

  coa: [
    { code: '1000', name: 'Kas', type: 'Asset', balance: 50000000 },
    { code: '1100', name: 'Sewa Diterima DiMuka', type: 'Liability', balance: 0 },
    { code: '1200', name: 'Piutang Usaha', type: 'Asset', balance: 0 },
    { code: '2000', name: 'Hutang Usaha', type: 'Liability', balance: 0 },
    { code: '3000', name: 'Modal Pemilik', type: 'Equity', balance: 50000000 },
    { code: '4000', name: 'Pendapatan Sewa Kebaya', type: 'Revenue', balance: 0 },
    { code: '5000', name: 'Harga Pokok Sewa', type: 'Expense', balance: 0 },
    { code: '5100', name: 'Biaya Operasional', type: 'Expense', balance: 0 },
    { code: '5200', name: 'Biaya Administrasi', type: 'Expense', balance: 0 }
  ],

  kebaya: [],
  customer: [],
  employee: [],
  orders: [],
  payments: [],
  journals: [],
  journalDetails: [],
  isBookClosed: false,

  nextKebayaId: 1,
  nextCustomerId: 1,
  nextEmployeeId: 1,
  nextOrderId: 1,
  nextPaymentId: 1,
  nextJournalId: 1
};

function initSampleData() {
  DB.kebaya = [
    { id: DB.nextKebayaId++, name: 'Kebaya Silk Merah', size: 'M', price: 150000, status: 'tersedia' },
    { id: DB.nextKebayaId++, name: 'Kebaya Brokat Putih', size: 'L', price: 200000, status: 'tersedia' },
    { id: DB.nextKebayaId++, name: 'Kebaya Songket Hitam', size: 'M', price: 175000, status: 'tersedia' },
    { id: DB.nextKebayaId++, name: 'Kebaya Prada Pink', size: 'S', price: 250000, status: 'tersedia' }
  ];
  DB.customer = [
    { id: DB.nextCustomerId++, name: 'Siti Aminah', phone: '08123456789', address: 'Jakarta' },
    { id: DB.nextCustomerId++, name: 'Ahmad Fauzi', phone: '08129876543', address: 'Bandung' }
  ];
  DB.employee = [
    { id: DB.nextEmployeeId++, name: 'Budi Santoso', position: 'Sales', commission: 0.05 },
    { id: DB.nextEmployeeId++, name: 'Siti Rahayu', position: 'Sales', commission: 0.05 }
  ];
}
initSampleData();

export function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID');
}

export function today() {
  return new Date().toISOString().split('T')[0];
}
