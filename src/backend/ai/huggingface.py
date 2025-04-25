import os
import logging
import requests
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

logging.basicConfig(level=logging.DEBUG)

def query_huggingface(model: str, payload: dict):
    if not HF_TOKEN:
        return {"error": "Token not loaded. Check .env"}

    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }

    url = f"https://api-inference.huggingface.co/models/{model}"

    try:
        logging.debug(f"Sending request to {url}")
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 401:
            return {"error": "Authentication failed"}
        elif response.status_code == 503:
            return {"error": "Service unavailable"}
        else:
            return {"error": f"{response.status_code}: {response.text}"}
    except Exception as e:
        return {"error": str(e)}
