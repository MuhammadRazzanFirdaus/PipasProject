AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
});

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTopBtn.style.display = 'flex';
    else backToTopBtn.style.display = 'none';
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navLinks = document.querySelectorAll('nav.navbar .nav-link');
navLinks.forEach(link => {
    if (link.href.includes(location.pathname.split("/").pop())) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    }
});
const items = document.querySelectorAll('.gallery-item');
const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('galleryModalLabel');
const modalDesc = document.getElementById('modalDesc');

const galleryInfo = {
    "Kerajinan Rajutan": "Kerajinan rajutan di Cisarua merupakan salah satu bentuk karya seni lokal yang menunjukkan kreativitas serta kearifan masyarakat setempat. Dengan memanfaatkan benang-benang seperti katun, wol, atau nilon, para perajin di Cisarua menghasilkan berbagai produk bernilai estetis dan fungsional. Cisarua dikenal memiliki komunitas ibu-ibu rumah tangga dan pengrajin muda yang aktif mengembangkan produk rajutan seperti, Tas dan dompet rajut, Topi dan syal Boneka rajut (amigurumi), Taplak dan hiasan rumah Souvenir khas daerah",
    "Seni Pertunjukan Goong Renteng": "Goong Renteng adalah seni musik tradisional Sunda yang berkembang di daerah Cisarua, dimainkan menggunakan seperangkat gamelan seperti goong, bonang, kendang, dan saron secara bersama-sama. Pertunjukan ini biasanya ditampilkan dalam acara adat seperti pernikahan, khitanan, dan upacara panen, tidak hanya sebagai hiburan tetapi juga memiliki nilai budaya dan spiritual yang tinggi. Di Cisarua, Goong Renteng masih aktif dilestarikan oleh kelompok seni lokal dan sering menjadi bagian dari acara budaya serta festival daerah.",
    "Tari Panarat": "Tari Panarat adalah salah satu tari tradisional khas dari daerah Cisarua yang mencerminkan nilai-nilai kehidupan masyarakat setempat, seperti kerja sama, ketekunan, dan rasa hormat terhadap alam. Tarian ini biasanya dibawakan oleh sekelompok penari perempuan dengan gerakan yang lembut namun penuh makna, diiringi musik tradisional Sunda. Tari Panarat sering ditampilkan dalam acara adat, penyambutan tamu penting, serta festival kebudayaan sebagai bentuk pelestarian warisan budaya dan identitas lokal masyarakat Cisarua.",
    "Patung Dewi Kencana": "Patung Dewi Kencana merupakan salah satu karya seni rupa tiga dimensi yang berasal dari daerah Cisarua. Patung ini menggambarkan sosok Dewi Kencana, yang dalam cerita rakyat setempat dikenal sebagai lambang kesuburan, keindahan, dan kebijaksanaan. Dibuat dengan bahan utama batu atau kayu lokal, patung ini sering ditemukan di tempat-tempat keramat atau digunakan sebagai elemen dekoratif dalam upacara adat. Keindahan detail ukirannya mencerminkan keahlian para pengrajin Cisarua dalam memadukan unsur estetika dan spiritual, menjadikan Patung Dewi Kencana tidak hanya sebagai objek seni, tetapi juga simbol budaya dan nilai-nilai luhur masyarakat setempat.",
    "Pencak Silat Cimande": "Pencak Silat Cimande adalah aliran silat tradisional yang berasal dari Cimande, Cisarua, Bogor. Dikenal dengan gerakannya yang luwes dan penuh filosofi, silat ini mengajarkan teknik bela diri sekaligus nilai-nilai seperti kesopanan dan pengendalian diri. Hingga kini, Cimande masih dilestarikan sebagai bagian dari warisan budaya Indonesia.",
    "Tari Jaipong dan Angklung": "Tari Jaipong dan Angklung merupakan seni tradisional dari Jawa Barat. Tari Jaipong, yang dikenal dengan gerakan enerjik dan ekspresif, menggambarkan cerita kehidupan masyarakat, biasanya diiringi musik tradisional. Angklung, alat musik bambu yang dimainkan dengan digoyang, memiliki nada khas yang menyatu dengan irama tari. Gabungan keduanya menciptakan pertunjukan yang memukau dan merayakan budaya Sunda.",
    "Sarung Tenun Tradisional": "Sarung Tenun Tradisional Cisarua merupakan produk kerajinan tangan yang terbuat dari kain tenun khas daerah Cisarua, Jawa Barat. Sarung ini dibuat dengan teknik tenun tradisional yang diwariskan secara turun-temurun. Proses pembuatan yang memakan waktu dan ketelitian menghasilkan motif yang unik, sering kali mencerminkan nilai-nilai budaya lokal. Sarung tenun ini tidak hanya digunakan dalam kegiatan sehari-hari, tetapi juga sering dipakai dalam acara adat dan upacara tradisional, menjadi simbol keindahan dan keaslian budaya Cisarua.",
    "Karinding": "Karinding adalah alat musik tradisional yang terbuat dari bambu atau pelepah daun enau, dengan cara dimainkan dengan cara dipetik atau ditiup. Alat musik ini memiliki suara khas yang unik, dan pada awalnya digunakan oleh petani di Jawa Barat untuk mengusir hama di sawah. Seiring waktu, karinding berkembang menjadi bagian penting dalam seni musik tradisional, khususnya dalam acara budaya dan pertunjukan seni. Di Cisarua, karinding masih dilestarikan dan sering dimainkan dalam acara adat, sebagai bentuk penghargaan terhadap tradisi lokal yang kaya.",
    "Tarawangsa": "Tarawangsa adalah alat musik tradisional Sunda yang dimainkan dengan cara digesek. Memiliki dua dawai, tarawangsa sering digunakan dalam upacara adat, seperti panen padi, untuk memohon keberkahan dan kedamaian. Di Cisarua, tarawangsa masih dimainkan dalam tradisi Ngalaksa sebagai bentuk syukur, meskipun kini menghadapi tantangan pelestarian karena kurangnya generasi muda yang tertarik.",
    "Puncak Culture Session": "Puncak Culture Session adalah acara seni dan budaya yang diadakan di kawasan Puncak, Bogor, yang menampilkan beragam pertunjukan tradisional Sunda, seperti tari, musik, dan teater. Acara ini bertujuan untuk melestarikan dan memperkenalkan kekayaan budaya lokal kepada masyarakat luas. Puncak Culture Session sering kali diadakan di alam terbuka, memberikan pengalaman unik yang menggabungkan keindahan alam dengan seni tradisional.",
    "Sanggar Seni Studio Seni Indonesia (SSI)": "Sanggar Seni Studio Seni Indonesia (SSI) adalah lembaga seni yang berlokasi di Cisarua, Kabupaten Bogor, Jawa Barat. Dibawah pimpinan Lilis Lisdianty, SSI aktif melestarikan dan mempromosikan seni tradisional Sunda melalui berbagai pertunjukan dan pelatihan. Sanggar ini telah mewakili Kabupaten Bogor dalam acara internasional, seperti Bogor Tourism and Handicraft Sales di Thailand pada tahun 2017, serta tampil di beberapa negara seperti China, Malaysia, dan Thailand . SSI juga dikenal karena menyediakan layanan sewa kostum dan makeup untuk acara seni dan budaya .",
    "Kerajinan Bambu Cisarua": "Kerajinan bambu di Cisarua, Bogor, memiliki tradisi panjang, dengan penduduk Kampung Anyar yang ahli dalam membuat produk rajutan bambu seperti tas dan taplak meja. Keahlian ini telah ada sejak era kolonial dan dilanjutkan oleh generasi penerus. Meskipun sempat populer di kalangan wisatawan asing pada 1980-an, kini permintaan berkurang, namun para perajin tetap bertahan dengan memanfaatkan platform digital. Selain itu, Desa Kertawangi juga dikenal dengan produk bambu seperti kursi dan meja yang telah diekspor ke luar negeri."
};

items.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h5').innerText;
        const imgSrc = item.querySelector('img').src;
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalDesc.textContent = galleryInfo[title] || "Informasi belum tersedia.";
        modal.show();
    });
});

// Filter tombol galeri
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;

        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
