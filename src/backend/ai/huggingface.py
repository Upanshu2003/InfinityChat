import os
import requests
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

def query_huggingface(model: str, payload: dict):
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}"
    }

    api_url = f"https://api-inference.huggingface.co/models/{model}"
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
