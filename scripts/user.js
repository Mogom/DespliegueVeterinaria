document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navBtns = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Calendar functionality
    const calendarDays = document.getElementById('calendar-days');
    const currentMonthEl = document.querySelector('.current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        // Set month and year in header
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthEl.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Clear previous days
        calendarDays.innerHTML = '';
        
        // Get first day of month and total days in month
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Get day of week for first day (0-6 where 0 is Sunday)
        let startingDay = firstDay.getDay();
        // Adjust to make Monday the first day (0)
        startingDay = startingDay === 0 ? 6 : startingDay - 1;
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        // Add cells for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = i;
            dayCell.appendChild(dayNumber);
            
            // Add sample events (in a real app, these would come from a database)
            if (i === 15) {
                const event = document.createElement('div');
                event.className = 'calendar-event';
                event.textContent = 'Vacunación - Max';
                dayCell.appendChild(event);
            }
            
            if (i === 22) {
                const event = document.createElement('div');
                event.className = 'calendar-event';
                event.textContent = 'Control - Luna';
                dayCell.appendChild(event);
            }
            
            calendarDays.appendChild(dayCell);
        }
    }
    
    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
    
    // Load pets data
    const petsGrid = document.getElementById('pets-grid');
    const url_cats = "https://api.thecatapi.com/v1/images/search?limit=4";
    const url_dogs = "https://api.thedogapi.com/v1/images/search?limit=4";
    
    // Function to create pet card
    function createPetCard(pet) {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        
        petCard.innerHTML = `
            <img src="${pet.url}" alt="${pet.breed?.name || 'Mascota'}" class="pet-image">
            <div class="pet-info">
                <h3 class="pet-name">${pet.breed?.name || 'Nombre no disponible'}</h3>
                <p class="pet-detail">
                    <i class="fas fa-paw"></i>
                    <span>${pet.breed?.temperament || 'Temperamento no disponible'}</span>
                </p>
                <p class="pet-detail">
                    <i class="fas fa-globe"></i>
                    <span>${pet.breed?.origin || 'Origen no disponible'}</span>
                </p>
                <div class="pet-actions">
                    <button class="pet-btn edit-btn">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="pet-btn delete-btn">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
        
        return petCard;
    }
    
    // Fetch pets data
    async function fetchPets() {
        try {
            // Clear previous pets
            petsGrid.innerHTML = '<div class="loading">Cargando mascotas...</div>';
            
            // Fetch cat data
            const catResponse = await fetch(url_cats);
            const catData = await catResponse.json();
            
            // Fetch additional cat details
            const catsWithDetails = await Promise.all(catData.map(async cat => {
                if (cat.breeds && cat.breeds.length > 0) return cat;
                
                try {
                    const detailResponse = await fetch(`https://api.thecatapi.com/v1/images/${cat.id}`);
                    const detailData = await detailResponse.json();
                    return {...cat, breed: detailData.breeds?.[0] || null};
                } catch (error) {
                    console.error("Error fetching cat details:", error);
                    return cat;
                }
            }));
            
            // Display cats
            petsGrid.innerHTML = '';
            catsWithDetails.forEach(cat => {
                petsGrid.appendChild(createPetCard(cat));
            });
            
        } catch (error) {
            console.error("Error fetching pets:", error);
            petsGrid.innerHTML = '<div class="error">Error al cargar las mascotas. Intenta nuevamente.</div>';
        }
    }
    
    // Only fetch pets when the pets section is active
    document.getElementById('pets-section').addEventListener('click', fetchPets);
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode');
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        // In a real app, you would save this preference to localStorage
    });
    
    // Initialize with pets section hidden (calendar is default)
    document.getElementById('pets-section').classList.remove('active');
});