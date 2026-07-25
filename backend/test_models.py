from google import genai
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

models_to_try = [
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
]

for model in models_to_try:
    print(f"\nTesting {model}...")

    try:
        response = client.models.generate_content(
            model=model,
            contents="Say hello in one sentence."
        )
        print("✅ SUCCESS")
        print(response.text)

    except Exception as e:
        print("❌ FAILED")
        print(e)