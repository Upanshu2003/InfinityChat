import os
import httpx

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def call_openrouter(user_message):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "nousresearch/nous-capybara-7b",
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    async with httpx.AsyncClient() as client:
        res = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        res_json = res.json()
        return res_json["choices"][0]["message"]["content"]