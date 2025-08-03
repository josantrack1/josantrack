// script.js

// --- 1. INITIAL DATA AND LOCAL STORAGE MANAGEMENT ---

// Initial data as specified in the prompt
const initialData = {
    businesses: [
        { id: 'biz-1', name: 'Truck Transport Business', currency: 'INR' },
        { id: 'biz-2', name: 'Rock Salt Business', currency: 'INR' },
        { id: 'biz-3', name: 'Dairy Business', currency: 'INR' },
        { id: 'biz-4', name: 'Agriculture', currency: 'INR' },
    ],
    categories: [
        // Truck Transport
        { id: 'cat-1', name: 'Transport Income', type: 'income', businessId: 'biz-1', color: 'hsl(220, 80%, 50%)' },
        { id: 'cat-2', name: 'Fuel', type: 'expense', businessId: 'biz-1', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-3', name: 'Driver Salary', type: 'expense', businessId: 'biz-1', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-4', name: 'Maintenance', type: 'expense', businessId: 'biz-1', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-5', name: 'Repairing', type: 'expense', businessId: 'biz-1', color: 'hsl(160, 70%, 45%)' },
        { id: 'cat-6', name: 'Commission', type: 'expense', businessId: 'biz-1', color: 'hsl(20, 80%, 60%)' },
        // Rock Salt
        { id: 'cat-7', name: 'Amazon Sales', type: 'income', businessId: 'biz-2', color: 'hsl(220, 80%, 50%)' },
        { id: 'cat-8', name: 'Sales', type: 'income', businessId: 'biz-2', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-9', name: 'Labour Salaries', type: 'expense', businessId: 'biz-2', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-10', name: 'Raw Material', type: 'expense', businessId: 'biz-2', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-11', name: 'Transporting', type: 'expense', businessId: 'biz-2', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-12', name: 'Packing Material', type: 'expense', businessId: 'biz-2', color: 'hsl(160, 70%, 45%)' },
        { id: 'cat-13', name: 'Electricity Bill', type: 'expense', businessId: 'biz-2', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-14', name: 'Water Bill', type: 'expense', businessId: 'biz-2', color: 'hsl(280, 75%, 55%)' },
        // Dairy
        { id: 'cat-15', name: 'Cattle Sale', type: 'income', businessId: 'biz-3', color: 'hsl(220, 80%, 50%)' },
        { id: 'cat-16', name: 'Dairy Income', type: 'income', businessId: 'biz-3', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-17', name: 'Feed', type: 'expense', businessId: 'biz-3', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-18', name: 'Maintenance', type: 'expense', businessId: 'biz-3', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-19', name: 'Repairing', type: 'expense', businessId: 'biz-3', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-20', name: 'Construction', type: 'expense', businessId: 'biz-3', color: 'hsl(160, 70%, 45%)' },
        { id: 'cat-21', name: 'Cattle Purchase', type: 'expense', businessId: 'biz-3', color: 'hsl(20, 80%, 60%)' },
        // Agriculture
        { id: 'cat-22', name: 'Crop Sale', type: 'income', businessId: 'biz-4', color: 'hsl(220, 80%, 50%)' },
        { id: 'cat-23', name: 'Seeds', type: 'expense', businessId: 'biz-4', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-24', name: 'Labour', type: 'expense', businessId: 'biz-4', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-25', name: 'Fuel', type: 'expense', businessId: 'biz-4', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-26', name: 'Land Rent', type: 'expense', businessId: 'biz-4', color: 'hsl(160, 70%, 45%)' },
        { id: 'cat-27', name: 'Maintenance', type: 'expense', businessId: 'biz-4', color: 'hsl(20, 80%, 60%)' },
        { id: 'cat-28', name: 'Repairing', type: 'expense', businessId: 'biz-4', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-29', name: 'Bills', type: 'expense', businessId: 'biz-4', color: 'hsl(340, 80%, 65%)' },
        { id: 'cat-30', name: 'Fertilizers', type: 'expense', businessId: 'biz-4', color: 'hsl(160, 70%, 45%)' },
        { id: 'cat-31', name: 'New Vehicle/Tool Purchase', type: 'expense', businessId: 'biz-4', color: 'hsl(20, 80%, 60%)' },
        // Shared
        { id: 'cat-99', name: 'Misc', type: 'expense', businessId: 'all', color: 'hsl(280, 75%, 55%)' },
        { id: 'cat-100', name: 'Misc', type: 'income', businessId: 'all', color: 'hsl(160, 70%, 45%)' },
    ],
    transactions: [],
};

/**
 * Checks if local storage is empty and populates it with initial data if needed.
 */
function initializeData() {
    if (!localStorage.getItem('businesses')) {
        localStorage.setItem('businesses', JSON.stringify(initialData.businesses));
        localStorage.setItem('categories', JSON.stringify(initialData.categories));
        localStorage.setItem('transactions', JSON.stringify(initialData.transactions));
    }
}

/**
 * Retrieves data from local storage.
 * @param {string} key The key to retrieve.
 * @returns {Array} The parsed data or an empty array.
 */
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

/**
 * Saves data to local storage.
 * @param {string} key The key to save data under.
 * @param {Array} data The data to save.
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Finds an item in an array by its ID.
 * @param {Array} arr The array to search.
 * @param {string} id The ID to find.
 * @returns {object|undefined} The found item or undefined.
 */
function findById(arr, id) {
    return arr.find(item => item.id === id);
}

/**
 * Formats a number as a currency string.
 * @param {number} amount The amount to format.
 * @param {string} currency The currency code (e.g., 'INR').
 * @returns {string} The formatted currency string.
 */
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
}

// --- 2. GLOBAL STATE AND UI ELEMENTS ---

// Get all the data from localStorage
const businesses = getData('businesses');
const categories = getData('categories');
let transactions = getData('transactions');

// Get common DOM elements
const businessSelect = document.getElementById('business-select');
const modal = document.getElementById('add-entry-modal');
const modalForm = document.getElementById('add-transaction-form');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addEntryBtns = document.querySelectorAll('#add-entry-btn');

// --- 3. COMMON FUNCTIONS (Sidebar, Modal, CSV) ---

/**
 * Populates the business selection dropdown.
 */
function populateBusinessDropdown() {
    const selectedBusinessId = localStorage.getItem('selectedBusinessId') || 'all-businesses';
    
    // Clear existing options
    businessSelect.innerHTML = '<option value="all-businesses">All Businesses</option>';
    
    businesses.forEach(business => {
        const option = document.createElement('option');
        option.value = business.id;
        option.textContent = business.name;
        businessSelect.appendChild(option);
    });

    // Set the selected value to the persisted state
    businessSelect.value = selectedBusinessId;
}

/**
 * Populates the category dropdown in the Add Entry modal based on the selected business.
 * @param {string} businessId The ID of the currently selected business.
 */
function populateModalCategoryDropdown(businessId) {
    const categorySelect = document.getElementById('transaction-category');
    const businessSelect = document.getElementById('transaction-business');

    // Clear existing options
    categorySelect.innerHTML = '';
    
    // Get categories for the selected business and "all" businessId
    const relevantCategories = categories.filter(cat => cat.businessId === businessId || cat.businessId === 'all');
    
    relevantCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });

    // Also populate the business dropdown in the modal
    businessSelect.innerHTML = '';
    businesses.forEach(business => {
        const option = document.createElement('option');
        option.value = business.id;
        option.textContent = business.name;
        businessSelect.appendChild(option);
    });
    businessSelect.value = businessId; // Pre-select the current business
    
    // Add a change listener for the modal business select
    businessSelect.addEventListener('change', (e) => {
        populateModalCategoryDropdown(e.target.value);
    });
}

/**
 * Opens the add entry modal.
 */
function openModal() {
    const selectedBusinessId = localStorage.getItem('selectedBusinessId') || 'all-businesses';
    populateModalCategoryDropdown(selectedBusinessId === 'all-businesses' ? businesses[0].id : selectedBusinessId);
    
    // Reset the form
    modalForm.reset();
    
    // Set the date input to today's date by default
    const dateInput = document.getElementById('transaction-date');
    const today = new Date().toISOString().slice(0, 10);
    dateInput.value = today;

    modal.classList.remove('hidden');
}

/**
 * Closes the add entry modal.
 */
function closeModal() {
    modal.classList.add('hidden');
}

/**
 * Handles form submission for adding a new transaction.
 * @param {Event} e The form submit event.
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const newTransaction = {
        id: `trans-${Date.now()}`,
        businessId: document.getElementById('transaction-business').value,
        categoryId: document.getElementById('transaction-category').value,
        title: document.getElementById('transaction-title').value,
        amount: parseFloat(document.getElementById('transaction-amount').value),
        date: document.getElementById('transaction-date').value,
        type: document.querySelector('input[name="transaction-type"]:checked').value,
    };

    transactions.push(newTransaction);
    saveData('transactions', transactions);
    closeModal();
    
    // Re-render the correct page content after adding a new transaction
    if (document.title.includes('Dashboard')) {
        renderDashboard();
    } else if (document.title.includes('Transactions')) {
        renderTransactionsPage();
    }
}

/**
 * Converts transaction data to a CSV string and triggers a download.
 * @param {Array} data The transaction data to export.
 */
function exportCSV(data) {
    const header = ['Title', 'Business', 'Category', 'Date', 'Type', 'Amount'].join(',');
    const rows = data.map(t => {
        const business = findById(businesses, t.businessId)?.name || 'N/A';
        const category = findById(categories, t.categoryId)?.name || 'N/A';
        return [
            `"${t.title.replace(/"/g, '""')}"`, // Handle quotes in title
            `"${business.replace(/"/g, '""')}"`,
            `"${category.replace(/"/g, '""')}"`,
            t.date,
            t.type,
            t.amount,
        ].join(',');
    });

    const csvString = `${header}\n${rows.join('\n')}`;
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'fintrack_transactions.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/**
 * Toggles between light and dark themes.
 */
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// --- 4. DASHBOARD PAGE SPECIFIC LOGIC (index.html) ---

/**
 * Renders the dashboard page content based on the selected business.
 */
function renderDashboard() {
    const selectedBusinessId = localStorage.getItem('selectedBusinessId');
    let filteredTransactions = transactions;

    if (selectedBusinessId && selectedBusinessId !== 'all-businesses') {
        filteredTransactions = transactions.filter(t => t.businessId === selectedBusinessId);
    }

    // Set dashboard title
    const dashboardTitle = document.getElementById('dashboard-title');
    if (dashboardTitle) {
        const businessName = findById(businesses, selectedBusinessId)?.name || 'All Businesses';
        dashboardTitle.textContent = `${businessName} Dashboard`;
    }

    // Calculate stats
    const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;
    const currency = findById(businesses, selectedBusinessId)?.currency || 'INR';

    // Render stats
    document.getElementById('total-income').textContent = formatCurrency(totalIncome, currency);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses, currency);
    document.getElementById('net-balance').textContent = formatCurrency(netBalance, currency);
    if (netBalance < 0) {
        document.getElementById('net-balance').classList.add('text-red-500');
        document.getElementById('net-balance').classList.remove('text-green-500');
    } else {
        document.getElementById('net-balance').classList.add('text-green-500');
        document.getElementById('net-balance').classList.remove('text-red-500');
    }

    // Render charts
    renderMonthlyChart(filteredTransactions);
    renderPieChart(filteredTransactions, 'expense'); // Default to expenses
    
    // Add event listener for pie chart toggle
    const chartToggleInput = document.getElementById('chart-toggle-input');
    const chartToggleLabel = document.getElementById('chart-toggle-label');
    if (chartToggleInput) {
        chartToggleInput.checked = false; // Reset toggle state
        chartToggleLabel.textContent = 'Expenses';
        chartToggleInput.onchange = () => {
            const chartType = chartToggleInput.checked ? 'income' : 'expense';
            chartToggleLabel.textContent = chartToggleInput.checked ? 'Income' : 'Expenses';
            renderPieChart(filteredTransactions, chartType);
        };
    }

    // Render recent transactions table
    const recentTransactionsBody = document.getElementById('recent-transactions-table-body');
    if (recentTransactionsBody) {
        const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentTransactions = sortedTransactions.slice(0, 10);
        renderTableRows(recentTransactions, recentTransactionsBody);
    }
}

/**
 * Renders the monthly overview bar chart.
 * @param {Array} transactionsData The transactions to visualize.
 */
function renderMonthlyChart(transactionsData) {
    const chartContainer = document.getElementById('monthly-chart');
    if (!chartContainer) return;
    chartContainer.innerHTML = '';
    
    const monthlyData = {};
    const today = new Date();
    
    // Get last 6 months
    for (let i = 0; i < 6; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleString('default', { month: 'short' });
        monthlyData[yearMonth] = { income: 0, expense: 0, label: monthName };
    }
    
    // Aggregate data
    transactionsData.forEach(t => {
        const transactionDate = new Date(t.date);
        const yearMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
        if (monthlyData[yearMonth]) {
            monthlyData[yearMonth][t.type] += t.amount;
        }
    });

    const maxAmount = Math.max(...Object.values(monthlyData).flatMap(d => [d.income, d.expense]));

    const chartDiv = document.createElement('div');
    chartDiv.className = 'bar-chart';

    Object.values(monthlyData).reverse().forEach(month => {
        const barGroup = document.createElement('div');
        barGroup.className = 'bar-group';

        const incomeBar = document.createElement('div');
        incomeBar.className = 'bar-income';
        incomeBar.style.height = maxAmount > 0 ? `${(month.income / maxAmount) * 100}%` : '0%';
        
        const expenseBar = document.createElement('div');
        expenseBar.className = 'bar-expense';
        expenseBar.style.height = maxAmount > 0 ? `${(month.expense / maxAmount) * 100}%` : '0%';
        
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = month.label;

        barGroup.appendChild(incomeBar);
        barGroup.appendChild(expenseBar);

        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar';
        barWrapper.appendChild(barGroup);
        barWrapper.appendChild(label);

        chartDiv.appendChild(barWrapper);
    });

    chartContainer.appendChild(chartDiv);
}

/**
 * Renders the category pie chart.
 * @param {Array} transactionsData The transactions to visualize.
 * @param {string} type The transaction type ('income' or 'expense').
 */
function renderPieChart(transactionsData, type) {
    const pieChart = document.getElementById('pie-chart');
    const legend = document.getElementById('pie-chart-legend');
    if (!pieChart || !legend) return;

    pieChart.style.background = '';
    legend.innerHTML = '';
    
    const categoryData = transactionsData
        .filter(t => t.type === type)
        .reduce((acc, t) => {
            acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
            return acc;
        }, {});

    const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        pieChart.style.background = 'conic-gradient(var(--muted) 0deg, var(--muted) 360deg)';
        pieChart.style.borderColor = 'transparent';
        return;
    }

    let gradientString = 'conic-gradient(';
    let startAngle = 0;
    
    // Sort categories by amount descending
    const sortedCategories = Object.entries(categoryData).sort(([, a], [, b]) => b - a);

    sortedCategories.forEach(([categoryId, amount]) => {
        const category = findById(categories, categoryId);
        if (!category) return;
        const percentage = (amount / total) * 360;
        const color = category.color;

        gradientString += `${color} ${startAngle}deg ${startAngle + percentage}deg, `;
        startAngle += percentage;

        // Add to legend
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background-color: ${color};"></span>
            <span>${category.name} (${((amount / total) * 100).toFixed(1)}%)</span>
        `;
        legend.appendChild(legendItem);
    });

    gradientString = gradientString.slice(0, -2) + ')'; // Remove trailing comma and space
    pieChart.style.background = gradientString;
}

// --- 5. TRANSACTIONS PAGE SPECIFIC LOGIC (transactions.html) ---

/**
 * Renders the transactions page content.
 */
function renderTransactionsPage() {
    const selectedBusinessId = localStorage.getItem('selectedBusinessId') || 'all-businesses';
    
    // Get filter elements
    const searchInput = document.getElementById('search-input');
    const categoryFilterSelect = document.getElementById('category-filter-select');
    const typeFilterSelect = document.getElementById('type-filter-select');

    // Populate category filter dropdown
    populateTransactionFilters(selectedBusinessId);

    // Initial render of the table
    filterAndRenderTransactions();

    // Add event listeners for filters
    searchInput?.addEventListener('input', filterAndRenderTransactions);
    categoryFilterSelect?.addEventListener('change', filterAndRenderTransactions);
    typeFilterSelect?.addEventListener('change', filterAndRenderTransactions);
    
    // Re-render when selected business changes from sidebar
    businessSelect?.addEventListener('change', () => {
        populateTransactionFilters(businessSelect.value);
        filterAndRenderTransactions();
    });
}

/**
 * Populates the category filter dropdown for the transactions page.
 * @param {string} businessId The currently selected business ID.
 */
function populateTransactionFilters(businessId) {
    const categoryFilterSelect = document.getElementById('category-filter-select');
    if (!categoryFilterSelect) return;
    
    categoryFilterSelect.innerHTML = '<option value="all">All Categories</option>';
    
    let relevantCategories;
    if (businessId === 'all-businesses') {
        // Show all categories for all businesses
        relevantCategories = categories.filter(c => c.businessId !== 'all');
        const miscCategories = categories.filter(c => c.businessId === 'all');
        relevantCategories = [...relevantCategories, ...miscCategories];
    } else {
        // Show categories for the specific business and shared categories
        relevantCategories = categories.filter(c => c.businessId === businessId || c.businessId === 'all');
    }

    relevantCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.name} (${category.type})`;
        categoryFilterSelect.appendChild(option);
    });
}

/**
 * Filters and renders the full transaction table.
 */
function filterAndRenderTransactions() {
    const selectedBusinessId = localStorage.getItem('selectedBusinessId') || 'all-businesses';
    const searchInput = document.getElementById('search-input');
    const categoryFilterSelect = document.getElementById('category-filter-select');
    const typeFilterSelect = document.getElementById('type-filter-select');
    
    let filteredTransactions = [...transactions];

    // Filter by business from the sidebar
    if (selectedBusinessId !== 'all-businesses') {
        filteredTransactions = filteredTransactions.filter(t => t.businessId === selectedBusinessId);
    }
    
    // Apply search filter
    if (searchInput?.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filteredTransactions = filteredTransactions.filter(t => t.title.toLowerCase().includes(searchTerm));
    }
    
    // Apply category filter
    if (categoryFilterSelect?.value !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.categoryId === categoryFilterSelect.value);
    }
    
    // Apply type filter
    if (typeFilterSelect?.value !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.type === typeFilterSelect.value);
    }

    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const fullTransactionsBody = document.getElementById('full-transactions-table-body');
    if (fullTransactionsBody) {
        renderTableRows(filteredTransactions, fullTransactionsBody);
    }
}

/**
 * Renders transaction rows into a table body element.
 * @param {Array} transactionsToRender The transactions to display.
 * @param {HTMLElement} tableBody The tbody element to populate.
 */
function renderTableRows(transactionsToRender, tableBody) {
    tableBody.innerHTML = '';
    if (transactionsToRender.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="5" class="text-center">No transactions found.</td>`;
        tableBody.appendChild(noDataRow);
        return;
    }

    transactionsToRender.forEach(t => {
        const business = findById(businesses, t.businessId);
        const category = findById(categories, t.categoryId);
        const row = document.createElement('tr');
        row.className = t.type === 'income' ? 'income-row' : 'expense-row';
        
        const arrowSvg = t.type === 'income' ? `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-circle">
                <circle cx="12" cy="12" r="10"/>
                <path d="m16 12-4-4-4 4"/>
                <path d="M12 16V8"/>
            </svg>` : `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-circle">
                <circle cx="12" cy="12" r="10"/>
                <path d="m8 12 4 4 4-4"/>
                <path d="M12 8v8"/>
            </svg>`;

        row.innerHTML = `
            <td>${t.title}</td>
            <td>${business?.name || 'N/A'}</td>
            <td>${category?.name || 'N/A'}</td>
            <td>${t.date}</td>
            <td class="text-right">
                <div class="amount-cell">
                    ${arrowSvg}
                    <span>${formatCurrency(t.amount, business?.currency || 'INR')}</span>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// --- 6. EVENT LISTENERS AND INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    populateBusinessDropdown();

    // Check for persisted theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    // Sidebar business select change listener
    businessSelect?.addEventListener('change', (e) => {
        localStorage.setItem('selectedBusinessId', e.target.value);
        // Re-render the correct page content after business selection changes
        if (document.title.includes('Dashboard')) {
            renderDashboard();
        } else if (document.title.includes('Transactions')) {
            renderTransactionsPage();
        }
    });

    // Add Entry buttons to open modal
    addEntryBtns.forEach(btn => btn.addEventListener('click', openModal));
    
    // Modal buttons
    closeModalBtn?.addEventListener('click', closeModal);
    cancelModalBtn?.addEventListener('click', closeModal);
    modalForm?.addEventListener('submit', handleFormSubmit);

    // CSV export button (only on dashboard page)
    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            const selectedBusinessId = localStorage.getItem('selectedBusinessId');
            const transactionsToExport = selectedBusinessId && selectedBusinessId !== 'all-businesses'
                ? transactions.filter(t => t.businessId === selectedBusinessId)
                : transactions;
            exportCSV(transactionsToExport);
        });
    }
    
    // Theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    themeToggleBtn?.addEventListener('click', toggleTheme);

    // Call the appropriate render function based on the current page
    if (document.title.includes('Dashboard')) {
        renderDashboard();
    } else if (document.title.includes('Transactions')) {
        renderTransactionsPage();
    }
});