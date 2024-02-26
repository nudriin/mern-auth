import { web } from "../src/app/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "./test-utils.js";

describe('POST /api/summarize/youtube', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should success get message", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .post("/api/summarize/youtube")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send(
                {
                    message : `LAPORAN AKHIR PROGRAM PROFESIONAL 
                    PENGEMBANGAN GAME EDUKATIF BERBASIS MOBILE DI SEKOLAH 
                    DASAR DESA MABUAN 
                    DISUSUN OLEH : 
                    NAMA 
                    NIM  
                    : PATRICK WELAY 
                    : 213020503019 
                    JURUSAN/PROGRAM STUDI TEKNIK INFORMATIKA 
                    FAKULTAS TEKNIK 
                    UNIVERSITAS PALANGKA RAYA 
                    2024 
                    BAB I 
                    PENDAHULUAN 
                    1.1 Latar Belakang 
                    Pendidikan merupakan salah satu aspek kunci dalam pembentukan potensi 
                    manusia. Di era teknologi informasi seperti sekarang, pemanfaatan teknologi dalam 
                    proses pendidikan menjadi semakin penting. Perkembangan teknologi mobile telah 
                    membuka peluang baru dalam pengembangan metode pembelajaran yang lebih 
                    menarik dan interaktif. Sekolah Dasar di Desa Mabuan sebagai bagian integral dari 
                    masyarakat pedesaan juga dituntut untuk mengikuti perkembangan zaman, 
                    sehingga pendidikan yang diberikan dapat lebih relevan dan menarik bagi para 
                    siswa. 
                    Game edukatif berbasis mobile menjadi salah satu inovasi yang menarik 
                    untuk diimplementasikan dalam konteks pendidikan di Sekolah Dasar Desa 
                    Mabuan. Dengan memanfaatkan teknologi mobile, game edukatif dapat menjadi 
                    sarana yang efektif untuk meningkatkan minat dan motivasi belajar siswa. 
                    Kemampuan visual dan interaktif yang dimiliki oleh perangkat mobile dapat 
                    menciptakan pengalaman belajar yang lebih dinamis dan menyenangkan, 
                    membantu siswa untuk lebih mudah memahami konsep-konsep pelajaran. 
                    Selain itu, pengembangan game edukatif di Sekolah Dasar Desa Mabuan juga 
                    dapat menjadi solusi untuk mengatasi tantangan dalam proses belajar-mengajar di 
                    lingkungan pedesaan. Dengan mengintegrasikan teknologi mobile, diharapkan 
                    akses terhadap materi pembelajaran dapat lebih mudah diakses oleh siswa, bahkan 
                    di daerah-daerah terpencil sekalipun. 
                    Berdasarkan latar belakang yang telah diuraikan tersebut maka diangkat 
                    sebuah judul ”PENGEMBANGAN GAME EDUKATIF BERBASIS MOBILE 
                    DI SEKOLAH DASAR DESA MABUAN”. Dengan aplikasi mobile ini nanti 
                    diharapkan dapat tercipta lingkungan belajar yang lebih interaktif, menyenangkan, 
                    dan relevan dengan kebutuhan siswa. Pemanfaatan teknologi mobile dalam 
                    pendidikan diharapkan dapat memberikan kontribusi positif terhadap peningkatan 
                    kualitas pendidikan dan kemampuan siswa di era digital ini. 
                    1.2 Rumusan Masalah 
                    Berdasarkan dari Latar Belakang diatas dapat dirumuskan permasalahan 
                    umum dari Sekolah Dasar Negeri di Desa Mabuan yaitu “Bagaimana tahap 
                    pengembangan suatu aplikasi atau game mobile edukatif sebagai sarana 
                    mempengaruhi efektivitas pembelajaran di Sekolah Dasar Desa Mabuan ?” 
                    1.3 Batasan Masalah 
                    Mengacu pada permasalahan di atas, dan untuk menghindari meluasnya 
                    dalam pembahasan, maka tujuan dari penulisan pembatasan masalah yang berkaitan 
                    tentang pembuatan ”PENGEMBANGAN GAME EDUKATIF BERBASIS 
                    MOBILE DI SEKOLAH DASAR DESA MABUAN” ini meliputi sebagai 
                    berikut : 
                    1. Aplikasi/edukatif ini di buat menggunakan aplikasi Unity 
                    2. Bahasa pemrograman yang di gunakan adalah  C# 
                    3. Fitur yang di sediakan berupa game edukatif yang bertemakan 
                    pengetahuan tentang alam sekitar 
                    1.4 Tujuan 
                    Dengan adanya “PENGEMBANGAN GAME EDUKATIF BERBASIS 
                    MOBILE DI SEKOLAH DASAR DESA MABUAN”, maka tujuan dari di 
                    buatnya game ini adalah sebagai berikut : 
                    1. Meningkatkan daya tarik anak-anak terhadap proses pembelajaran. 
                    2. Memberi pengalaman baru bagi anak-anak dalam proses pembelajaran 
                    3. Mendekatkan dan Memancing empati anak terhadap lingkungan sekitar   
                    1.5 Manfaat 
                    1. Meningkatkan motivasi belajar 
                    2. Memberikan akses yang mudah kepada anak dalam pembelajaran 
                    3. Tidak mengeluarkan banyak biaya 
                    4. Mengurangi kecanduan anak-anak sekarang dengan game bertemakan 
                    kekerasan.  
                    5. Merangsang rasa ingin tahu anak-anak, mendukung pembelajaran mandiri. 
                    1.6 Sistematika Penulisan 
                    Penulisan laporan program profesional ini disusun dalam lima bab, 
                    denganmempergunakan sistematika sebagai berikut : 
                    BAB I PENDAHULUAN 
                    Dalam bab inidiuraikanlatar belakang masalah, identifikasimasalah, 
                    batasan masalah, maksud dan tujuan, metodologi penelitian dan 
                    sistematika penulisan. 
                    BAB II LANDASAN TEORI 
                    Landasan teori memuat masalah tentang konsep dan prinsip dasar 
                    yang diperlukan untuk memecahkan masalah pekerjaan untuk 
                    merumuskan hipotesis. Landasan teori ini berbentuk  permasalahan
                    permasalahan yang langsung berkaitan dengan permasalahan yang 
                    dikerjakan. 
                    BAB III ANALISIS DAN DESAIN 
                    Pada Bab ini diuraikan tentang perancangan proses, perancangan 
                    basis data, perancangan antar muka yang meliputi perancanganinput 
                    dan output, serta kebutuhan sistem. 
                    BAB IV IMPLEMENTASI\ 
                    Dalam bab inidi uraikantahapan-tahapan dari implementasisistem 
                    yang digunakan yaitu : rancangan penerapan, dan tahap penggunaan 
                    program. 
                    BAB V KESIMPULAN DAN SARAN 
                    Bab ini terdiri dari kesimpulan dan saran. Kesimpulan yang berisi 
                    pernyataan singkat dan tepat yang dijabarkan dari hasil studi literatur 
                    atau landasan teori dan penyusunan laporan program Profesional, 
                    sedangkan saran berupa perbaikan/peningkatan yang diperlukan saat 
                    ini ataupun pada masa yang akan datang yang berhubungan dengan 
                    pelaksanaan pembuatan Program Profesional ini. 
                    1.7 Jadwal Kegiatan  
                    Adapun jadwal kegiatan selama  ± 3 bulan (Maret s/d Mei) dalam pembuatan 
                    program pada mata kuliah Program Profesional sebagai berikut : `
                }
            );

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.message).toBeDefined();
    });
});

describe('POST /api/scrap/youtube', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("Should success get caption", async () => {

        // Login first
        let response = await supertest(web)
            .post("/api/users/login")
            .send({
                username: "test",
                password: "12345678"
            });
        const token = response.body.data.token;

        // get user data
        response = await supertest(web)
            .post("/api/caption/youtube")
            .set({
                "Authorization": `Bearer ${token}`
            })
            .send(
                {
                    videoId : "OXtZfPZIex4"
                }
            );

        console.log(response.body.data.caption);
        expect(response.status).toBe(200);
        expect(response.body.data.caption).toBeDefined();
    });
});