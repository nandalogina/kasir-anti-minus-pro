import time
import pyautogui
import pyperclip

DELAY = 2  # detik

with open("nsn.txt", encoding="utf-8") as f:
    words = [x.strip() for x in f if x.strip()]

print("Fokus ke chat Discord...")
time.sleep(5)

for i in range(0, len(words), 10):
    batch = words[i:i+10]

    command = "sk cek " + ", ".join(batch)

    pyperclip.copy(command)
    pyautogui.hotkey("ctrl", "v")
    pyautogui.press("enter")

    print(command)

    time.sleep(DELAY)

print("Selesai.")