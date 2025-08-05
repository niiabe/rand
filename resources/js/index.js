// Aside navigation functionality
const burgerMenu = document.getElementById('burgerMenu');
const asideNav = document.getElementById('asideNav');
const closeNav = document.getElementById('closeNav');
const overlay = document.getElementById('overlay');

function closeAsideNav() {
    asideNav.classList.remove('translate-x-0');
    asideNav.classList.add('-translate-x-full');
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0', 'pointer-events-none');
}

if (burgerMenu && asideNav && closeNav && overlay) {
    // Open aside navigation
    burgerMenu.addEventListener('click', function() {
        asideNav.classList.remove('-translate-x-full');
        asideNav.classList.add('translate-x-0');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100');
    });

    // Close aside navigation
    closeNav.addEventListener('click', closeAsideNav);
    overlay.addEventListener('click', closeAsideNav);
}

// Add to cart functionality
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() === 'Add to Cart') {
        button.addEventListener('click', function() {
            const productName = this.closest('.product-card').querySelector('h3').textContent.trim();
            alert(`${productName} added to cart!`);
        });
    }
});

// Winnings Calculator functionality
const winningsCalculator = document.getElementById('winningsCalculator');
const toggleCalculator = document.getElementById('toggleCalculator');
const closeCalculator = document.getElementById('closeCalculator');
const navCalculator = document.getElementById('navCalculator');
const calcGameSelect = document.getElementById('calcGameSelect');
const calcBetSelect = document.getElementById('calcBetSelect');
const calcStakeInput = document.getElementById('calcStakeInput');
const calcPotentialWin = document.getElementById('calcPotentialWin');
const calcMultiplier = document.getElementById('calcMultiplier');
const calculateWinningsBtn = document.getElementById('calculateWinnings');

// Betting odds and multipliers
const bettingOdds = {
    'direct1': { multiplier: 40, name: 'Direct 1' },
    'direct2': { multiplier: 240, name: 'Direct 2' },
    'direct3': { multiplier: 2100, name: 'Direct 3' },
    'direct4': { multiplier: 6000, name: 'Direct 4' },
    'perm2': { multiplier: 240, name: 'Perm 2' },
    'perm3': { multiplier: 2100, name: 'Perm 3' },
    'banker': { multiplier: 960, name: 'Banker' }
};

// Game prize pools
const gamePrizes = {
    'monday': { name: 'Monday Fire Draw', baseMultiplier: 1.0 },
    'tuesday': { name: 'Tuesday Power Play', baseMultiplier: 1.2 },
    'wednesday': { name: 'Wednesday Diamond Draw', baseMultiplier: 1.5 },
    'thursday': { name: 'Thursday Star Luck', baseMultiplier: 1.3 },
    'friday': { name: 'Friday Bullseye', baseMultiplier: 1.8 },
    'saturday': { name: 'Saturday Mega Win', baseMultiplier: 2.5 },
    'sunday': { name: 'Sunday Lucky Seven', baseMultiplier: 2.0 }
};

// Toggle calculator visibility
function openCalculator() {
    winningsCalculator.classList.remove('hidden', 'translate-x-full');
    winningsCalculator.classList.add('translate-x-0');
}

if (winningsCalculator && toggleCalculator && closeCalculator && navCalculator) {
    toggleCalculator.addEventListener('click', openCalculator);
    navCalculator.addEventListener('click', openCalculator);

    closeCalculator.addEventListener('click', function() {
        winningsCalculator.classList.remove('translate-x-0');
        winningsCalculator.classList.add('translate-x-full');
        setTimeout(() => {
            winningsCalculator.classList.add('hidden');
        }, 300);
    });
}

// Update calculator display
function updateCalculatorDisplay() {
    const selectedGame = calcGameSelect.value;
    const selectedBetType = calcBetSelect.value;
    const stakeAmount = parseFloat(calcStakeInput.value) || 0;

    if (selectedGame && selectedBetType && stakeAmount > 0) {
        const baseMultiplier = bettingOdds[selectedBetType]?.multiplier || 0;
        const gameMultiplier = gamePrizes[selectedGame]?.baseMultiplier || 1;
        const totalMultiplier = baseMultiplier * gameMultiplier;
        const potentialWin = stakeAmount * totalMultiplier;

        calcPotentialWin.textContent = `₵${potentialWin.toLocaleString()}`;
        calcMultiplier.textContent = `Multiplier: ${totalMultiplier.toFixed(2)}x`;
    } else {
        calcPotentialWin.textContent = '₵0';
        calcMultiplier.textContent = 'Multiplier: 0x';
    }
}

if (calcGameSelect && calcBetSelect && calcStakeInput) {
    calcGameSelect.addEventListener('change', updateCalculatorDisplay);
    calcBetSelect.addEventListener('change', updateCalculatorDisplay);
    calcStakeInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        this.value = Math.max(1, Math.min(value || 0, 200));
        updateCalculatorDisplay();
    });
}

if (calculateWinningsBtn) {
    calculateWinningsBtn.addEventListener('click', function() {
        if (!calcGameSelect.value || !calcBetSelect.value || !calcStakeInput.value || calcStakeInput.value < 1) {
            alert('Please fill out all calculator fields to get your potential winnings!');
            return;
        }

        updateCalculatorDisplay();

        const gameName = gamePrizes[calcGameSelect.value].name;
        const betName = bettingOdds[calcBetSelect.value].name;
        const stake = calcStakeInput.value;
        const potentialWin = calcPotentialWin.textContent;

        alert(`💰 Calculation Complete!\n\nGame: ${gameName}\nBet Type: ${betName}\nYour Stake: ₵${stake}\nPotential Win: ${potentialWin}\n\nGood luck! 🍀`);
    });
}

// Game and Bet type button functionality
function setupSelectionButtons(selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll(selector).forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}

setupSelectionButtons('.game-btn');
setupSelectionButtons('.bet-type-btn');

// Take amount input validation
const takeAmountInput = document.getElementById('takeAmount');
if (takeAmountInput) {
    takeAmountInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        this.value = Math.max(1, Math.min(value || 0, 200));
    });
}

// Quick amount buttons
document.querySelectorAll('.quick-amount').forEach(button => {
    button.addEventListener('click', function() {
        const amount = this.dataset.amount;
        if (takeAmountInput) {
            takeAmountInput.value = amount;
        }
    });
});

// Mobile Money Network Selection functionality
document.querySelectorAll('.network-option').forEach(label => {
    label.addEventListener('click', function() {
        document.querySelectorAll('.network-option').forEach(option => {
            option.classList.remove('border-green-500', 'bg-green-50');
            option.classList.add('border-transparent');
        });
        this.classList.remove('border-transparent');
        this.classList.add('border-green-500', 'bg-green-50');
        this.querySelector('input[type="radio"]').checked = true;
    });
});

// Newsletter subscription
const subscribeButton = document.querySelector('button.subscribe-btn');
if (subscribeButton) {
    subscribeButton.addEventListener('click', function() {
        const emailInput = this.previousElementSibling;
        const email = emailInput.value.trim();
        if (email) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            alert('Please enter your email address');
        }
    });
}

// Lotto Number Selector functionality
let selectedLottoNumbers = [];
const numberGrid = document.getElementById('numberGrid');
const selectedNumbersDiv = document.getElementById('selectedNumbers');
const clearNumbersBtn = document.getElementById('clearNumbers');

function generateNumberGrid() {
    if (!numberGrid) return;
    numberGrid.innerHTML = '';
    for (let i = 1; i <= 90; i++) {
        const numberButton = document.createElement('button');
        numberButton.textContent = i;
        numberButton.className = 'w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:scale-110 shadow-md text-sm sm:text-base';
        numberButton.dataset.number = i;
        numberButton.addEventListener('click', () => toggleNumber(i, numberButton));
        numberGrid.appendChild(numberButton);
    }
}

function toggleNumber(number, buttonElement) {
    const index = selectedLottoNumbers.indexOf(number);
    if (index > -1) {
        selectedLottoNumbers.splice(index, 1);
        buttonElement.classList.remove('bg-gradient-to-br', 'from-green-400', 'to-green-600', 'shadow-lg', 'scale-110', 'border-2', 'border-white');
        buttonElement.classList.add('from-blue-400', 'to-blue-600', 'hover:from-blue-500', 'hover:to-blue-700');
    } else {
        selectedLottoNumbers.push(number);
        buttonElement.classList.remove('from-blue-400', 'to-blue-600', 'hover:from-blue-500', 'hover:to-blue-700');
        buttonElement.classList.add('bg-gradient-to-br', 'from-green-400', 'to-green-600', 'shadow-lg', 'scale-110', 'border-2', 'border-white');
    }
    updateSelectedNumbersDisplay();
}

function updateSelectedNumbersDisplay() {
    if (!selectedNumbersDiv) return;
    if (selectedLottoNumbers.length === 0) {
        selectedNumbersDiv.innerHTML = '<span class="text-white text-opacity-70 italic">Click numbers below to select</span>';
    } else {
        selectedNumbersDiv.innerHTML = selectedLottoNumbers
            .sort((a, b) => a - b)
            .map(number => `<span class="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full font-semibold">${number}</span>`)
            .join('');
    }
}

if (clearNumbersBtn) {
    clearNumbersBtn.addEventListener('click', function() {
        selectedLottoNumbers = [];
        updateSelectedNumbersDisplay();
        document.querySelectorAll('#numberGrid button').forEach(button => {
            button.className = 'w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:scale-110 shadow-md text-sm sm:text-base';
        });
    });
}

// Form submission handling
const lottoGameForm = document.getElementById('lottoGameForm');
if (lottoGameForm) {
    lottoGameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedGame = document.querySelector('.game-btn.selected');
        const selectedBetType = document.querySelector('.bet-type-btn.selected');
        const takeAmount = document.getElementById('takeAmount').value;
        const selectedNetwork = document.querySelector('input[name="network"]:checked');
        const momoNumber = document.getElementById('momoNumber').value;
        
        if (!selectedGame || !selectedBetType || !takeAmount || takeAmount < 1 || takeAmount > 200 || !selectedNetwork || !momoNumber) {
            alert('Please fill out all fields (Game, Bet Type, Take Amount, Network, and Mobile Number) to place your bet!');
            return;
        }

        const gameName = selectedGame.querySelector('p').textContent;
        const gameDay = selectedGame.querySelector('h3').textContent;
        const betType = selectedBetType.querySelector('h3').textContent;
        const networkName = selectedNetwork.value.toUpperCase();

        alert(`🎉 Game Started Successfully!\n\nGame: ${gameName} (${gameDay})\nBet Type: ${betType}\nNumbers: ${selectedLottoNumbers.sort((a, b) => a - b).join(', ')}\nTake Amount: ₵${takeAmount}\nPayment: ${networkName} - ${momoNumber}\n\nGood luck! 🍀`);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    generateNumberGrid();
});


// footer year
document.addEventListener('DOMContentLoaded', function() {
 var currentYear = new Date().getFullYear();
 document.getElementById('currentYear').textContent = currentYear;
});