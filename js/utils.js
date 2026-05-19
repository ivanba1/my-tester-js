// Вспомогательные функции

function getUsers() {
    const users = localStorage.getItem('js_master_users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('js_master_users', JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem('js_master_current_user');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('js_master_current_user', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('js_master_current_user');
}

function getResults() {
    const results = localStorage.getItem('js_master_results');
    return results ? JSON.parse(results) : [];
}

function saveResults(results) {
    localStorage.setItem('js_master_results', JSON.stringify(results));
}

function addResult(result) {
    const results = getResults();
    results.push(result);
    saveResults(results);
}

function getResultsByCategory(category, userId) {
    const results = getResults();
    let filtered = results.filter(r => r.userId === userId);
    
    if (category === 'by_percent') {
        filtered.sort((a, b) => b.percent - a.percent);
    } else if (category === 'by_speed') {
        filtered.sort((a, b) => a.timeSpent - b.timeSpent);
    } else if (category === 'by_date') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return filtered.slice(0, 20);
}

function getGlobalRating(category) {
    const results = getResults();
    
    if (category === 'by_percent') {
        results.sort((a, b) => b.percent - a.percent);
    } else if (category === 'by_speed') {
        results.sort((a, b) => a.timeSpent - b.timeSpent);
    } else if (category === 'by_date') {
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return results.slice(0, 20);
}