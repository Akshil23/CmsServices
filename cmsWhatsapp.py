import pandas as pd
import requests
import time

# ========================
# CONFIG (EDIT THESE)
# ========================
ACCESS_TOKEN = "EAAheHkK2xBgBQpaGpnDjGtgBSrCaKGR8yVAhQex47BeFHv6seHdcVyZC7pWmMoFYAuUZBb6nZCGu0mrZBzYTFCD907OQpDT5RbS2BZBZAuzFZALmiBEyRTQRzCxLOtlanrbLq4XAd41SgrMF4R72N8thbmSXgmK4Tkdszf36T5u7CIG9JlSMkVIt9ygRj11DAZDZD"
PHONE_NUMBER_ID = "1031681963351960"
TEMPLATE_NAME = "tax_broadcast"

CSV_FILE = "/Users/ak/Downloads/Tax Filing 2025 - Sheet5.csv"
data = pd.read_csv(CSV_FILE)


# 🔥 FIX: remove hidden spaces in column names
data.columns = data.columns.str.strip()

print("📄 Columns found:", data.columns.tolist())
print("📨 Total contacts:", len(data))

# ========================
# CLEAN PHONE NUMBER
# ========================
def clean_number(num):
    num = str(num).strip()
    num = num.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
    if not num.startswith("+"):
        num = "+1" + num  # Canada default
    return num

# ========================
# SEND WHATSAPP TEMPLATE
# ========================
def send_message(phone, name):
    url = f"https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages"

    payload = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "template",
        "template": {
            "name": TEMPLATE_NAME,
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": name}
                    ]
                }
            ]
        }
    }

    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.status_code, response.text

# ========================
# LOOP & SEND (ANTI-BAN)
# ========================
for index, row in data.iterrows():
    try:
        name = str(row["Name"]).strip()
        phone = clean_number(row["Number"])

        status, result = send_message(phone, name)

        print(f"✅ {index+1}/{len(data)} Sent to {name} | {phone} | Status: {status}")
        print(result)

        time.sleep(3)  # SAFE DELAY (important)

    except Exception as e:
        print(f"❌ Failed at row {index+1}: {e}")
        time.sleep(5)

print("🎉 Broadcast completed")
