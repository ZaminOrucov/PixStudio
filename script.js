// FORMAT CONVERTER
document.getElementById('convertInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const format = document.getElementById('formatSelect').value;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            
            const link = document.createElement('a');
            link.download = `pix-converted.${format.split('/')[1]}`;
            link.href = canvas.toDataURL(format);
            link.click();
        };
        img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
});

// BG REMOVAL - ÖZƏL API İLƏ (Məsələn, remove.bg)
document.getElementById('bgInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Burada API açarınızı daxil etməlisiniz
    const apiKey = "xMi3MzpzgpeNvoiSdcfeqJ9U"; 

    if(apiKey === "BURAYA_AÇAR_DAXİL_EDİN") {
        alert("Süni İntellektlə arxa plan silmə funksiyası üçün script.js-də API Key qeyd olunmalıdır.");
        return;
    }

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": apiKey },
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "pix-no-bg.png";
            link.click();
        } else {
            alert("API xətası baş verdi.");
        }
    } catch (err) { alert("Xəta: " + err.message); }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    
    // Menyunun açılıb-bağlanması
    nav.classList.toggle('active');
    
    // Hamburgerin X-ə çevrilməsi
    burger.classList.toggle('toggle');
}

// Linklərə basdıqda menyunun bağlanması (UX üçün vacibdir)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});
