# Run this file for local running of the app
from eva import init_app

app = init_app(DEBUG=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003)
