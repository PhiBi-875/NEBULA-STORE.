const nomorAdmin = "085267963967";

let gameDipilih = "";

const layananML = [
    {
        dari: "Warrior",
        ke: "Elite",
        harga: 5000
    },
    {
        dari: "Elite",
        ke: "Master",
        harga: 6000
    },
    {
        dari: "Master",
        ke: "Grandmaster",
        harga: 7000
    },
    {
        dari: "Grandmaster",
        ke: "Epic",
        harga: 8000
    },
    {
        dari: "Epic",
        ke: "Legend",
        harga: 10000
    },
    {
        dari: "Legend",
        ke: "Mythic",
        harga: 12000
    },
    {
        dari: "Mythic",
        ke: "Mythical Honor",
        harga: 15000
    },
    {
        dari: "Mythical Honor",
        ke: "Glory",
        harga: 18000
    },
    {
        dari: "Glory",
        ke: "Immortal",
        harga: 20000
    }
];


const layananFF = [
    {
        dari: "Bronze",
        ke: "Silver",
        harga: 5000
    },
    {
        dari: "Silver",
        ke: "Gold",
        harga: 7000
    },
    {
        dari: "Gold",
        ke: "Platinum",
        harga: 10000
    },
    {
        dari: "Platinum",
        ke: "Diamond",
        harga: 15000
    },
    {
        dari: "Diamond",
        ke: "Heroic",
        harga: 20000
    },
    {
        dari: "Heroic",
        ke: "Master",
        harga: 25000
    },
    {
        dari: "Master",
        ke: "Grandmaster",
        harga: 30000
    }
];

function hitungTotalHarga(awal, tujuan, layanan) {

    const posisiAwal = layanan.findIndex(
        item => item.dari === awal
    );

    const posisiTujuan = layanan.findIndex(
        item => item.ke === tujuan
    );


    if (
        posisiAwal === -1 ||
        posisiTujuan === -1 ||
        posisiAwal > posisiTujuan
    ) {
        return 0;
    }


    let total = 0;


    for (
        let i = posisiAwal;
        i <= posisiTujuan;
        i++
    ) {

        total += layanan[i].harga;

    }


    return total;
}

function bukaOrder(game) {

    gameDipilih = game;

    updateServerField();

    document.getElementById("namaGame").innerText =
        "Order " + game;

    const rankAwal =
        document.getElementById("rankAwal");

    const rankTujuan =
        document.getElementById("rankTujuan");

    rankAwal.innerHTML =
        '<option value="">-- Pilih Rank Awal --</option>';

    rankTujuan.innerHTML =
        '<option value="">-- Pilih Rank Tujuan --</option>';


    let layanan;

    if (game === "Mobile Legends") {
        layanan = layananML;
    } else {
        layanan = layananFF;
    }


    layanan.forEach(function(item) {

        rankAwal.innerHTML += `
            <option value="${item.dari}">
                ${item.dari}
            </option>
        `;

        rankTujuan.innerHTML += `
            <option value="${item.ke}">
                ${item.ke}
            </option>
        `;

    });


    document.getElementById("totalHarga").innerText =
        "Rp0";

    document.getElementById("popup").style.display =
        "flex";
}


function tutupOrder() {

    document.getElementById("popup").style.display =
        "none";
}


document.getElementById("rankAwal").addEventListener(
    "change",
    hitungHarga
);

document.getElementById("rankTujuan").addEventListener(
    "change",
    hitungHarga
);


function hitungHarga() {

    const awal =
        document.getElementById("rankAwal").value;

    const tujuan =
        document.getElementById("rankTujuan").value;


    if (!awal || !tujuan) {

        document.getElementById("totalHarga")
            .innerText = "Rp0";

        return;
    }


    const layanan =
        gameDipilih === "Mobile Legends"
            ? layananML
            : layananFF;


    const harga =
        hitungTotalHarga(
            awal,
            tujuan,
            layanan
        );


    if (harga <= 0) {

        document.getElementById("totalHarga")
            .innerText = "Tidak tersedia";

        return;
    }


    document.getElementById("totalHarga")
        .innerText =
        formatRupiah(harga);
}


function formatRupiah(angka) {

    return "Rp" + angka.toLocaleString("id-ID");

}


function buatPesanan() {

    const awal =
        document.getElementById("rankAwal").value;

    const tujuan =
        document.getElementById("rankTujuan").value;

    const nickname =
        document.getElementById("nickname").value.trim();

    const userId =
        document.getElementById("userId").value.trim();

    const serverId =
        document.getElementById("serverId").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();


    const layanan =
        gameDipilih === "Mobile Legends"
            ? layananML
            : layananFF;


    const harga =
        hitungTotalHarga(
            awal,
            tujuan,
            layanan
        );


    if (harga <= 0) {

        alert(
            "Rank tujuan harus lebih tinggi dari rank awal."
        );

        return;
    }


    if (!nickname) {

        alert(
            "Silakan masukkan nickname."
        );

        return;
    }


    if (!userId) {

        alert(
            "Silakan masukkan User ID."
        );

        return;
    }


    if (
        gameDipilih === "Mobile Legends" &&
        !serverId
    ) {

        alert(
            "Silakan masukkan Server ID."
        );

        return;
    }


    if (!whatsapp) {

        alert(
            "Silakan masukkan nomor WhatsApp."
        );

        return;
    }


    // CHECKOUT

    document.getElementById("checkoutGame")
        .innerText = gameDipilih;


    document.getElementById("checkoutRank")
        .innerText =
        awal + " → " + tujuan;


    document.getElementById("checkoutNickname")
        .innerText = nickname;


    document.getElementById("checkoutUserId")
        .innerText = userId;


    document.getElementById("checkoutWhatsapp")
        .innerText = whatsapp;


    document.getElementById("checkoutHarga")
        .innerText =
        formatRupiah(harga);


    const serverRow =
        document.getElementById(
            "checkoutServerRow"
        );


    if (gameDipilih === "Mobile Legends") {

        serverRow.style.display = "flex";

        document.getElementById(
            "checkoutServerId"
        ).innerText = serverId;

    } else {

        serverRow.style.display = "none";

    }


    document.getElementById("popup")
        .style.display = "none";


    document.getElementById("checkout")
        .style.display = "flex";
}


function updateServerField() {

    const serverField =
        document.getElementById("serverField");


    if (gameDipilih === "Mobile Legends") {

        serverField.style.display = "block";

    } else {

        serverField.style.display = "none";

    }

}

function konfirmasiPesanan() {

    const awal =
        document.getElementById("rankAwal").value;

    const tujuan =
        document.getElementById("rankTujuan").value;

    const nickname =
        document.getElementById("nickname").value.trim();

    const userId =
        document.getElementById("userId").value.trim();

    const serverId =
        document.getElementById("serverId").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const catatan =
        document.getElementById("catatan").value.trim();


    const layanan =
        gameDipilih === "Mobile Legends"
            ? layananML
            : layananFF;


    const harga =
        hitungTotalHarga(
            awal,
            tujuan,
            layanan
        );


    if (harga <= 0) {

        alert(
            "Rank tujuan harus lebih tinggi dari rank awal."
        );

        return;
    }


    const pesan =

        "🔥 *ORDER STORE NEBULA* 🔥\n\n" +

        "🎮 Game: " +
        gameDipilih +
        "\n" +

        "🏆 Rank: " +
        awal +
        " → " +
        tujuan +
        "\n" +

        "💰 Total Harga: " +
        formatRupiah(harga) +
        "\n\n" +

        "👤 *DATA AKUN*\n" +

        "Nickname: " +
        nickname +
        "\n" +

        "User ID: " +
        userId +
        "\n" +

        (
            gameDipilih === "Mobile Legends"
                ? "Server ID: " + serverId + "\n"
                : ""
        ) +

        "\n📱 WhatsApp: " +
        whatsapp +
        "\n" +

        "📝 Catatan: " +
        (catatan || "-");


    const url =
        "https://wa.me/" +
        nomorAdmin +
        "?text=" +
        encodeURIComponent(pesan);


    window.open(url, "_blank");

    hargaPesanan = harga;

document.getElementById("checkout")
    .style.display = "none";

bukaPembayaran(harga);

}

function tutupCheckout() {

    document.getElementById("checkout")
        .style.display = "none";

}

let metodePembayaran = "";
let hargaPesanan = 0;

function bukaPembayaran(harga) {

    hargaPesanan = harga;


    const nomor =
        buatNomorPesanan();


    document.getElementById("orderNumber")
        .innerText = nomor;


    document.getElementById("paymentHarga")
        .innerText =
        formatRupiah(harga);


    document.getElementById("payment")
        .style.display = "flex";

}

function tutupPembayaran() {

    document.getElementById("payment")
        .style.display = "none";

}

function pilihPembayaran(metode) {

    metodePembayaran = metode;


    const detail =
        document.getElementById("paymentDetail");


    if (metode === "DANA") {

        detail.innerHTML = `

            <strong>
                DANA
            </strong>

            <p>
                Nomor DANA:
            </p>

            <h3>
                081537560686
            </h3>

            <small>
                Silakan transfer sesuai total pembayaran.
            </small>

        `;

    }



    if (metode === "QRIS") {

        detail.innerHTML = `

            <strong>
                QRIS
            </strong>

            <p>
                Silakan scan QRIS STORE NEBULA
            </p>

            <div style="
                margin-top:15px;
                padding:30px;
                background:white;
                border-radius:10px;
            ">

                QRIS

            </div>

        `;

    }

}

function buatNomorPesanan() {

    const sekarang = new Date();

    const tanggal =
        String(sekarang.getDate()).padStart(2, "0") +
        String(sekarang.getMonth() + 1).padStart(2, "0") +
        String(sekarang.getFullYear()).slice(-2);


    const angka =
        Math.floor(100 + Math.random() * 900);


    return "SN-" + tanggal + "-" + angka;
}

function previewBukti(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "Bukti pembayaran harus berupa gambar."
        );

        event.target.value = "";

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        document.getElementById(
            "previewContainer"
        ).innerHTML = `

            <img
                src="${e.target.result}"
                alt="Bukti Pembayaran"
            >

        `;

    };


    reader.readAsDataURL(file);
}

function konfirmasiPembayaran() {

    if (!metodePembayaran) {

        alert(
            "Silakan pilih metode pembayaran."
        );

        return;
    }


    const bukti =
        document.getElementById(
            "buktiPembayaran"
        ).files[0];


    if (!bukti) {

        alert(
            "Silakan upload bukti pembayaran."
        );

        return;
    }


    const nomorOrder =
        document.getElementById(
            "orderNumber"
        ).innerText;


    alert(
        "Pembayaran berhasil dikonfirmasi!\n\n" +
        "Nomor Pesanan: " +
        nomorOrder +
        "\n" +
        "Metode: " +
        metodePembayaran +
        "\n" +
        "Total: " +
        formatRupiah(hargaPesanan)
    );

}