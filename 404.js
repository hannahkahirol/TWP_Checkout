window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const scrolled = window.scrollY > 100;
            header.style.background = scrolled ? '#ff884b' : '#ff884b';
            header.style.padding = scrolled ? '0.8rem 2rem' : '1rem 2rem';
            header.style.backdropFilter = scrolled ? 'blur(10px)' : 'none';
        });

        const searchBar = document.querySelector('.search-bar');
        const searchIcon = document.querySelector('.search-icon');

        searchBar.addEventListener('focus', () => {
            searchBar.style.transform = 'scale(1.02)';
            searchIcon.style.color = '#ff884b';
        });

        searchBar.addEventListener('blur', () => {
            searchBar.style.transform = 'scale(1)';
            searchIcon.style.color = '#cdfffc';
        });

        let cartItems = 0;
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.cart-count').textContent = ++cartItems;
                document.querySelector('.fa-shopping-cart').classList.add('bounce');
                setTimeout(() => {
                    document.querySelector('.fa-shopping-cart').classList.remove('bounce');
                }, 1000);
            });
        });


        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position, size and animation
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = Math.random() * 0.8 + 0.2;
            particle.style.background = colors[i % 4];
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
            
            container.appendChild(particle);
        }