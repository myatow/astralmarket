// js/data.js
// Общие данные для всего проекта

// Данные товаров
const products = [
    // Игры (games) - 12 товаров
    {
        id: 1,
        name: 'Cyberpunk 2077',
        category: 'games',
        image: 'images/cyberpunk1.jpg',
        icon: 'fas fa-dragon',
        price: 1999,
        oldPrice: 2999,
        badge: '-33%'
    },
    {
        id: 2,
        name: 'Elden Ring',
        category: 'games',
        image: 'images/eldenring1.jpg',
        icon: 'fas fa-crown',
        price: 2790,
        oldPrice: 3490,
        badge: 'хит'
    },
    {
        id: 3,
        name: 'Valorant Points',
        category: 'games',
        image: 'images/valorantpoints1.png',
        icon: 'fas fa-crosshairs',
        price: 1250,
        oldPrice: 1500,
        badge: 'промо'
    },
    {
        id: 4,
        name: 'PUBG G-Coin',
        category: 'games',
        image: 'images/pubgcoins1.avif',
        icon: 'fas fa-skull',
        price: 690,
        oldPrice: 990,
        badge: '-30%'
    },
    {
        id: 5,
        name: 'Call of Duty: MW III',
        category: 'games',
        image: 'images/mw3.jpg',
        icon: 'fas fa-crosshairs',
        price: 3490,
        oldPrice: 3990,
        badge: 'новинка'
    },
    {
        id: 6,
        name: 'Baldur\'s Gate 3',
        category: 'games',
        image: 'images/bg3.jpg',
        icon: 'fas fa-hat-wizard',
        price: 2590,
        oldPrice: 2990,
        badge: 'хит'
    },
    {
        id: 7,
        name: 'Hogwarts Legacy',
        category: 'games',
        image: 'images/hogwarts.jpg',
        icon: 'fas fa-hat-wizard',
        price: 2290,
        oldPrice: 2790,
        badge: '-18%'
    },
    {
        id: 8,
        name: 'Red Dead Redemption 2',
        category: 'games',
        image: 'images/red_dead2.jpg',
        icon: 'fas fa-horse',
        price: 1990,
        oldPrice: 2490,
        badge: 'скидка'
    },
    {
        id: 9,
        name: 'GTA V',
        category: 'games',
        image: 'images/gtav.jpeg',
        icon: 'fas fa-car',
        price: 1490,
        oldPrice: 1990,
        badge: '-25%'
    },
    {
        id: 10,
        name: 'The Witcher 3',
        category: 'games',
        image: 'images/thewitcher3.jpg',
        icon: 'fas fa-wand-sparkles',
        price: 990,
        oldPrice: 1490,
        badge: '-33%'
    },
    {
        id: 11,
        name: 'Starfield',
        category: 'games',
        image: 'images/starfield.jpeg',
        icon: 'fas fa-rocket',
        price: 3990,
        oldPrice: 4490,
        badge: 'новинка'
    },
    {
        id: 12,
        name: 'Diablo IV',
        category: 'games',
        image: 'images/diablo4.jpg',
        icon: 'fas fa-dragon',
        price: 3290,
        oldPrice: 3990,
        badge: '-18%'
    },

    // Steam (steam) - 12 товаров
    {
        id: 13,
        name: 'Steam Gift 1000₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 850,
        oldPrice: 1000,
        badge: 'скидка'
    },
    {
        id: 14,
        name: 'Steam Wallet 2500₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 2150,
        oldPrice: 2500,
        badge: '-14%'
    },
    {
        id: 15,
        name: 'Steam Gift 5000₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 4300,
        oldPrice: 5000,
        badge: '-14%'
    },
    {
        id: 16,
        name: 'Steam Wallet 1500₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 1290,
        oldPrice: 1500,
        badge: '-14%'
    },
    {
        id: 17,
        name: 'Steam Gift 3500₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 2990,
        oldPrice: 3500,
        badge: '-15%'
    },
    {
        id: 18,
        name: 'Steam Deck Funds',
        category: 'steam',
        image: 'images/steamdeck.jpg',
        icon: 'fab fa-steam',
        price: 5000,
        oldPrice: 5500,
        badge: 'пополнение'
    },
    {
        id: 19,
        name: 'CS2 Prime Status',
        category: 'steam',
        image: 'images/cs2prime.png',
        icon: 'fas fa-crown',
        price: 1290,
        oldPrice: 1490,
        badge: 'акция'
    },
    {
        id: 20,
        name: 'Dota 2 Battle Pass',
        category: 'steam',
        image: 'images/dota2bp.png',
        icon: 'fas fa-ticket',
        price: 990,
        oldPrice: 1290,
        badge: '-23%'
    },
    {
        id: 21,
        name: 'Steam Community Items',
        category: 'steam',
        image: 'images/steamitems.png',
        icon: 'fas fa-gem',
        price: 299,
        oldPrice: 399,
        badge: '-25%'
    },
    {
        id: 22,
        name: 'Steam Gift 750₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 650,
        oldPrice: 750,
        badge: '-13%'
    },
    {
        id: 23,
        name: 'Steam Wallet 3000₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 2590,
        oldPrice: 3000,
        badge: '-14%'
    },
    {
        id: 24,
        name: 'Steam Gift 2000₽',
        category: 'steam',
        image: 'images/steamgift.jpg',
        icon: 'fab fa-steam',
        price: 1720,
        oldPrice: 2000,
        badge: '-14%'
    },

    // Подписки (subscriptions) - 12 товаров
    {
        id: 25,
        name: 'Xbox Game Pass',
        category: 'subscriptions',
        image: 'images/xboxgamepass.png',
        icon: 'fab fa-xbox',
        price: 799,
        oldPrice: 999,
        badge: 'ultra'
    },
    {
        id: 26,
        name: 'PlayStation Plus',
        category: 'subscriptions',
        image: 'images/playstationplus.png',
        icon: 'fab fa-playstation',
        price: 2490,
        oldPrice: 3500,
        badge: 'Premium'
    },
    {
        id: 27,
        name: 'Discord Nitro',
        category: 'subscriptions',
        image: 'images/discordnitro1.png',
        icon: 'fab fa-discord',
        price: 399,
        oldPrice: 499,
        badge: 'месяц'
    },
    {
        id: 28,
        name: 'Netflix 1 месяц',
        category: 'subscriptions',
        image: 'images/netflix.jpg',
        icon: 'fab fa-netflix',
        price: 699,
        oldPrice: 899,
        badge: '-22%'
    },
    {
        id: 29,
        name: 'Spotify Premium 3 месяца',
        category: 'subscriptions',
        image: 'images/spotify.png',
        icon: 'fab fa-spotify',
        price: 299,
        oldPrice: 399,
        badge: '-25%'
    },
    {
        id: 30,
        name: 'Xbox Game Pass Ultimate',
        category: 'subscriptions',
        image: 'images/xboxult.jpg',
        icon: 'fab fa-xbox',
        price: 1290,
        oldPrice: 1490,
        badge: 'ультима'
    },
    {
        id: 31,
        name: 'PS Now',
        category: 'subscriptions',
        image: 'images/psnow.png',
        icon: 'fab fa-playstation',
        price: 1890,
        oldPrice: 2290,
        badge: '-17%'
    },
    {
        id: 32,
        name: 'Twitch Turbo',
        category: 'subscriptions',
        image: 'images/twitchturbo.jpg',
        icon: 'fab fa-twitch',
        price: 499,
        oldPrice: 599,
        badge: '-17%'
    },
    {
        id: 33,
        name: 'YouTube Premium',
        category: 'subscriptions',
        image: 'images/youtubepremium.jpg',
        icon: 'fab fa-youtube',
        price: 399,
        oldPrice: 499,
        badge: '-20%'
    },
    {
        id: 34,
        name: 'Apple Music',
        category: 'subscriptions',
        image: 'images/applemusic.png',
        icon: 'fab fa-apple',
        price: 299,
        oldPrice: 399,
        badge: '-25%'
    },
    {
        id: 35,
        name: 'Apple TV+',
        category: 'subscriptions',
        image: 'images/appletvplus.jpg',
        icon: 'fab fa-apple',
        price: 399,
        oldPrice: 499,
        badge: '-20%'
    },
    {
        id: 36,
        name: 'Disney+',
        category: 'subscriptions',
        image: 'images/disneyplus.jpg',
        icon: 'fas fa-mickey',
        price: 599,
        oldPrice: 799,
        badge: '-25%'
    },

    // Аккаунты (accounts) - 12 товаров
    {
        id: 37,
        name: 'Steam Аккаунт (Казахстан)',
        category: 'accounts',
        image: 'images/steamkz.jpg',
        icon: 'fas fa-user',
        price: 1490,
        oldPrice: 1990,
        badge: '5 игр'
    },
    {
        id: 38,
        name: 'Xbox Турецкий аккаунт',
        category: 'accounts',
        image: 'images/xboxtr.png',
        icon: 'fab fa-xbox',
        price: 890,
        oldPrice: 1290,
        badge: 'Game Pass'
    },
    {
        id: 39,
        name: 'PSN Аккаунт (Plus)',
        category: 'accounts',
        image: 'images/psnow.png',
        icon: 'fab fa-playstation',
        price: 1190,
        oldPrice: 1590,
        badge: 'подписка'
    },
    {
        id: 40,
        name: 'EA Play Аккаунт',
        category: 'accounts',
        image: 'images/eaplay.jpg',
        icon: 'fas fa-gamepad',
        price: 590,
        oldPrice: 890,
        badge: '-34%'
    },
    {
        id: 41,
        name: 'Ubisoft Турецкий аккаунт',
        category: 'accounts',
        image: 'images/ubisoftacc.png',
        icon: 'fas fa-crown',
        price: 790,
        oldPrice: 990,
        badge: '-20%'
    },
    {
        id: 42,
        name: 'Minecraft Аккаунт',
        category: 'accounts',
        image: 'images/minecraftacc.jpg',
        icon: 'fas fa-cube',
        price: 1290,
        oldPrice: 1690,
        badge: '-24%'
    },
    {
        id: 43,
        name: 'Valorant Аккаунт со скинами',
        category: 'accounts',
        image: 'images/valoacc.jpg',
        icon: 'fas fa-crosshairs',
        price: 1990,
        oldPrice: 2490,
        badge: 'скины'
    },
    {
        id: 44,
        name: 'Fortnite Аккаунт со скинами',
        category: 'accounts',
        image: 'images/fortniteacc.png',
        icon: 'fas fa-fort-awesome',
        price: 2490,
        oldPrice: 2990,
        badge: 'редкий'
    },
    {
        id: 45,
        name: 'Genshin Аккаунт',
        category: 'accounts',
        image: 'images/genshinacc.jpg',
        icon: 'fas fa-star',
        price: 3490,
        oldPrice: 3990,
        badge: '5⭐'
    },
    {
        id: 46,
        name: 'LoL Аккаунт',
        category: 'accounts',
        image: 'images/lolacc.jpg',
        icon: 'fas fa-hat-wizard',
        price: 890,
        oldPrice: 1190,
        badge: '-25%'
    },
    {
        id: 47,
        name: 'Roblox Аккаунт',
        category: 'accounts',
        image: 'images/robloxacc.jpg',
        icon: 'fas fa-robot',
        price: 690,
        oldPrice: 990,
        badge: '-30%'
    },
    {
        id: 48,
        name: 'Epic Games Аккаунт',
        category: 'accounts',
        image: 'images/epicgamesacc.jpg',
        icon: 'fas fa-hat-wizard',
        price: 1590,
        oldPrice: 1990,
        badge: '-20%'
    },

    // Ключи (keys) - 12 товаров
    {
        id: 49,
        name: 'Windows 11 ключ',
        category: 'keys',
        image: 'images/windows11key.jpg',
        icon: 'fab fa-windows',
        price: 299,
        oldPrice: 699,
        badge: '-57%'
    },
    {
        id: 50,
        name: 'Office 2021 Professional Plus ключ',
        category: 'keys',
        image: 'images/office2021pp.jpg',
        icon: 'fas fa-file-word',
        price: 399,
        oldPrice: 899,
        badge: '-56%'
    },
    {
        id: 51,
        name: 'Photoshop ключ',
        category: 'keys',
        image: 'images/photoshopkey.webp',
        icon: 'fas fa-image',
        price: 249,
        oldPrice: 599,
        badge: '-58%'
    },
    {
        id: 52,
        name: 'VPN ключ (год)',
        category: 'keys',
        image: 'images/vpnkey.png',
        icon: 'fas fa-shield',
        price: 1999,
        oldPrice: 2499,
        badge: '-25%'
    },
    {
        id: 53,
        name: 'Steam случайный ключ',
        category: 'keys',
        image: 'images/steamrandomacc.png',
        icon: 'fab fa-steam',
        price: 399,
        oldPrice: 599,
        badge: '-33%'
    },
    {
        id: 54,
        name: 'Origin ключ',
        category: 'keys',
        image: 'images/originkey.png',
        icon: 'fas fa-dragon',
        price: 299,
        oldPrice: 499,
        badge: '-40%'
    },
    {
        id: 55,
        name: 'Uplay ключ',
        category: 'keys',
        image: 'images/uplaykey.png',
        icon: 'fas fa-gamepad',
        price: 249,
        oldPrice: 399,
        badge: '-38%'
    },
    {
        id: 56,
        name: 'Minecraft ключ',
        category: 'keys',
        image: 'images/minecraftkey.webp',
        icon: 'fas fa-cube',
        price: 1590,
        oldPrice: 1990,
        badge: '-20%'
    },
    {
        id: 57,
        name: 'Касперский антивирус ключ 1 месяц',
        category: 'keys',
        image: 'images/kaspersky.png',
        icon: 'fas fa-shield-halved',
        price: 199,
        oldPrice: 399,
        badge: '-50%'
    },
    {
        id: 58,
        name: 'WinRAR ключ',
        category: 'keys',
        image: 'images/winrar.webp',
        icon: 'fas fa-file-zipper',
        price: 99,
        oldPrice: 199,
        badge: '-50%'
    },
    {
        id: 59,
        name: 'Adobe Creative Cloud',
        category: 'keys',
        image: 'images/adobekey.png',
        icon: 'fas fa-paint-brush',
        price: 1290,
        oldPrice: 2490,
        badge: '-48%'
    },
    {
        id: 60,
        name: 'IDM ключ',
        category: 'keys',
        image: 'images/idmkey.png',
        icon: 'fas fa-download',
        price: 199,
        oldPrice: 399,
        badge: '-50%'
    },

    // Другое (other) - 12 товаров
    {
        id: 61,
        name: 'Twitch Биты',
        category: 'other',
        image: 'images/twitchbits.png',
        icon: 'fab fa-twitch',
        price: 299,
        oldPrice: 399,
        badge: 'биты'
    },
    {
        id: 62,
        name: 'TikTok Монеты',
        category: 'other',
        image: 'images/ttcoins.webp',
        icon: 'fab fa-tiktok',
        price: 199,
        oldPrice: 299,
        badge: '-33%'
    },
    {
        id: 63,
        name: '1000 V-Bucks',
        category: 'other',
        image: 'images/vbucks.png',
        icon: 'fas fa-fort-awesome',
        price: 599,
        oldPrice: 799,
        badge: 'Fortnite'
    },
    {
        id: 64,
        name: 'Roblox 100 Robux',
        category: 'other',
        image: 'images/robux.webp',
        icon: 'fas fa-robot',
        price: 199,
        oldPrice: 299,
        badge: 'робуксы'
    },
    {
        id: 65,
        name: 'Телеграм Premium год',
        category: 'other',
        image: 'images/tgprem.jpg',
        icon: 'fab fa-telegram',
        price: 1990,
        oldPrice: 2490,
        badge: 'год'
    },
    {
        id: 66,
        name: 'Телеграм Premium месяц',
        category: 'other',
        image: 'images/tgprem.jpg',
        icon: 'fab fa-telegram',
        price: 299,
        oldPrice: 399,
        badge: 'месяц'
    },
];

// Данные категорий
const categories = [
    { name: 'Игры', key: 'games', icon: 'fas fa-gamepad', page: 'categories/games.html' },
    { name: 'Steam', key: 'steam', icon: 'fab fa-steam', page: 'categories/steam.html' },
    { name: 'Подписки', key: 'subscriptions', icon: 'fas fa-ticket-alt', page: 'categories/subscriptions.html' },
    { name: 'Аккаунты', key: 'accounts', icon: 'fas fa-users', page: 'categories/accounts.html' },
    { name: 'Ключи', key: 'keys', icon: 'fas fa-key', page: 'categories/keys.html' },
    { name: 'Другое', key: 'other', icon: 'fas fa-ellipsis-h', page: 'categories/other.html' }
];

// Названия категорий для отображения
const categoryNames = {
    'games': 'Игры',
    'steam': 'Steam',
    'subscriptions': 'Подписки',
    'accounts': 'Аккаунты',
    'keys': 'Ключи',
    'other': 'Другое'
};

// Вспомогательные функции для работы с данными
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

function getRecommendedProducts(count = 6) {
    return products.slice(0, count);
}

function getCategoryName(categoryKey) {
    return categoryNames[categoryKey] || 'Товары';
}

function getProductCountByCategory(categoryKey) {
    return products.filter(p => p.category === categoryKey).length;
}