import keyboard
import time

print("Mulai rekam dalam 5 detik...")
time.sleep(5)

print("Rekam dimulai!")
print("Tekan: W A S D")
print("Tekan ESC kalau selesai rekam")

record = []
last_time = time.time()

# REKAM RITME USER
while True:

    event = keyboard.read_event()

    if event.event_type == keyboard.KEY_DOWN:

        key = event.name

        if key == "esc":
            break

        if key in ['w', 'a', 's', 'd']:

            current = time.time()

            # hitung delay antar klik
            delay = current - last_time
            last_time = current

            # simpan tombol + delay
            record.append((key, delay))

            print(f"{key.upper()} | delay: {delay:.3f}")

print("\nReplay dimulai dalam 3 detik...")
time.sleep(3)

# LOOP RITME YANG DIREKAM
while True:

    for key, delay in record:

        time.sleep(delay)

        keyboard.press(key)
        keyboard.press('space')

        time.sleep(0.05)

        keyboard.release('space')
        keyboard.release(key)