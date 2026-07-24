from collections import Counter

INPUT_FILE = "nan.txt"
OUTPUT_FILE = "kosakata_tanpa_duplikat.txt"


def main():
    try:
        with open(INPUT_FILE, "r", encoding="utf-8") as f:
            lines = [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"❌ File '{INPUT_FILE}' tidak ditemukan.")
        return

    counter = Counter(lines)

    duplicates = {k: v for k, v in counter.items() if v > 1}

    print("=" * 60)
    print(f"📄 Total data           : {len(lines)}")
    print(f"📚 Kosakata unik        : {len(counter)}")
    print(f"🔁 Kosakata duplikat    : {len(duplicates)}")
    print("=" * 60)

    if duplicates:
        print("\nDaftar duplikat:\n")

        total_duplikat = 0

        for kata, jumlah in sorted(duplicates.items()):
            print(f"{kata}  --> {jumlah} kali")
            total_duplikat += jumlah - 1

        print("\n" + "=" * 60)
        print(f"Total salinan duplikat yang bisa dihapus: {total_duplikat}")
        print("=" * 60)

        jawab = input("\nHapus semua duplikat? (Y/N): ").strip().lower()

        if jawab == "y":
            seen = set()
            hasil = []

            for kata in lines:
                if kata not in seen:
                    hasil.append(kata)
                    seen.add(kata)

            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                f.write("\n".join(hasil))

            print("\n✅ Duplikat berhasil dihapus.")
            print(f"📄 File baru disimpan sebagai: {OUTPUT_FILE}")
            print(f"🗑️ Menghapus {total_duplikat} baris duplikat.")
            print(f"📚 Total kosakata sekarang: {len(hasil)}")
        else:
            print("\n❌ Penghapusan dibatalkan.")
    else:
        print("\n✅ Tidak ditemukan kosakata yang duplikat.")


if __name__ == "__main__":
    main()