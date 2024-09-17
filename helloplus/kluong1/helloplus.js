const click_me = document.getElementById('click_me');

click_me.addEventListener('click', () => {
    clicked = true;
    let existingImage = document.getElementById('cat_image');
    if (!existingImage) {
        const img = document.createElement('img');
        img.src = 'https://preview.redd.it/xcvzcfzs1vd31.jpg?width=640&crop=smart&auto=webp&s=81835d4e018b6160fe058a0f79f62a5e109e69b1'; // URL to a random cat image
        img.style.marginTop = '30px';
        img.style.border = '2px solid #875698'; 

        document.body.appendChild(img);
    }
})