document.addEventListener('DOMContentLoaded', function() {
    // Validación de formulario de cita
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar fecha no sea pasada
            const fechaInput = document.getElementById('fecha');
            const selectedDate = new Date(fechaInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Por favor seleccione una fecha futura');
                fechaInput.focus();
                return false;
            }
            
            // Validar hora laboral (ejemplo: 8am a 6pm)
            const horaInput = document.getElementById('hora');
            const hora = horaInput.value.split(':');
            const hour = parseInt(hora[0]);
            
            if (hour < 8 || hour >= 18) {
                alert('Nuestro horario de atención es de 8:00 AM a 6:00 PM');
                horaInput.focus();
                return false;
            }
            
            // Si todo está bien, enviar formulario
            this.submit();
        });
    }
    
    // Mejorar experiencia de fecha
    const fechaInputs = document.querySelectorAll('input[type="date"]');
    fechaInputs.forEach(input => {
        // Establecer fecha mínima como hoy
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
        
        // Mejorar placeholder
        if (!input.value) {
            input.classList.add('empty');
        }
        
        input.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('empty');
            } else {
                this.classList.add('empty');
            }
        });
    });
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});