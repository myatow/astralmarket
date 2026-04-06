// js/main.js
// Скрипты для главной страницы

// Функция создания карточки товара
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <span class="product-badge">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image" 
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

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

    // Обновляем ПК версию
    if (cartContent) {
        if (cartItems.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Корзина пуста</p>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = '0 ₽';
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

    // Обновляем мобильную версию
    if (mobileCartContent) {
        if (cartItems.length === 0) {
            mobileCartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Корзина пуста</p>
                </div>
            `;
            if (mobileCartTotal) mobileCartTotal.textContent = '0 ₽';
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
    // ===== РЕКОМЕНДУЕМЫЕ ТОВАРЫ =====
    const recommendedGrid = document.getElementById('recommended-grid');
    if (recommendedGrid) {
        const recommendedProducts = getRecommendedProducts(6);
        recommendedGrid.innerHTML = recommendedProducts.map(createProductCard).join('');
    }

    // ===== ХИТЫ ПРОДАЖ =====
    const hitsGrid = document.getElementById('hits-grid');
    if (hitsGrid) {
        const shuffledProducts = shuffleArray([...products]);
        const hitsProducts = shuffledProducts.slice(0, 12);
        hitsGrid.innerHTML = hitsProducts.map(createProductCard).join('');
    }

    // ===== БЛОК КАТЕГОРИЙ =====
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(cat => `
            <div class="category-button" data-category="${cat.key}" data-page="${cat.page}">
                <i class="${cat.icon}"></i>
                <span>${cat.name}</span>
            </div>
        `).join('');

        categoriesGrid.querySelectorAll('.category-button').forEach(button => {
            button.addEventListener('click', function () {
                const category = this.dataset.category;
                const page = this.dataset.page;
                localStorage.setItem('selectedCategory', category);
                window.location.href = page;
            });
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО КАТЕГОРИЙ =====
    const menuBtn = document.getElementById('menuBtn');
    const modal = document.getElementById('categoriesModal');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalContent = document.getElementById('categoriesModalContent');

    if (menuBtn && modal && overlay && closeBtn && modalContent) {
        modalContent.innerHTML = `
            <div class="modal-categories">
                ${categories.map(cat => `
                    <div class="modal-category-item" data-category="${cat.key}" data-page="${cat.page}">
                        <i class="${cat.icon}"></i>
                        <span>${cat.name}</span>
                        <small>${getProductCountByCategory(cat.key)} товаров</small>
                    </div>
                `).join('')}
            </div>
        `;

        menuBtn.addEventListener('click', function () {
            modal.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }

        modalContent.querySelectorAll('.modal-category-item').forEach(item => {
            item.addEventListener('click', function () {
                const category = this.dataset.category;
                const page = this.dataset.page;
                localStorage.setItem('selectedCategory', category);
                window.location.href = page;
            });
        });
    }

    // ===== МОДАЛЬНОЕ ОКНО ДЛЯ ПРОМОКОДА =====
    const promoLink = document.getElementById('promoLink');
    const promoModal = document.getElementById('promoModal');
    const promoOverlay = document.getElementById('promoOverlay');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const activatePromoBtn = document.getElementById('activatePromoBtn');

    if (promoLink && promoModal && promoOverlay && closePromoBtn) {
        promoLink.addEventListener('click', function () {
            promoModal.classList.add('show');
            promoOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        closePromoBtn.addEventListener('click', closePromo);
        promoOverlay.addEventListener('click', closePromo);

        if (activatePromoBtn) {
            activatePromoBtn.addEventListener('click', function () {
                const promoCode = document.getElementById('promoCode')?.value;
                if (promoCode) {
                    showNotification(`Промокод "${promoCode}" активирован!`, 'success');
                    closePromo();
                } else {
                    showNotification('Введите промокод', 'error');
                }
            });
        }

        function closePromo() {
            promoModal.classList.remove('show');
            promoOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // ===== ТУЛТИП ДЛЯ ЛОГИНА =====
    const infoIconContainer = document.getElementById('infoIconContainer');
    const infoTooltip = document.getElementById('infoTooltip');
    const tooltipLink = document.getElementById('tooltipLink');

    if (infoIconContainer && infoTooltip) {
        infoIconContainer.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            infoTooltip.classList.toggle('active');
        });

        infoTooltip.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function (e) {
            if (!infoIconContainer.contains(e.target) && !infoTooltip.contains(e.target)) {
                if (infoTooltip.classList.contains('active')) {
                    infoTooltip.classList.remove('active');
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && infoTooltip.classList.contains('active')) {
                infoTooltip.classList.remove('active');
            }
        });
    }

    // ===== STEAM ПОПОЛНЕНИЕ =====
    const payBtn = document.getElementById('payBtn');
    if (payBtn) {
        payBtn.addEventListener('click', function () {
            const login = document.getElementById('steamLogin').value.trim();
            const amount = document.getElementById('steamAmount').value.trim();

            if (!login || !amount) {
                showNotification('❌ Пожалуйста, введите логин и сумму пополнения.', 'error');
            } else if (isNaN(amount) || Number(amount) <= 0) {
                showNotification('⚠️ Сумма должна быть положительным числом.', 'error');
            } else {
                showNotification(`✅ Заявка на пополнение Steam для ${login} на сумму ${amount}₽ отправлена!`, 'success');
                document.getElementById('steamLogin').value = '';
                document.getElementById('steamAmount').value = '';
            }
        });
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

    // ===== ИКОНКИ =====
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

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

    // ===== КОРЗИНА =====
    loadCartFromStorage();

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
                const product = {
                    id: parseInt(card.dataset.id),
                    name: card.querySelector('h3')?.innerText || 'товар',
                    price: parseInt(card.querySelector('.current-price')?.innerText.replace('₽', '').trim() || '0'),
                    oldPrice: parseInt(card.querySelector('.old-price')?.innerText.replace('₽', '').trim() || '0'),
                    image: card.querySelector('.product-image')?.src || '',
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