

import React, { useState, useEffect } from 'react';
import { 
    QrCodeIcon, 
    ShareIcon, 
    DotsVerticalIcon, 
    ChevronLeftIcon,
    HomeIcon,
    ClipboardListIcon,
    ShoppingBagIcon,
    // Service Icons
    CardToCardIcon,
    BalanceIcon,
    SayadiCheckIcon,
    TrackTransferIcon,
    DirectDebitIcon,
    LoanRequestIcon,
    CreditScoringIcon,
    BamanClubIcon,
    TopUpIcon,
    InternetIcon,
    BillIcon,
    IrancellIcon,
    ShetabIcon,
    ChargeIcon,
    // New Icons
    MapIcon,
    SparklesIcon,
    GlobeAltIcon,
    ShoppingCartIcon,
    BuildingStorefrontIcon,
    HeartIcon,
    CpuChipIcon,
    HomeModernIcon,
    MapPinIcon,
    AdjustmentsHorizontalIcon,
    TagIcon,
    WrenchScrewdriverIcon,
    PaintBrushIcon,
    // Financial Report Icons
    ScaleIcon,
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    BanknotesIcon,
    TruckIcon,
    TicketIcon,
    // Club Icons
    StarIcon,
    GiftIcon,
    ArrowRightIcon,
    TrophyIcon,
    FireIcon,
    ChevronUpIcon,
    BellIcon,
    ClockIcon,
    CheckBadgeIcon,
} from './components/icons/Icons';

type Screen = 'home' | 'sour' | 'financialReport' | 'management';

// --- MOCK DATA ---
interface CardData {
  id: number;
  last4: string;
  bank: string;
  active?: boolean;
}

const cards: CardData[] = [
  { id: 1, last4: '۶۲۸۲', bank: 'بانک پاسارگاد', active: true },
  { id: 2, last4: '۲۶۶۵', bank: 'بانک سامان' },
  { id: 3, last4: '۰۳۸۰', bank: 'بانک آینده' },
];

const financialServices = [
    { name: 'کارت به کارت', icon: CardToCardIcon },
    { name: 'موجودی', icon: BalanceIcon },
    { name: 'چک صیادی', icon: SayadiCheckIcon },
    { name: 'پیگیری وضعیت کارت به کارت', icon: TrackTransferIcon, longLabel: true },
    { name: 'برداشت مستقیم', icon: DirectDebitIcon },
    { name: 'درخواست وام', icon: LoanRequestIcon },
    { name: 'اعتبار سنجی', icon: CreditScoringIcon },
    { name: 'کلاب 724', icon: BamanClubIcon },
];

const mobileServices = [
    { name: 'شارژ', icon: TopUpIcon },
    { name: 'اینترنت', icon: InternetIcon },
];

const billServices = [
    { name: 'قبض', icon: BillIcon },
    { name: '', icon: ChargeIcon },
    { name: '', icon: IrancellIcon },
    { name: '', icon: ShetabIcon },
];

// Updated Store interface to support various promotion types
interface Store {
    id: number;
    name: string;
    category: string;
    distance: string;
    promotion: {
        type: 'تخفیف' | 'کوپن' | 'بازگشت وجه' | 'توصیه';
        description: string;
        icon: React.FC<any>;
    };
    image: string;
}

// Updated mock data with new promotion types and removed badges
const allStores: Store[] = [
    // Original 8
    { id: 1, name: 'فروشگاه رفاه', category: 'سوپرمارکت', distance: '۲۰۰ متر', promotion: { type: 'تخفیف', description: '۱۰٪ تخفیف سراسری', icon: TagIcon }, image: 'https://i.imgur.com/5gChdJx.jpeg' },
    { id: 2, name: 'رستوران البرز', category: 'کافه/رستوران', distance: '۵۵۰ متر', promotion: { type: 'کوپن', description: 'کوپن خرید اول', icon: GiftIcon }, image: 'https://i.imgur.com/k2x2j2v.jpeg' },
    { id: 3, name: 'داروخانه دکتر رضایی', category: 'بهداشتی و سلامت', distance: '۷۰۰ متر', promotion: { type: 'بازگشت وجه', description: '۸٪ بازگشت وجه', icon: StarIcon }, image: 'https://i.imgur.com/8Qp2g2r.jpeg' },
    { id: 4, name: 'فروشگاه شهروند', category: 'خانه و آشپپزخانه', distance: '۱.۱ کیلومتر', promotion: { type: 'تخفیف', description: '۱۵٪ تخفیف لوازم خانگی', icon: TagIcon }, image: 'https://i.imgur.com/dAmY8vN.jpeg' },
    { id: 5, name: 'نمایندگی سامسونگ', category: 'کالای دیجیتال', distance: '۱.۵ کیلومتر', promotion: { type: 'بازگشت وجه', description: '۷٪ بازگشت وجه', icon: StarIcon }, image: 'https://i.imgur.com/Rk2y1jD.jpeg' },
    { id: 6, name: 'فروشگاه هاکوپیان', category: 'مد و پوشاک', distance: '۲.۳ کیلومتر', promotion: { type: 'کوپن', description: 'کوپن خرید دوم', icon: GiftIcon }, image: 'https://i.imgur.com/XwSjFvE.jpeg' },
    { id: 7, name: 'ابزار یراق محمدی', category: 'ابزارآلات و تجهیزات', distance: '۳.۰ کیلومتر', promotion: { type: 'تخفیف', description: '۵٪ تخفیف ابزار برقی', icon: TagIcon }, image: 'https://i.imgur.com/tY7g8Jt.jpeg' },
    { id: 8, name: 'شهر کتاب', category: 'فرهنگ و هنر', distance: '۴.۲ کیلومتر', promotion: { type: 'کوپن', description: '۲۰٪ تخفیف کتاب‌های کودک', icon: GiftIcon }, image: 'https://i.imgur.com/Oq3n2Zk.jpeg' },
    // Second set of 8
    { id: 9, name: 'فروشگاه رفاه (پلاس)', category: 'سوپرمارکت', distance: '۱.۸ کیلومتر', promotion: { type: 'تخفیف', description: '۵٪ تخفیف ویژه', icon: TagIcon }, image: 'https://i.imgur.com/5gChdJx.jpeg' },
    { id: 10, name: 'کافه ویونا', category: 'کافه/رستوران', distance: '۲.۱ کیلومتر', promotion: { type: 'توصیه', description: 'توصیه شده', icon: SparklesIcon }, image: 'https://i.imgur.com/k2x2j2v.jpeg' },
    { id: 11, name: 'داروخانه شبانه‌روزی', category: 'بهداشتی و سلامت', distance: '۲.۵ کیلومتر', promotion: { type: 'بازگشت وجه', description: '۵٪ بازگشت وجه', icon: StarIcon }, image: 'https://i.imgur.com/8Qp2g2r.jpeg' },
    { id: 12, name: 'لوازم خانگی پارس', category: 'خانه و آشپزخانه', distance: '۲.۹ کیلومتر', promotion: { type: 'تخفیف', description: '۱۰٪ تخفیف', icon: TagIcon }, image: 'https://i.imgur.com/dAmY8vN.jpeg' },
    { id: 13, name: 'موبایل پایتخت', category: 'کالای دیجیتال', distance: '۳.۲ کیلومتر', promotion: { type: 'بازگشت وجه', description: '۳٪ بازگشت وجه', icon: StarIcon }, image: 'https://i.imgur.com/Rk2y1jD.jpeg' },
    { id: 14, name: 'پوشاک تعطیلات', category: 'مد و پوشاک', distance: '۳.۵ کیلومتر', promotion: { type: 'کوپن', description: '۵۰ هزار تومان هدیه', icon: GiftIcon }, image: 'https://i.imgur.com/XwSjFvE.jpeg' },
    { id: 15, name: 'ابزار فروشی مرکزی', category: 'ابزارآلات و تجهیزات', distance: '۴.۰ کیلومتر', promotion: { type: 'تخفیف', description: 'تخفیف ویژه آخر فصل', icon: TagIcon }, image: 'https://i.imgur.com/tY7g8Jt.jpeg' },
    { id: 16, name: 'باغ کتاب', category: 'فرهنگ و هنر', distance: '۴.۸ کیلومتر', promotion: { type: 'کوپن', description: 'ارسال رایگان', icon: GiftIcon }, image: 'https://i.imgur.com/Oq3n2Zk.jpeg' },
    // Third set of 8
    { id: 17, name: 'هایپراستار', category: 'سوپرمارکت', distance: '۵.۱ کیلومتر', promotion: { type: 'تخفیف', description: 'تا ۲۰٪ تخفیف', icon: TagIcon }, image: 'https://i.imgur.com/5gChdJx.jpeg' },
    { id: 18, name: 'فست‌فود شیلا', category: 'کافه/رستوران', distance: '۵.۵ کیلومتر', promotion: { type: 'کوپن', description: 'نوشابه رایگان', icon: GiftIcon }, image: 'https://i.imgur.com/k2x2j2v.jpeg' },
    { id: 19, name: 'لوازم آرایشی روژا', category: 'بهداشتی و سلامت', distance: '۵.۹ کیلومتر', promotion: { type: 'بازگشت وجه', description: '۱۰٪ بازگشت وجه', icon: StarIcon }, image: 'https://i.imgur.com/8Qp2g2r.jpeg' },
    { id: 20, name: 'ایکیا (شعبه مجازی)', category: 'خانه و آشپزخانه', distance: '۶.۲ کیلومتر', promotion: { type: 'تخفیف', description: 'تخفیف حمل و نقل', icon: TagIcon }, image: 'https://i.imgur.com/dAmY8vN.jpeg' },
    { id: 21, name: 'دیجی‌کالا', category: 'کالای دیجیتال', distance: '۷.۰ کیلومتر', promotion: { type: 'توصیه', description: 'پیشنهاد ویژه', icon: SparklesIcon }, image: 'https://i.imgur.com/Rk2y1jD.jpeg' },
    { id: 22, name: 'زارا', category: 'مد و پوشاک', distance: '۷.۴ کیلومتر', promotion: { type: 'کوپن', description: 'تخفیف خرید بعدی', icon: GiftIcon }, image: 'https://i.imgur.com/XwSjFvE.jpeg' },
    { id: 23, name: 'فروشگاه رنگ و ابزار', category: 'ابزارآلات و تجهیزات', distance: '۸.۱ کیلومتر', promotion: { type: 'تخفیف', description: '۵٪ تخفیف نقدی', icon: TagIcon }, image: 'https://i.imgur.com/tY7g8Jt.jpeg' },
    { id: 24, name: 'نشر چشمه', category: 'فرهنگ و هنر', distance: '۹.۰ کیلومتر', promotion: { type: 'کوپن', description: '۱۰٪ تخفیف اولین خرید', icon: GiftIcon }, image: 'https://i.imgur.com/Oq3n2Zk.jpeg' },
];


// --- SCREENS ---

const HomeScreen = ({ onServiceClick }: { onServiceClick: (serviceName: string) => void }) => {
    // --- SUB-COMPONENTS ---
    const Header = ({ onServiceClick }: { onServiceClick: (serviceName: string) => void }) => {
        const [activeTab, setActiveTab] = useState('cards');

        const handleTabClick = (tab: string) => {
            setActiveTab(tab);
            if (tab === 'club') {
                onServiceClick('کلاب 724');
            }
        };

        return (
            <header className="px-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-400 p-2"><QrCodeIcon className="w-8 h-8" /></button>
                    <h1 className="text-blue-500 font-black text-3xl tracking-widest font-nunito">۷۲۴</h1>
                    <div className="w-10"></div> {/* Spacer */}
                </div>
                <nav className="flex justify-start items-center text-lg space-x-6 space-x-reverse text-gray-400 font-bold border-b border-gray-700">
                    <button onClick={() => handleTabClick('cards')} className={`py-3 transition-colors ${activeTab === 'cards' ? 'text-white border-b-2 border-blue-500' : 'hover:text-white'}`}>کارت‌های من</button>
                    <button onClick={() => handleTabClick('wallet')} className={`py-3 transition-colors ${activeTab === 'wallet' ? 'text-white border-b-2 border-blue-500' : 'hover:text-white'}`}>کیف پول من</button>
                    <button onClick={() => handleTabClick('club')} className={`py-3 transition-colors ${activeTab === 'club' ? 'text-white border-b-2 border-blue-500' : 'hover:text-white'}`}>کلاب</button>
                </nav>
            </header>
        );
    };

    const Card: React.FC<{ card: CardData, active?: boolean }> = ({ card, active }) => (
        <div className={`relative flex-shrink-0 w-72 h-44 rounded-2xl p-5 border-2 flex flex-col justify-between transition-all duration-300 ${active ? 'bg-gray-700/50 border-blue-500' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">{card.bank}</span>
                <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </div>
            </div>
            <div className="text-left">
                <p className="text-white text-2xl font-mono tracking-widest text-right">{`**** **** **** ${card.last4}`}</p>
            </div>
             <div className="h-6 flex justify-end items-center">
                {active && (
                    <button className="bg-blue-600 text-white font-bold px-5 py-1 rounded-md text-sm">
                        موجودی
                    </button>
                )}
            </div>
        </div>
    );
    
    const ServiceButton: React.FC<{ service: {name: string, icon: React.FC<any>, longLabel?: boolean} }> = ({ service }) => (
        <button onClick={() => service.name && onServiceClick(service.name)} className="flex flex-col items-center text-center gap-2 w-full">
            <div className="w-20 h-20 bg-[#2c2c3a] rounded-2xl flex items-center justify-center p-4">
                <service.icon className="w-full h-full text-gray-300" />
            </div>
            <span className={`text-sm text-gray-300 ${service.longLabel ? 'leading-tight' : ''}`}>{service.name}</span>
        </button>
    );

    return (
        <div className="flex flex-col flex-grow">
            <Header onServiceClick={onServiceClick} />
            <main className="flex-grow overflow-y-auto pb-24 scrollbar-hide px-4">
                <div className="flex overflow-x-auto scrollbar-hide py-8 gap-6">
                    {cards.map(card => <Card key={card.id} card={card} active={card.active} />)}
                    <div className="w-4 flex-shrink-0"></div>
                </div>

                <h2 className="text-xl font-bold text-right mb-4">سرویس ها</h2>
                <div className="space-y-6">
                     <section className="bg-[#2c2c3a] rounded-2xl p-4">
                        <h2 className="text-base font-bold text-right mb-4">مالی</h2>
                        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                            {financialServices.map(service => <ServiceButton key={service.name} service={service} />)}
                        </div>
                    </section>
                    <section className="bg-[#2c2c3a] rounded-2xl p-4">
                        <h2 className="text-base font-bold text-right mb-4">موبایل</h2>
                        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                            {mobileServices.map(service => <ServiceButton key={service.name} service={service} />)}
                        </div>
                    </section>
                    <section className="bg-[#2c2c3a] rounded-2xl p-4">
                        <h2 className="text-base font-bold text-right mb-4">قبض</h2>
                        <div className="grid grid-cols-4 gap-y-4 gap-x-2">
                             {billServices.map((service, index) => <ServiceButton key={index} service={service} />)}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

const SourScreen = () => {
    type LocationStatus = 'idle' | 'loading' | 'success';

    const [activeCategory, setActiveCategory] = useState('همه');
    const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');

    // --- Geolocation Effect ---
    useEffect(() => {
        setLocationStatus('loading');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationStatus('success');
            },
            (error) => {
                console.warn("Geolocation permission denied or error. Showing default list.", error.message);
                // On error, just show the default list of stores
                setLocationStatus('success');
            },
            { timeout: 10000 }
        );
    }, []);
    
    // --- Data ---
    const categories = [
        { name: 'همه', icon: GlobeAltIcon },
        { name: 'سوپرمارکت', icon: ShoppingCartIcon },
        { name: 'کافه/رستوران', icon: BuildingStorefrontIcon },
        { name: 'بهداشتی و سلامت', icon: HeartIcon },
        { name: 'خانه و آشپزخانه', icon: HomeModernIcon },
        { name: 'کالای دیجیتال', icon: CpuChipIcon },
        { name: 'مد و پوشاک', icon: TagIcon },
        { name: 'ابزارآلات و تجهیزات', icon: WrenchScrewdriverIcon },
        { name: 'فرهنگ و هنر', icon: PaintBrushIcon },
    ];
    
    const filteredStores = activeCategory === 'همه'
        ? allStores
        : allStores.filter(store => store.category === activeCategory);


    // --- Sub-Components ---
    const CategoryFilter = () => (
        <div className="flex items-center gap-2">
            <div className="flex-grow overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 px-4">
                    {categories.map(cat => (
                        <button 
                            key={cat.name} 
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${activeCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-[#2c2c3a] text-gray-300'}`}
                        >
                            <cat.icon className="w-5 h-5" />
                            <span className="text-sm font-semibold">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <button className="p-3 bg-[#2c2c3a] rounded-full mr-4">
                <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-300" />
            </button>
        </div>
    );

    const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
        const promotionStyles = {
            'تخفیف': 'bg-emerald-500/30 text-emerald-400',
            'کوپن': 'bg-amber-500/30 text-amber-400',
            'بازگشت وجه': 'bg-indigo-500/30 text-indigo-400',
            'توصیه': 'bg-sky-500/30 text-sky-400',
        };

        return (
            <div className="bg-[#2c2c3a] rounded-2xl overflow-hidden flex shadow-lg">
                <img src={store.image} alt={store.name} className="w-28 h-28 object-cover flex-shrink-0" />
                <div className="p-3 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex items-center gap-2">
                             <h3 className="font-bold text-lg text-white">{store.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{store.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            {store.distance}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${promotionStyles[store.promotion.type]}`}>
                            <store.promotion.icon className="w-4 h-4" />
                            <span>{store.promotion.description}</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const MainContent = () => {
        switch (locationStatus) {
            case 'loading':
                return <div className="text-center p-10"><p className="text-gray-400">در حال دریافت موقعیت مکانی...</p></div>;
            case 'success':
                 if (filteredStores.length === 0) {
                    return <div className="text-center p-10"><p className="text-gray-400">فروشگاهی در این دسته یافت نشد.</p></div>;
                }
                return (
                    <div className="space-y-4">
                        {filteredStores.map(store => <StoreCard key={store.id} store={store} />)}
                    </div>
                );
            default: // 'idle'
                return <div className="text-center p-10"><p className="text-gray-400">برای مشاهده فروشگاه‌ها، دسترسی به موقعیت مکانی را فعال کنید.</p></div>;
        }
    };

    return (
        <div className="flex-grow flex flex-col">
            <header className="p-4">
                <h1 className="text-2xl font-bold text-center text-white">سورهای اطراف من</h1>
            </header>
            <div className="py-4 border-b border-gray-800">
                <CategoryFilter />
            </div>
            <main className="flex-grow p-4 overflow-y-auto scrollbar-hide">
                <MainContent />
            </main>
        </div>
    );
};


const FinancialReportScreen = () => {
    // --- MOCK DATA ---
    const financialOverview = {
        totalBalance: 25450000,
        monthExpense: 4850000,
        monthIncome: 15000000,
        savingGoal: 2100000,
    };

    const expenseCategories = [
        { name: 'خوراک و رستوران', amount: 1500000, color: 'text-indigo-400', colorHex: '#818cf8' },
        { name: 'حمل و نقل', amount: 850000, color: 'text-sky-400', colorHex: '#38bdf8' },
        { name: 'خرید', amount: 1200000, color: 'text-amber-400', colorHex: '#facc15' },
        { name: 'تفریح و سرگرمی', amount: 600000, color: 'text-emerald-400', colorHex: '#34d399' },
        { name: 'سایر', amount: 700000, color: 'text-gray-400', colorHex: '#9ca3af' },
    ];

    const recentTransactions = [
        { id: 1, type: 'expense', title: 'اسنپ فود', category: 'خوراک و رستوران', date: 'امروز، ۱۸:۲۳', amount: -185000, icon: BuildingStorefrontIcon, iconBg: 'bg-indigo-500/20' },
        { id: 2, type: 'expense', title: 'شارژ کارت مترو', category: 'حمل و نقل', date: 'امروز، ۰۸:۱۰', amount: -50000, icon: TruckIcon, iconBg: 'bg-sky-500/20' },
        { id: 3, type: 'income', title: 'حقوق ماهانه', category: 'درآمد', date: 'دیروز', amount: 15000000, icon: ArrowTrendingUpIcon, iconBg: 'bg-green-500/20' },
        { id: 4, type: 'expense', title: 'خرید لباس از دیجی‌کالا', category: 'خرید', date: '۲ روز پیش', amount: -950000, icon: ShoppingBagIcon, iconBg: 'bg-amber-500/20' },
        { id: 5, type: 'expense', title: 'بلیط سینما', category: 'تفریح و سرگرمی', date: '۳ روز پیش', amount: -120000, icon: TicketIcon, iconBg: 'bg-emerald-500/20' },
    ];
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fa-IR').format(amount);
    }
    
    // --- SUB-COMPONENTS ---
    const OverviewCard: React.FC<{ title: string; amount: number; icon: React.FC<any>;}> = ({ title, amount, icon: Icon }) => (
        <div className="bg-[#2c2c3a] p-3 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-gray-900/50 rounded-lg">
                <Icon className="w-6 h-6 text-gray-300" />
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="font-bold text-white text-md">{formatCurrency(amount)}</p>
            </div>
        </div>
    );
    
    const DonutChart: React.FC<{data: typeof expenseCategories}> = ({ data }) => {
        const total = data.reduce((acc, item) => acc + item.amount, 0);
        let accumulatedPercentage = 0;

        return (
            <div className="bg-[#2c2c3a] p-4 rounded-xl">
                 <h3 className="font-bold text-lg text-white mb-4">تفکیک هزینه‌ها</h3>
                <div className="flex items-center justify-between gap-4">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.9155" className="stroke-current text-gray-700" strokeWidth="4" fill="transparent"></circle>
                            {data.map((item, index) => {
                                const percentage = (item.amount / total) * 100;
                                const offset = 25 - accumulatedPercentage;
                                accumulatedPercentage += percentage;
                                return (
                                     <circle
                                        key={index}
                                        cx="18"
                                        cy="18"
                                        r="15.9155"
                                        className="transition-all duration-500"
                                        stroke={item.colorHex}
                                        strokeWidth="4"
                                        strokeDasharray={`${percentage} ${100 - percentage}`}
                                        strokeDashoffset={offset}
                                        fill="transparent"
                                     ></circle>
                                )
                            })}
                        </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs text-gray-400">کل هزینه</span>
                            <span className="font-bold text-white text-lg">{formatCurrency(total)}</span>
                        </div>
                    </div>
                    <div className="flex-grow space-y-2 text-sm">
                        {data.map(item => (
                             <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-').replace('-400', '-500')}`}></div>
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                                <span className={`${item.color} font-semibold`}>{Math.round((item.amount / total) * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    
    const TransactionItem: React.FC<{ item: typeof recentTransactions[0] }> = ({ item }) => (
        <div className="flex items-center gap-4 py-2">
            <div className={`p-3 rounded-full ${item.iconBg}`}>
                <item.icon className={`w-6 h-6 ${item.type === 'income' ? 'text-green-400' : 'text-gray-300'}`} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-gray-400">{item.date}</p>
            </div>
            <p className={`font-bold text-lg ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {item.type === 'income' ? '+' : ''}{formatCurrency(item.amount)}
            </p>
        </div>
    );
    
    return (
        <div className="flex-grow flex flex-col">
            <header className="p-4">
                <h1 className="text-2xl font-bold text-center text-white">گزارش مالی</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <OverviewCard title="موجودی کل" amount={financialOverview.totalBalance} icon={ScaleIcon} />
                    <OverviewCard title="هزینه این ماه" amount={financialOverview.monthExpense} icon={ArrowTrendingDownIcon} />
                    <OverviewCard title="درآمد این ماه" amount={financialOverview.monthIncome} icon={ArrowTrendingUpIcon} />
                    <OverviewCard title="در حال پس‌انداز" amount={financialOverview.savingGoal} icon={BanknotesIcon} />
                </div>
                
                <DonutChart data={expenseCategories} />

                <div className="flex gap-3">
                    <button className="flex-1 bg-[#2c2c3a] text-white font-semibold py-3 rounded-lg">تنظیم بودجه</button>
                    <button className="flex-1 bg-[#2c2c3a] text-white font-semibold py-3 rounded-lg">اهداف پس‌انداز</button>
                    <button className="flex-1 bg-[#2c2c3a] text-white font-semibold py-3 rounded-lg">تحلیل هزینه‌ها</button>
                </div>
                
                <div>
                    <h3 className="font-bold text-lg text-white my-4">آخرین تراکنش‌ها</h3>
                    <div className="space-y-3">
                        {recentTransactions.map(item => <TransactionItem key={item.id} item={item} />)}
                    </div>
                </div>

            </main>
        </div>
    );
};

const ManagementScreen = () => (
  <div className="flex-grow p-6 text-center flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold text-white">مدیریت</h1>
    <p className="text-gray-400 mt-2">این صفحه در دست ساخت است.</p>
  </div>
);

const SourPopup = ({ onEnter }: { onEnter: () => void }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-[#2c2c3a] rounded-2xl p-8 text-center flex flex-col items-center shadow-lg border border-gray-700/60">
            <SparklesIcon className="w-16 h-16 text-amber-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">بدون سور خرید نرو!</h2>
            <p className="text-gray-300 mb-6 max-w-xs">از تخفیف‌ها و امتیازهای ویژه فروشگاه‌های اطراف استفاده کن.</p>
            <button onClick={onEnter} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold px-10 py-3 rounded-lg shadow-lg text-lg">
                ورود به سور
            </button>
        </div>
    </div>
);

// --- BAMAN CLUB SCREENS ---

type ClubPage = 'dashboard' | 'rewards' | 'history' | 'merchants' | 'missions' | 'bedeBestan';

const ClubDashboard = ({ setPage, stores }: { setPage: (page: ClubPage) => void; stores: Store[] }) => {
    // Mock data for the club dashboard
    const userData = {
        points: 4850,
        level: 'نقره‌ای',
        levelProgress: 65, // percentage
        nextLevel: 'طلایی',
    };
    const dailyMission = { title: "۳ تراکنش کارت به کارت", progress: "۱/۳" };
    const weeklyMission = { title: "پرداخت قبض اینترنت", progress: "۰/۱" };
    
    // Defensive check to prevent crash if stores prop is undefined
    const nearbyOffers = (stores || []).slice(0, 3);
    
    const shortcuts = [
        { name: "دریافت امتیاز", icon: StarIcon, page: 'missions' as ClubPage },
        { name: "فروشگاه جوایز", icon: GiftIcon, page: 'rewards' as ClubPage },
        { name: "بده بستان", icon: ShareIcon, page: 'bedeBestan' as ClubPage },
        { name: "فروشگاه ها", icon: BuildingStorefrontIcon, page: 'merchants' as ClubPage },
    ];

    const promotionStyles = {
        'تخفیف': 'bg-emerald-500/30 text-emerald-400',
        'کوپن': 'bg-amber-500/30 text-amber-400',
        'بازگشت وجه': 'bg-indigo-500/30 text-indigo-400',
        'توصیه': 'bg-sky-500/30 text-sky-400',
    };
    
    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-6">
            {/* User Level & Points */}
            <div className="bg-gradient-to-l from-blue-800 to-sky-700 rounded-2xl p-5 text-white shadow-lg text-right">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg font-bold flex items-center gap-2"><TrophyIcon className="w-6 h-6 text-amber-300"/>سطح {userData.level}</p>
                        <p className="text-sm opacity-80">امتیاز شما</p>
                    </div>
                    <div className="text-left">
                        <p className="text-4xl font-black font-nunito">{userData.points.toLocaleString('en-US')}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="w-full bg-black/30 rounded-full h-2.5">
                        <div className="bg-amber-400 h-2.5 rounded-full" style={{width: `${userData.levelProgress}%`}}></div>
                    </div>
                    <p className="text-xs mt-1 text-left opacity-90">{userData.levelProgress}% تا سطح {userData.nextLevel}</p>
                </div>
            </div>

            {/* Missions */}
            <div>
                <h2 className="text-xl font-bold text-white mb-3 text-right">مأموریت‌ها</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#2c2c3a] p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">ماموریت روز</p>
                            <p className="text-sm text-gray-300">{dailyMission.title}</p>
                        </div>
                        <p className="font-bold text-amber-400">{dailyMission.progress}</p>
                    </div>
                     <div className="bg-[#2c2c3a] p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">ماموریت هفته</p>
                            <p className="text-sm text-gray-300">{weeklyMission.title}</p>
                        </div>
                        <p className="font-bold text-amber-400">{weeklyMission.progress}</p>
                    </div>
                </div>
            </div>

            {/* Redeemable Points */}
             <div className="bg-[#2c2c3a] p-4 rounded-xl text-center">
                <p className="font-bold text-white">امتیاز شما آماده تبدیل به جایزه است!</p>
                <button onClick={() => setPage('rewards')} className="mt-3 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg">
                    تبدیل امتیاز
                </button>
            </div>
            
            {/* Nearby Hot Offers */}
            <div>
                <h2 className="text-xl font-bold text-white mb-3 text-right flex items-center gap-2">
                    <FireIcon className="w-6 h-6 text-red-500" />
                    آفرهای داغ اطراف شما
                </h2>
                <div className="space-y-3">
                    {nearbyOffers.map(offer => (
                        <div key={offer.id} className="bg-[#2c2c3a] rounded-xl p-3 flex items-center gap-3">
                            <img src={offer.image} alt={offer.name} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-grow text-right">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-white">{offer.name}</p>
                                </div>
                                <p className="text-sm text-gray-400">{offer.distance}</p>
                            </div>
                            <div className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${promotionStyles[offer.promotion.type]}`}>
                                 <offer.promotion.icon className="w-4 h-4" />
                                <span>{offer.promotion.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shortcuts */}
             <div className="bg-[#2c2c3a] p-2 rounded-xl">
                 <div className="grid grid-cols-4 gap-1 text-center">
                    {shortcuts.map(item => (
                        <button key={item.name} onClick={() => setPage(item.page)} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-900/50">
                            <item.icon className="w-8 h-8 text-gray-300" />
                            <span className="text-xs text-gray-400">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>

        </main>
    );
};

const ClubRewardsScreen = () => {
    const userPoints = 4850;
    const rewards = [
        { id: 1, title: 'کارت هدیه ۵۰ هزار تومانی دیجی‌کالا', points: 3000, image: 'https://i.imgur.com/gfaS470.png' },
        { id: 2, title: 'اشتراک ۱ ماهه فیلیمو', points: 4500, image: 'https://i.imgur.com/JDA0s3v.png' },
        { id: 3, title: 'بسته اینترنت 5 گیگ ایرانسل', points: 5200, image: 'https://i.imgur.com/rL4iL5k.png' },
        { id: 4, title: 'کد تخفیف ۱۰۰ هزار تومانی اسنپ', points: 6000, image: 'https://i.imgur.com/uFvYV4r.png' },
    ];
    
     const RewardCard: React.FC<{ reward: typeof rewards[0], currentPoints: number }> = ({ reward, currentPoints }) => {
        const hasEnoughPoints = currentPoints >= reward.points;
        return (
            <div className="bg-[#2c2c3a] rounded-xl p-3 flex flex-col items-center gap-2 shadow-md text-center">
                <img src={reward.image} alt={reward.title} className="w-24 h-24 rounded-lg object-contain bg-white p-1" />
                <p className="font-bold text-white text-sm flex-grow h-10">{reward.title}</p>
                <p className="text-amber-400 font-semibold flex items-center gap-1 justify-center my-1">
                    {reward.points.toLocaleString('fa-IR')} <StarIcon className="w-5 h-5" />
                </p>
                <button 
                    disabled={!hasEnoughPoints}
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    دریافت
                </button>
            </div>
        );
    };

    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-4">
                {rewards.map(reward => <RewardCard key={reward.id} reward={reward} currentPoints={userPoints} />)}
            </div>
        </main>
    )
}

const ClubHistoryScreen = () => {
    const history = [
        {id: 1, title: "کارت به کارت", type: "earn", points: 10, date: "امروز", icon: CardToCardIcon },
        {id: 2, title: "ماموریت روزانه", type: "earn", points: 50, date: "دیروز", icon: CheckBadgeIcon },
        {id: 3, title: "دریافت جایزه دیجی‌کالا", type: "spend", points: -3000, date: "۲ روز پیش", icon: GiftIcon },
        {id: 4, title: "پرداخت قبض", type: "earn", points: 5, date: "۲ روز پیش", icon: BillIcon },
        {id: 5, title: "خرید از فروشگاه رفاه", type: "earn", points: 120, date: "۴ روز پیش", icon: ShoppingCartIcon },
    ];

    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide">
            <div className="space-y-3">
                {history.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-[#2c2c3a] rounded-xl">
                        <div className={`p-3 rounded-full ${item.type === 'earn' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            <item.icon className={`w-6 h-6 ${item.type === 'earn' ? 'text-green-400' : 'text-red-400'}`} />
                        </div>
                        <div className="flex-grow text-right">
                             <p className="font-semibold text-white">{item.title}</p>
                             <p className="text-sm text-gray-400">{item.date}</p>
                        </div>
                        <p className={`font-bold text-lg ${item.type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>
                            {item.type === 'earn' ? '+' : ''}{item.points.toLocaleString('fa-IR')}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
};

const ClubMerchantsScreen = ({ stores }: { stores: Store[] }) => {
    const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
        const promotionStyles = {
            'تخفیف': 'bg-emerald-500/30 text-emerald-400',
            'کوپن': 'bg-amber-500/30 text-amber-400',
            'بازگشت وجه': 'bg-indigo-500/30 text-indigo-400',
            'توصیه': 'bg-sky-500/30 text-sky-400',
        };

        return (
            <div className="bg-[#2c2c3a] rounded-2xl overflow-hidden flex shadow-lg">
                <img src={store.image} alt={store.name} className="w-28 h-28 object-cover flex-shrink-0" />
                <div className="p-3 flex flex-col justify-between flex-grow text-right">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-white">{store.name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{store.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            {store.distance}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${promotionStyles[store.promotion.type]}`}>
                           <store.promotion.icon className="w-4 h-4" />
                           <span>{store.promotion.description}</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-4">
            {(stores || []).map(store => <StoreCard key={store.id} store={store} />)}
        </main>
    );
};

const ClubMissionsScreen = () => {
    const missions = [
        // Daily
        { id: 1, category: 'روزانه', title: '۳ تراکنش کارت به کارت', points: 50, current: 1, target: 3, icon: CardToCardIcon },
        { id: 2, category: 'روزانه', title: 'خرید شارژ موبایل', points: 15, current: 0, target: 1, icon: TopUpIcon },
        // Weekly
        { id: 3, category: 'هفتگی', title: 'پرداخت قبض اینترنت', points: 100, current: 0, target: 1, icon: InternetIcon },
        { id: 4, category: 'هفتگی', title: 'خرید از فروشگاه‌های سور', points: 250, current: 1, target: 5, icon: ShoppingCartIcon },
        // Special
        { id: 5, category: 'ویژه', title: 'دعوت از دوستان', points: 500, current: 0, target: 1, icon: ShareIcon },
        { id: 6, category: 'ویژه', title: 'رسیدن به سطح طلایی', points: 1000, current: 0, target: 1, icon: TrophyIcon },
    ];

    const MissionCard: React.FC<{ mission: typeof missions[0] }> = ({ mission }) => {
        const progress = (mission.current / mission.target) * 100;
        const isComplete = mission.current >= mission.target;

        return (
            <div className="bg-[#2c2c3a] rounded-xl p-4 flex items-center gap-4">
                <div className={`p-3 rounded-full ${isComplete ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                    <mission.icon className={`w-7 h-7 ${isComplete ? 'text-green-400' : 'text-blue-400'}`} />
                </div>
                <div className="flex-grow text-right">
                    <p className="font-bold text-white">{mission.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`} 
                                style={{width: `${progress}%`}}
                            ></div>
                        </div>
                        <span className="text-sm text-gray-400 font-mono">{mission.current}/{mission.target}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-amber-400 text-lg">+{mission.points}</p>
                    <p className="text-xs text-gray-400">امتیاز</p>
                </div>
            </div>
        );
    };

    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-6">
            <div>
                <h3 className="font-bold text-lg text-white mb-3 text-right">مأموریت‌های روزانه</h3>
                <div className="space-y-3">
                    {missions.filter(m => m.category === 'روزانه').map(mission => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-bold text-lg text-white mb-3 text-right">مأموریت‌های هفتگی</h3>
                <div className="space-y-3">
                    {missions.filter(m => m.category === 'هفتگی').map(mission => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-bold text-lg text-white mb-3 text-right">مأموریت‌های ویژه</h3>
                <div className="space-y-3">
                    {missions.filter(m => m.category === 'ویژه').map(mission => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>
            </div>
        </main>
    );
};

const ClubBedeBestanScreen = () => {
    const userPoints = 4850;
    const [mobile, setMobile] = useState('');
    const [points, setPoints] = useState(0);

    const handleTransfer = () => {
        alert(`${points} امتیاز با موفقیت به شماره ${mobile} انتقال یافت.`);
        setMobile('');
        setPoints(0);
    };

    const isMobileValid = /^09\d{9}$/.test(mobile);
    const canTransfer = isMobileValid && points > 0 && points <= userPoints;

    return (
        <main className="flex-grow p-4 overflow-y-auto scrollbar-hide space-y-6">
            <div className="bg-[#2c2c3a] p-5 rounded-xl text-center">
                 <p className="text-gray-300">می‌توانید بخشی از امتیاز خود را به دوستانتان هدیه دهید.</p>
            </div>

            <div className="bg-[#2c2c3a] p-5 rounded-xl space-y-4">
                 <div>
                    <label htmlFor="mobile-input" className="block text-right text-sm font-medium text-gray-400 mb-1">شماره موبایل مقصد</label>
                    <input
                        id="mobile-input"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength={11}
                        placeholder="09123456789"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg h-[50px] text-lg text-right text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                 <div>
                    <label htmlFor="points-slider" className="block text-right text-sm font-medium text-gray-400 mb-2">تعداد امتیاز (حداکثر ۱۰۰)</label>
                    <div className="flex items-center gap-4">
                        <input
                            id="points-slider"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="font-bold text-lg text-amber-400 w-12 text-center">{points}</span>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-400">
                موجودی امتیاز شما: <span className="font-bold text-white">{userPoints.toLocaleString('fa-IR')}</span>
            </div>

            <button 
                onClick={handleTransfer}
                disabled={!canTransfer}
                className="w-full bg-blue-600 text-white font-bold py-3 text-lg rounded-lg transition-colors hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                انتقال امتیاز
            </button>
        </main>
    );
};


const BamanClubContainer = ({ onBack, stores }: { onBack: () => void; stores: Store[] }) => {
    const [page, setPage] = useState<ClubPage>('dashboard');
    
    const pageTitles: Record<ClubPage, string> = {
        dashboard: 'کلاب 724',
        rewards: 'فروشگاه جوایز',
        history: 'تاریخچه امتیازات',
        merchants: 'فروشگاه‌های عضو',
        missions: 'ماموریت‌ها',
        bedeBestan: 'بده بستان امتیاز',
    };
    
    const handleBack = () => {
        if (page === 'dashboard') {
            onBack();
        } else {
            setPage('dashboard');
        }
    };

    const renderPage = () => {
        switch(page) {
            case 'dashboard':
                return <ClubDashboard setPage={setPage} stores={stores} />;
            case 'rewards':
                return <ClubRewardsScreen />;
            case 'history':
                return <ClubHistoryScreen />;
            case 'merchants':
                return <ClubMerchantsScreen stores={stores} />;
            case 'missions':
                return <ClubMissionsScreen />;
            case 'bedeBestan':
                return <ClubBedeBestanScreen />;
            default:
                return <ClubDashboard setPage={setPage} stores={stores} />;
        }
    };

    return (
        <div className="flex-grow flex flex-col bg-gradient-to-b from-[#242831] to-[#1a1c23]">
            <header className="p-4 flex items-center relative h-16 shrink-0 z-10">
                <button onClick={handleBack} className="absolute right-4 text-white p-2">
                    <ArrowRightIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-center text-white flex-grow">{pageTitles[page]}</h1>
                <div className="absolute left-4 flex items-center gap-2">
                     <button className="text-white p-2">
                        <ClockIcon className="w-6 h-6" />
                    </button>
                    <button className="text-white p-2">
                        <BellIcon className="w-6 h-6" />
                    </button>
                </div>
            </header>
            {renderPage()}
        </div>
    );
};


const App = () => {
    const [activeScreen, setActiveScreen] = useState<Screen>('home');
    const [isSourPopupVisible, setIsSourPopupVisible] = useState(false);
    const [currentSubScreen, setCurrentSubScreen] = useState<string | null>(null);


    const bottomNavItems = [
        { id: 'home', name: 'خانه', icon: HomeIcon },
        { id: 'sour', name: 'سور', icon: MapIcon },
        { id: 'financialReport', name: 'گزارش مالی', icon: ClipboardListIcon },
        { id: 'management', name: 'مدیریت', icon: ShoppingBagIcon },
    ];

    const handleNavClick = (screenId: string) => {
        if (currentSubScreen) {
            setCurrentSubScreen(null);
        }
        if (screenId === 'sour') {
            setIsSourPopupVisible(true);
        } else {
            setActiveScreen(screenId as Screen);
        }
    };

    const handleServiceClick = (serviceName: string) => {
        if (serviceName === 'کلاب 724') {
            setCurrentSubScreen('bamanClub');
        }
    };

    const handleEnterSour = () => {
        setIsSourPopupVisible(false);
        setActiveScreen('sour');
    };

    const renderScreen = () => {
        if (currentSubScreen === 'bamanClub') {
            return <BamanClubContainer onBack={() => setCurrentSubScreen(null)} stores={allStores} />;
        }
        
        switch (activeScreen) {
            case 'home':
                return <HomeScreen onServiceClick={handleServiceClick} />;
            case 'sour':
                return <SourScreen />;
            case 'financialReport':
                return <FinancialReportScreen />;
            case 'management':
                return <ManagementScreen />;
            default:
                return <HomeScreen onServiceClick={handleServiceClick} />;
        }
    }

    return (
        <div className="max-w-md mx-auto bg-[#1a1c23] text-gray-100 font-sans min-h-screen flex flex-col">
            {isSourPopupVisible && <SourPopup onEnter={handleEnterSour} />}
            {renderScreen()}
            {!currentSubScreen && (
                <footer className="fixed z-10 bottom-0 left-0 right-0 max-w-md mx-auto bg-[#242831]/90 backdrop-blur-sm border-t border-gray-700/60">
                    <nav className="flex justify-around items-center h-20">
                         {bottomNavItems.map(item => (
                            <button 
                                key={item.id} 
                                onClick={() => handleNavClick(item.id)}
                                className={`flex flex-col items-center gap-1 font-semibold transition-colors w-20 ${activeScreen === item.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                                <item.icon className="w-7 h-7" />
                                <span className="text-xs">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </footer>
            )}
        </div>
    );
};

export default App;