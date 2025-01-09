document.querySelectorAll('.clickable').forEach(link => {
    link.addEventListener('click', function(event) {
        const circle = document.createElement('span');
        circle.classList.add('click-effect');
        const rect = this.getBoundingClientRect();
        const d = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = `${d}px`;
        circle.style.left = `${event.clientX - rect.left - d / 2}px`;
        circle.style.top = `${event.clientY - rect.top - d / 2}px`;
        this.appendChild(circle);

        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    });
});


