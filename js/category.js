// js/category.js
// Скрипты для страниц категорий

// Функция создания карточки товара для страниц категорий
function createProductCard(product) {
    const imagePath = '../' + product.image;

    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <span class="product-badge">${product.badge}</span>
            <img src="${imagePath}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/200x160?text=No+Image'">
            <h3>${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${product.price}₽</span>
                <span class="old-price">${product.oldPrice}₽</span>
            </div>
            <button class="btn-add add-to-cart">
                <i class="fas fa-cart-plus"></i> В корзину
            </button>
        </div>
    `;
}

// ===== УПРАВЛЕНИЕ КОРЗИНОЙ =====
let cartItems = [];

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('astralmarket_cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

function saveCartToStorage() {
    localStorage.setItem('astralmarket_cart', JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounts = document.querySelectorAll('#cartCount');
    cartCounts.forEach(el => {
        if (el) el.textContent = totalItems;
    });

    const mobileCartIcon = document.getElementById('mobileCartIcon');
    if (mobileCartIcon) {
        if (totalItems > 0) {
            mobileCartIcon.setAttribute('data-count', totalItems);
        } else {
            mobileCartIcon.removeAttribute('data-count');
        }
    }
}

function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            quantity: 1,
            badge: product.badge
        });
    }

    saveCartToStorage();
    updateCartDisplay();
    updateCartCount();

    if (window.innerWidth <= 768) {
        showMobileNotification(`✅ ${product.name} добавлен в корзину`, 'success');
    } else {
        showNotification(`✅ ${product.name} добавлен в корзину`, 'success');
    }
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
    updateCartCount();
}

function updateQuantity(productId, change) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartDisplay();
            updateCartCount();
        }
    }
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const mobileCartContent = document.getElementById('mobileCartContent');
    const cartTotal = document.getElementById('cartTotalPrice');
    const mobileCartTotal = document.getElementById('mobileCartTotalPrice');

    if (cartContent) {
        if (cartItems.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Корзина пуста</p>
                </div>
            `;
        } else {
            let html = '';
            let total = 0;

            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                html += `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/70x70?text=No+Image'">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">
                                ${item.price * item.quantity} ₽
                                ${item.oldPrice ? `<span class="cart-item-old-price">${item.oldPrice * item.quantity} ₽</span>` : ''}
                            </div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus-btn" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn plus-btn" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
                    </div>
                `;
            });

            cartContent.innerHTML = html;
            if (cartTotal) cartTotal.textContent = `${total} ₽`;
        }
    }

    if (mobileCartContent) {
        if (cartItems.length === 0) {
            mobileCartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Корзина пуста</p>
                </div>
            `;
        } else {
            let html = '';
            let total = 0;

            cartItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                html += `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/70x70?text=No+Image'">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">
                                ${item.price * item.quantity} ₽
                                ${item.oldPrice ? `<span class="cart-item-old-price">${item.oldPrice * item.quantity} ₽</span>` : ''}
                            </div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus-btn" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn plus-btn" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
                    </div>
                `;
            });

            mobileCartContent.innerHTML = html;
            if (mobileCartTotal) mobileCartTotal.textContent = `${total} ₽`;
        }
    }

    attachCartEventListeners();
}

function attachCartEventListeners() {
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, 1);
        });
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, -1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const mobileCart = document.getElementById('mobileCartFullscreen');

    if (window.innerWidth <= 768 && mobileCart) {
        mobileCart.classList.add('show');
        document.body.style.overflow = 'hidden';
    } else if (cartModal && cartOverlay) {
        cartModal.classList.add('show');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const mobileCart = document.getElementById('mobileCartFullscreen');

    if (mobileCart) {
        mobileCart.classList.remove('show');
    }
    if (cartModal) {
        cartModal.classList.remove('show');
    }
    if (cartOverlay) {
        cartOverlay.classList.remove('show');
    }
    document.body.style.overflow = '';
}

// ===== ЗАГРУЗКА СТРАНИЦЫ =====
document.addEventListener('DOMContentLoaded', function () {
    const categoryTitle = document.getElementById('categoryTitle');
    const productsGrid = document.getElementById('categoryProductsGrid');

    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    let selectedCategory = 'games';

    if (fileName.includes('steam')) selectedCategory = 'steam';
    else if (fileName.includes('subscriptions')) selectedCategory = 'subscriptions';
    else if (fileName.includes('accounts')) selectedCategory = 'accounts';
    else if (fileName.includes('keys')) selectedCategory = 'keys';
    else if (fileName.includes('other')) selectedCategory = 'other';
    else selectedCategory = 'games';

    localStorage.setItem('selectedCategory', selectedCategory);

    if (categoryTitle) {
        categoryTitle.textContent = `${getCategoryName(selectedCategory)}`;
    }

    if (productsGrid) {
        const filteredProducts = getProductsByCategory(selectedCategory);

        if (filteredProducts.length > 0) {
            productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
        } else {
            productsGrid.innerHTML = `
                <div class="empty-cart" style="grid-column: 1/-1;">
                    <i class="fas fa-box-open"></i>
                    <p>Товары временно отсутствуют</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">Но мы уже работаем над пополнением!</p>
                </div>
            `;
        }
    }

    // ===== ПОИСК =====
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`🔍 Поиск: "${query}"`, 'info');
        } else {
            showNotification('Введите текст для поиска', 'info');
        }
    }

    // ===== КОРЗИНА =====
    loadCartFromStorage();

    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    // ===== УВЕДОМЛЕНИЯ =====
    const bellIcon = document.querySelector('.fa-bell');
    if (bellIcon) {
        bellIcon.addEventListener('click', function () {
            showNotification('🔔 У вас нет новых уведомлений', 'info');
        });
    }

    // ===== КНОПКА ПОДДЕРЖКИ =====
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
        supportBtn.addEventListener('click', function () {
            showNotification('🛠️ Служба поддержки свяжется с вами в ближайшее время', 'info');
        });
    }

    // ===== МОБИЛЬНЫЙ НИЖНИЙ ЦЕНТР УПРАВЛЕНИЯ =====
    const mobileBellIcon = document.getElementById('mobileBellIcon');
    const mobileCartIcon = document.getElementById('mobileCartIcon');
    const mobileNotification = document.getElementById('mobileNotification');
    const mobileNotificationIcon = document.getElementById('mobileNotificationIcon');
    const mobileNotificationMessage = document.getElementById('mobileNotificationMessage');
    const closeMobileNotification = document.getElementById('closeMobileNotification');

    window.showMobileNotification = function (message, type = 'info') {
        if (!mobileNotification || !mobileNotificationIcon || !mobileNotificationMessage) return;

        mobileNotification.classList.remove('success', 'error', 'info', 'show');
        mobileNotification.classList.add(type);

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        mobileNotificationIcon.className = `fas ${icon}`;

        mobileNotificationMessage.textContent = message;
        mobileNotification.classList.add('show');

        setTimeout(() => {
            mobileNotification.classList.remove('show');
        }, 3000);
    };

    if (mobileBellIcon) {
        mobileBellIcon.addEventListener('click', function (e) {
            e.preventDefault();
            window.showMobileNotification('🔔 У вас нет новых уведомлений', 'info');
        });
    }

    if (mobileCartIcon) {
        mobileCartIcon.addEventListener('click', function (e) {
            e.preventDefault();
            openCart();
        });
    }

    if (closeMobileNotification) {
        closeMobileNotification.addEventListener('click', function () {
            mobileNotification.classList.remove('show');
        });
    }

    document.addEventListener('click', function (e) {
        if (mobileNotification && mobileNotification.classList.contains('show')) {
            if (!mobileNotification.contains(e.target) &&
                !mobileBellIcon?.contains(e.target) &&
                !mobileCartIcon?.contains(e.target)) {
                mobileNotification.classList.remove('show');
            }
        }
    });

    // ===== КОРЗИНА (ПРОДОЛЖЕНИЕ) =====
    const closeBtns = document.querySelectorAll('#closeCartBtn, #closeMobileCartBtn');
    closeBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', closeCart);
        }
    });

    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
        }
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            e.preventDefault();
            const card = e.target.closest('.product-card');
            if (card) {
                const imageSrc = card.querySelector('.product-image')?.src || '';
                const product = {
                    id: parseInt(card.dataset.id),
                    name: card.querySelector('h3')?.innerText || 'товар',
                    price: parseInt(card.querySelector('.current-price')?.innerText.replace('₽', '').trim() || '0'),
                    oldPrice: parseInt(card.querySelector('.old-price')?.innerText.replace('₽', '').trim() || '0'),
                    image: imageSrc.replace('../', 'images/'),
                    badge: card.querySelector('.product-badge')?.innerText || ''
                };
                addToCart(product);
            }
        }
    });

    const checkoutBtns = document.querySelectorAll('#checkoutBtn, #mobileCheckoutBtn');
    checkoutBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                if (cartItems.length === 0) {
                    if (window.innerWidth <= 768) {
                        window.showMobileNotification('Корзина пуста', 'error');
                    } else {
                        showNotification('Корзина пуста', 'error');
                    }
                } else {
                    alert('✅ Заказ оформлен! Спасибо за покупку!');
                    cartItems = [];
                    saveCartToStorage();
                    updateCartDisplay();
                    updateCartCount();
                    closeCart();
                }
            });
        }
    });

    // ===== УВЕДОМЛЕНИЯ =====
    window.showNotification = function (message, type = 'info') {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }

        const notification = document.createElement('div');

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            background-color: ${type === 'success' ? '#4CAF50' :
                type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            cursor: pointer;
            min-width: 250px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.3);
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300);
        }, 3000);

        notification.addEventListener('click', function () {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    };
});